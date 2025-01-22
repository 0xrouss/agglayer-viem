import { Address } from "viem";
import { GetUserTransactions } from "../types/api";
import { createUrl } from "./createUrl";
import { BASE_URL } from "../constants";

// TODO
export async function getUserTransactions(
    user: Address,
    page: number = 0,
    testnet: Boolean = false
): Promise<GetUserTransactions> {
    let endpoint = BASE_URL;

    endpoint += testnet ? "/transactions/testnet" : "/transactions/mainnet";

    const url = createUrl(endpoint, {
        userAddress: user,
        page: page,
    });

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Only include the API key if required
    if (process.env.API_KEY) {
        headers["x-api-key"] = process.env.API_KEY as string;
    } else {
        throw new Error("Polygon API Key not found");
    }

    const result = await fetch(url, {
        method: "GET",
        headers,
    });

    const response = await result.json();

    if (!response.success) {
        return {
            success: false,
            error: "Failed to fetch transactions.",
        };
    }

    return {
        success: true,
        data: {
            transactions: response.result,
            pagination: {
                hasNextPage:
                    response.paginationData.page *
                        response.paginationData.pageSize +
                        response.paginationData.pageSize <
                    response.paginationData.totalCount,
                page: response.paginationData.page,
                pageSize: response.paginationData.pageSize,
                totalCount: response.paginationData.totalCount,
            },
            posWithdrawInterval: response.posWithdrawInterval,
            lastCheckpoint: response.lastCheckpoint,
        },
    };
}
