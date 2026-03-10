import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import {type DataTableProps, DataTable, DataTableContent} from "./DataTable";
import Pagination from "./Pagination/Pagination.tsx";
import {PaginationProvider} from "./Pagination/PaginationContext.tsx";
import PaginationStandalone from "./Pagination/PaginationStandalone.tsx";

export interface RemoteDataTableQueryResult<TResponse> {
    data?: TResponse;
    isLoading?: boolean;
    isFetching?: boolean;
    error?: unknown;
}
export type RemoteDataTableHook<TResponse> = () => UseQueryResult<TResponse>;

export interface RemoteDataTableProps<T, TResponse>
    extends Omit<DataTableProps<T>, "data"> {
    useRemoteData: RemoteDataTableHook<TResponse>;
    queryResult: RemoteDataTableQueryResult<TResponse>;
    getRows?: (response?: TResponse) => T[];
    renderLoadingState?: ReactNode;
    renderEmptyState?: ReactNode;
    renderErrorState?: (error: unknown) => ReactNode;
}

const defaultGetRows = <T,>(response?: { data?: T[] } | null): T[] => {
    if (!response?.data) return [];
    return response.data;
};

export function RemoteDataTable<T, TResponse>({
    useRemoteData = true,
    defaultOptions,
                                                  border,
                                                  columns,
    ...tableProps
}: RemoteDataTableProps<T, TResponse>) {

    const [page , setPage] = useState(1);

    const { data, isLoading, isError, error } = useRemoteData({
        page: page - 1,
        ...defaultOptions
    });


    console.log(data)

    const records = data?.records || [];
    const pagination = data?.pagination;

    console.log(pagination);

    return <div>
        <PaginationProvider>
            <DataTableContent columns={columns} data={records} border={border} {...tableProps} />
        </PaginationProvider>
        {pagination?.total_pages > 1 && (
            <div className="mt-auto flex  p-3 border-stroke bg-gray-50">
                <PaginationStandalone
                    key={pagination?.page + 1}
                    className="justify-end" currentPage={pagination?.page + 1} totalPages={pagination?.total_pages} onChange={setPage} />
            </div>
        )}
    </div>
}

export default RemoteDataTable;
