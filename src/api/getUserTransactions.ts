import { Address } from "viem";
import { GetUserTransactions } from "../types/api";
import { createUrl } from "./createUrl";

/**
 * Retrieves a user's transaction history from the Polygon API Gateway.
 * This function fetches both bridge and rollup transactions associated with a user's address.
 *
 * @param user - The Ethereum address of the user
 * @param page - The page number for pagination (defaults to 0)
 * @param testnet - Whether to use testnet or mainnet API endpoint (defaults to false)
 * @returns A promise that resolves to the transaction history response
 * @throws Error if the Polygon API Key is not found in the environment variables
 */
export async function getUserTransactions(
  user: Address,
  page: number = 0,
  testnet: boolean = false
): Promise<GetUserTransactions> {
  let endpoint = "https://api-gateway.polygon.technology/api/v3";

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
          response.paginationData.page * response.paginationData.pageSize +
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
