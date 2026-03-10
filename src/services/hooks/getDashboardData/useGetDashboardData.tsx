import {useQuery} from "@tanstack/react-query";
import {fetchDashboardData} from "./fetchDashboardData.tsx";
import type {DashboardDataResult, FetchDashboardDataOptions} from "./types.ts";

const DASHBOARD_DATA_STALE_TIME_MS = 1000 * 30;

const useGetDashboardData = <T = unknown>(
    url: string | null,
    options?: FetchDashboardDataOptions
) => {
    return useQuery({
        queryKey: ["dashboard-data", url, options],
        queryFn: (): Promise<DashboardDataResult<T>> => {
            if (!url) {
                throw new Error("Collection name is required");
            }

            return fetchDashboardData<T>(url, options);
        },
        enabled: Boolean(url),
        staleTime: DASHBOARD_DATA_STALE_TIME_MS,
    });
};


export default useGetDashboardData;
export {
    useGetDashboardData
}
