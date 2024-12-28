import fetch from "node-fetch";

export class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    /**
     * Constructs a complete URL with query parameters.
     * @param endpoint - The API endpoint.
     * @param params - The query parameters as a key-value pair object.
     * @returns The complete URL string.
     */
    private createUrl(
        endpoint: string,
        params: Record<string, any> = {}
    ): string {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce<Record<string, string>>(
                (acc, [key, value]) => {
                    acc[key] = value != null ? String(value) : ""; // Handle null/undefined gracefully
                    return acc;
                },
                {}
            )
        ).toString();

        return `${this.baseUrl}${endpoint}${
            queryString ? `?${queryString}` : ""
        }`;
    }

    /**
     * Makes a GET request and returns the parsed JSON response.
     * @param endpoint - The API endpoint.
     * @param params - The query parameters as a key-value pair object.
     * @param headers - Additional headers for the request.
     * @returns The parsed JSON response.
     */
    async get<T>(
        endpoint: string,
        params?: Record<string, any>,
        headers?: Record<string, string>
    ): Promise<T> {
        const url = this.createUrl(endpoint, params || {});
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY as string,
                ...this.defaultHeaders,
                ...headers,
            },
        });

        return response.json() as Promise<T>;
    }
}
