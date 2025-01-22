export function createUrl(
    endpoint: string,
    params: Record<string, any> = {}
): string {
    const queryString = new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>(
            (acc, [key, value]) => {
                acc[key] = value != null ? String(value) : "";
                return acc;
            },
            {}
        )
    ).toString();

    return `${endpoint}${queryString ? `?${queryString}` : ""}`;
}
