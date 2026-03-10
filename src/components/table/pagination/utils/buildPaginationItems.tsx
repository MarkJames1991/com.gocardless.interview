export type PageToken =
    | number
    | "prev"
    | "next"
    | "ellipsis-prev"
    | "ellipsis-next";



export function buildPaginationItems(
    currentPage: number,
    totalPages: number,
    maxVisible = 7,
): PageToken[] {
    const res: PageToken[] = ["prev"];

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) res.push(i);
        res.push("next");
        return res;
    }

    const innerSlots = Math.max(3, maxVisible - 2);
    let left = currentPage - Math.floor(innerSlots / 2);
    let right = currentPage + Math.floor(innerSlots / 2);

    if (left < 2) {
        left = 2;
        right = left + innerSlots - 1;
    }

    if (right > totalPages - 1) {
        right = totalPages - 1;
        left = right - innerSlots + 1;
        if (left < 2) left = 2;
    }

    res.push(1);
    if (left > 2) res.push("ellipsis-prev");

    for (let p = left; p <= right; p++) res.push(p);

    if (right < totalPages - 1) res.push("ellipsis-next");
    res.push(totalPages);
    res.push("next");

    return res;
}
