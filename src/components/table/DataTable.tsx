import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import type React from "react";
import type { DataColumn } from "./types";
import DataTableRow from "./DataTableRow";
import DataTableHeader from "./DataTableHeader";
import Pagination from "./Pagination/Pagination";
import { PaginationProvider, usePagination } from "./Pagination/PaginationContext";
import DataTableCard, { type DataTableCardProps } from "./DataTableCard";
import { useBreakpoint } from "./useBreakpoint";
import { RowActionsDropdown } from "./RowActionsDropdown";
import Button from "@intelami/core/ui/Button/Button.tsx";
import ThemedIcon from "@intelami/core/ui/iami-icon/ThemedIcon.tsx";
import {Input, Select} from "antd";
import {TableSorter} from "@intelami/core/ui/DataTable/TableSorter.tsx";

export interface DataTableHeaderConfig {
    title?: string;
    downloadLabel?: string;
    onDownload?: () => void;
    onFilter?: () => void;
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;
    sortPlaceholder?: string;
    sortOptions?: { label: string; value: string; order?: "asc" | "desc" }[];
    onSortSelect?: (value: string) => void;
}

export interface DataTableProps<T> {
    columns: DataColumn<T>[];
    data: T[];
    rowKey?: keyof T | ((row: T) => string);
    pageSize?: number;
    mobileCardComponent?: ComponentType<DataTableCardProps<T>>;
    mobileBreakpoint?: number;
    headerConfig?: DataTableHeaderConfig;
    renderActions?: (row: T) => React.ReactNode;
    renderBulkActions?: (rows: T[]) => React.ReactNode;
    enableSelection?: boolean;
    border: 'border' | 'border-y' | 'border-none'
}

export function DataTableContent<T>({
    columns,
    border = "border",
    data,
    rowKey,
    pageSize = 20,
    mobileCardComponent,
    mobileBreakpoint = 768,
    headerConfig,
    renderActions,
    renderBulkActions,
    enableSelection,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const { currentPage, setPage, setTotalPages } = usePagination();
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const isSmallViewport = useBreakpoint(mobileBreakpoint);
    const CardComponent = (mobileCardComponent ?? DataTableCard) as ComponentType<DataTableCardProps<T>>;
    const [selectedRowKeys, setSelectedRowKeys] = useState<Set<string>>(new Set());
    const selectionEnabled = enableSelection ?? Boolean(renderBulkActions);

    data = data || []

    const sortedData = useMemo(() => {
        if (!sortKey || !sortOrder) return data;

        const col = columns.find(c => c.key === sortKey);
        if (!col) return data;

        return [...data].sort((a, b) => {
            const get = (row: T) =>
                col.dataIndex ? (row as Record<string, unknown>)[col.dataIndex as keyof T] : null;

            const av = get(a);
            const bv = get(b);

            if (av === bv) return 0;

            const result = av > bv ? 1 : -1;
            return sortOrder === "asc" ? result : -result;
        });
    }, [data, sortKey, sortOrder, columns]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(sortedData.length / pageSize)),
        [sortedData.length, pageSize],
    );

    useEffect(() => {
        setTotalPages(totalPages);
    }, [totalPages, setTotalPages]);

    const resolveRowKey = useCallback((row: T, i: number) =>
        typeof rowKey === "function"
            ? rowKey(row)
            : rowKey
                ? String(row[rowKey])
                : String(i), [rowKey]);

    const sortedDataWithKeys = useMemo(
        () => sortedData.map((row, index) => ({ row, key: resolveRowKey(row, index) })),
        [sortedData, resolveRowKey],
    );

    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        if (isSmallViewport) {
            return sortedDataWithKeys.slice(0, (currentPage) * pageSize);
        }
        return sortedDataWithKeys.slice(start, start + pageSize);
    }, [sortedDataWithKeys, currentPage, pageSize, isSmallViewport]);

    const validSelectedRowKeys = useMemo(() => {
        const validKeys = new Set(sortedDataWithKeys.map(item => item.key));
        return new Set([...selectedRowKeys].filter(key => validKeys.has(key)));
    }, [selectedRowKeys, sortedDataWithKeys]);

    const handleRowSelection = (key: string, checked: boolean) => {
        setSelectedRowKeys(prev => {
            const next = new Set(prev);
            if (checked) {
                next.add(key);
            } else {
                next.delete(key);
            }
            return next;
        });
    };

    const handleSelectAllVisible = (checked: boolean) => {
        setSelectedRowKeys(prev => {
            const next = new Set(prev);
            pagedData.forEach(item => {
                if (checked) {
                    next.add(item.key);
                } else {
                    next.delete(item.key);
                }
            });
            return next;
        });
    };

    const selectedRows = useMemo(
        () => sortedDataWithKeys.filter(item => validSelectedRowKeys.has(item.key)).map(item => item.row),
        [sortedDataWithKeys, validSelectedRowKeys],
    );

    const allVisibleSelected = useMemo(
        () => selectionEnabled && pagedData.length > 0 && pagedData.every(item => validSelectedRowKeys.has(item.key)),
        [pagedData, selectionEnabled, validSelectedRowKeys],
    );

    const someVisibleSelected = useMemo(
        () => selectionEnabled && pagedData.some(item => validSelectedRowKeys.has(item.key)),
        [pagedData, selectionEnabled, validSelectedRowKeys],
    );

    useEffect(() => {
        if (!isSmallViewport) return;

        const node = sentinelRef.current;
        if (!node) return;

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry?.isIntersecting && currentPage < totalPages) {
                setPage(currentPage + 1);
            }
        }, { rootMargin: "200px" });

        observer.observe(node);

        return () => observer.disconnect();
    }, [currentPage, isSmallViewport, setPage, totalPages]);

    const displayStartIndex = useMemo(() => {
        if (sortedData.length === 0) return 0;
        return isSmallViewport ? 1 : Math.min((currentPage - 1) * pageSize + 1, sortedData.length);
    }, [currentPage, isSmallViewport, pageSize, sortedData.length]);

    const displayEndIndex = useMemo(() => {
        if (sortedData.length === 0) return 0;
        return isSmallViewport ? pagedData.length : Math.min(currentPage * pageSize, sortedData.length);
    }, [currentPage, isSmallViewport, pageSize, pagedData.length, sortedData.length]);

    const handleSortSelect = (value: string) => {
        const option = headerConfig?.sortOptions?.find(opt => opt.value === value);
        setSortKey(value || null);
        setSortOrder(option?.order ?? "asc");
        headerConfig?.onSortSelect?.(value);
    };

    const bulkActionsRenderer = renderBulkActions ?? (renderActions ? ((rows: T[]) => renderActions(rows[0])) : undefined);

    let selectedSortLabel = null;
    return (
        <div className={`w-full h-full ${border} border-stroke  flex flex-1 flex-col`}>
            {headerConfig && (
                <div className="bg-white flex flex-col gap-3 border-b border-stroke p-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col ">
                        {headerConfig.title && (
                            <div className="title">{headerConfig.title}</div>
                        )}
                        <div className="subtitle flex gap-1">
                            Showing records {displayStartIndex}-{displayEndIndex} of {sortedData.length}
                            {selectionEnabled && selectedRows.length > 0 && bulkActionsRenderer && (
                                <div>
                                    <span className="">with {selectedRows.length} record selected</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                        {headerConfig.sortOptions && (
                            <TableSorter
                                options={headerConfig.sortOptions}
                                value={sortKey}
                                onChange={(value) => handleSortSelect(value)}
                            />
                        )}
                        {selectionEnabled && selectedRows.length > 0 && bulkActionsRenderer && (
                            <RowActionsDropdown actions={bulkActionsRenderer(selectedRows)}/>
                        )}
                        {
                            headerConfig.hasSearch && <>
                                <Input
                                    prefix={<ThemedIcon className={'text-subtitle'} iconName={'Search'}/>}
                                    value={searchValue}
                                    onChange={(event) => {
                                        setSearchValue(event.target.value);
                                        headerConfig.onSearchChange?.(event.target.value);
                                    }}
                                    placeholder={headerConfig.searchPlaceholder ?? "Search"}
                                />
                                <div className={'h-full w-[1px] border-l border-stroke'}>&nbsp;</div>
                            </>
                        }

                        <div className={'flex gap-1 items-center'}>
                            <Button
                                    onClick={headerConfig.onFilter} icon={<ThemedIcon className={'text-light-button h-4 w-4'}  iconName={'Filter'}/>}/>
                            {
                                headerConfig.hasDownload && <Button variant={''}
                                    onClick={headerConfig.onFilter} icon={<ThemedIcon  className={'text-light-button h-4 w-4'}  iconName={'Download'}/>}/>
                            }
                            {
                                headerConfig.custom
                            }
                        </div>
                    </div>
                </div>
            )}
            {isSmallViewport ? (
                <div className="flex flex-col gap-3 p-3">
                    {pagedData.map(({row, key}) => (
                        <CardComponent
                            key={key}
                            columns={columns}
                            row={row}
                            renderActions={renderActions}
                            selectionEnabled={selectionEnabled}
                            isSelected={validSelectedRowKeys.has(key)}
                            onSelectChange={(checked) => handleRowSelection(key, checked)}
                        />
                    ))}
                    <div ref={sentinelRef} className="h-4" />
                    {currentPage < totalPages && (
                        <div className="text-center text-xs text-gray-500 pb-1">Loading more…</div>
                    )}
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max border-collapse">
                            <DataTableHeader
                                columns={columns}
                                sortKey={sortKey}
                                sortOrder={sortOrder}
                                onSort={(key) => {
                                    if (sortKey === key) {
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortKey(key);
                                        setSortOrder("asc");
                                    }
                                }}
                                hasActions={!!renderActions}
                                selectionEnabled={selectionEnabled}
                                allSelected={allVisibleSelected}
                                someSelected={someVisibleSelected && !allVisibleSelected}
                                onToggleAll={handleSelectAllVisible}
                            />
                            <tbody>
                                {pagedData.map(({ row, key }) => (
                                    <DataTableRow
                                        key={key}
                                        columns={columns}
                                        row={row}
                                        renderActions={renderActions}
                                        selectionEnabled={selectionEnabled}
                                        isSelected={validSelectedRowKeys.has(key)}
                                        onSelectChange={(checked) => handleRowSelection(key, checked)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

const PagigationWrapper = () => {
    return (
        <>
            {totalPages > 1 && (
                <div className="mt-auto flex justify-end p-3 border-t border-stroke bg-gray-50">
                    <Pagination className="justify-end" />
                </div>
            )}
        </>
    )
}

export function DataTable<T>({
    border = 'border',
    columns,
    data,
    rowKey,
            pageSize = 10,
            mobileCardComponent,
            mobileBreakpoint,
            headerConfig,
            renderActions,
            renderBulkActions,
            enableSelection,
        }: DataTableProps<T>) {
    return (
        <PaginationProvider>
            <DataTableContent
                border={border}
                columns={columns}
                data={data}
                rowKey={rowKey}
                pageSize={pageSize}
                mobileCardComponent={mobileCardComponent}
                mobileBreakpoint={mobileBreakpoint}
                headerConfig={headerConfig}
                renderActions={renderActions}
                renderBulkActions={renderBulkActions}
                enableSelection={enableSelection}

            />
        </PaginationProvider>
    );
}
