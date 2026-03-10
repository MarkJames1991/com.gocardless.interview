import ServiceCall from "../../ServiceCall.tsx";
import type {DashboardDataResult, FetchDashboardDataOptions} from "./types.ts";

interface DashboardServiceResponse<T> {
    data: DashboardDataResult<T>;
}

const isDashboardServiceResponse = <T,>(
    value: DashboardServiceResponse<T> | DashboardDataResult<T>
): value is DashboardServiceResponse<T> => {
    if (Array.isArray(value) || typeof value !== "object" || value === null) {
        return false;
    }

    return "data" in value && Object.keys(value).length === 1;
};

export const fetchDashboardData = async <T = unknown>(
    collectionName: string,
    options?: FetchDashboardDataOptions
): Promise<DashboardDataResult<T>> => {
    if (!collectionName.trim()) {
        throw new Error("Collection name is required");
    }

    const endpoint = `/view/${encodeURIComponent(
        collectionName
    )}`;

    try {
        const response = await new ServiceCall().call<DashboardServiceResponse<T> | DashboardDataResult<T>>(
            endpoint,
            "POST",
            options
        );

        return isDashboardServiceResponse(response) ? response.data : response;
    } catch (err) {
        console.error("Failed to fetch collection records:", err);
        throw err;
    }
};
