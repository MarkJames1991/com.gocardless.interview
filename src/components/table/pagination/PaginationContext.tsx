import { createContext, useContext, useMemo, useState, type ReactNode, useCallback, useEffect } from "react";

interface PaginationContextProps {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    setTotalPages: (pages: number) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const setPage = useCallback((page: number) => {
        setCurrentPage((prev) => {
            const next = Math.max(1, Math.min(page, totalPages));
            return prev === next ? prev : next;
        });
    }, [totalPages]);

    useEffect(() => {
        setCurrentPage((prev) => Math.max(1, Math.min(prev, totalPages)));
    }, [totalPages]);

    const value = useMemo(() => ({ currentPage, totalPages, setPage, setTotalPages }), [currentPage, totalPages, setPage]);

    return (
        <PaginationContext.Provider value={value}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => {
    const ctx = useContext(PaginationContext);
    if (!ctx) throw new Error("usePagination must be used within PaginationProvider");
    return ctx;
};
