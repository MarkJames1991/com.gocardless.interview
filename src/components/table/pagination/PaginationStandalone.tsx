import {ChevronLeft, ChevronRight} from "lucide";
import React, { useMemo } from "react";
import {Button} from "../../button/Button.tsx";

interface PaginationStandaloneProps {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;

    maxVisible?: number;
    jumpSize?: number;
    mini?: boolean;
    className?: string;
}

const PaginationStandalone: React.FC<PaginationStandaloneProps> = ({
                                                                       currentPage,
                                                                       totalPages,
                                                                       onChange,
                                                                       maxVisible = 7,
                                                                       jumpSize = 5,
                                                                       mini = false,
                                                                       className = "",
                                                                   }) => {
    if (totalPages <= 1) return null;

    const go = (page: number) =>
        onChange(clamp(page, 1, totalPages));

    if (mini) {
        return (
            <nav className={`flex items-center gap-2 ${className}`}>
                <button disabled={currentPage === 1} onClick={() => go(currentPage - 1)}>
                    ←
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => go(currentPage + 1)}
                >
                    →
                </button>
            </nav>
        );
    }

    const items = useMemo(
        () => buildPaginationItems(currentPage, totalPages, maxVisible),
        [currentPage, totalPages, maxVisible],
    );


    return (
        <nav className={`flex-1 flex items-center justify-between gap-2 ${className}`}>
            {items.map((token, idx) => {
                if (token === "prev") {
                    return (
                        <Button
                            key={idx}
                            icon={<ChevronLeft />}
                            type="text"
                            shape="circle"
                            disabled={currentPage === 1}
                            onClick={() => go(currentPage - 1)}
                            className={"!me-auto !text-subtitle !text-sm"}
                        />
                    );
                }

                if (token === "next") {
                    return (
                        <Button
                            key={idx}
                            icon={<ChevronRight />}
                            type="text"
                            shape="circle"
                            disabled={currentPage === totalPages}
                            onClick={() => go(currentPage + 1)}
                            className={"!ms-auto !text-subtitle !text-sm"}
                        />
                    );
                }

                if (token === "ellipsis-prev" || token === "ellipsis-next") {
                    return (
                        <Button
                            key={idx}
                            type="text"
                            shape="circle"
                            onClick={() =>
                                go(
                                    token === "ellipsis-prev"
                                        ? currentPage - jumpSize
                                        : currentPage + jumpSize,
                                )
                            }
                        >
                            …
                        </Button>
                    );
                }

                const page = token as number;
                const active = page === currentPage;

                return (
                    <Button
                        key={page}
                        size="small"
                        type={active ? "primary" : "text"}
                        shape="circle"
                        onClick={() => go(page)}
                    >
                        {page}
                    </Button>
                );
            })}
        </nav>
    );
};

export default PaginationStandalone;
