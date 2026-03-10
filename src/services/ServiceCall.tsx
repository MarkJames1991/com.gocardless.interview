import axios from "axios";
import getStoredAuthToken from "../lib/getStoredAuthToken.tsx";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequestHeaders = Record<string, string | null>;
type RequestPayload = unknown;
type ErrorResponse = { error?: string };

class ServiceCall {
    private getEndpoint(endpoint: string): string {
        const baseUrl = (import.meta.env.VITE_API_PATH || "").replace(/\/+$/, "");
        const cleanEndpoint = endpoint.replace(/^\/+/, "");
        return `${baseUrl}/${cleanEndpoint}`;
    }

    public async call<TResponse = Record<string, unknown>>(
        endpoint: string,
        method: string,
        payload?: RequestPayload,
        headers: RequestHeaders = {}
    ): Promise<TResponse> {
        const normalizedMethod = method.toUpperCase() as HttpMethod;
        const token = getStoredAuthToken();

        const response = await axios<ErrorResponse & TResponse>({
            method: normalizedMethod,
            url: this.getEndpoint(endpoint),
            headers: {
                "Content-Type": "application/json",
                ...(token ? {
                    Authorization: token,
                    user_uuid: null,
                    account_uuid: null,
                } : {}),
                ...headers,
            },
            [normalizedMethod === "GET" ? "params" : "data"]: payload,
        });

        if (typeof response.data?.error === "string") {
            throw new Error(response.data.error);
        }

        return response.data as TResponse;
    }
}

export default ServiceCall;
export { ServiceCall };
