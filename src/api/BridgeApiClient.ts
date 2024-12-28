import { ApiClient } from "./ApiClient";
import {
    GetTransactionsFromAddressResponse,
    GetMerkleProofResponse,
    MerkleProofResponse,
    LastCheckpoint,
} from "../types/api";
import {
    BASE_URL,
    TRANSACTIONS_ENDPOINT,
    MERKLE_PROOF_ENDPOINT,
} from "../constants";

export class BridgeApiClient extends ApiClient {
    constructor() {
        super(BASE_URL);
    }

    async getTransactionsFromAddress(
        address: string,
        page: number = 0
    ): Promise<GetTransactionsFromAddressResponse> {
        try {
            const response = await this.get<{
                success: boolean;
                result: any[];
                paginationData: {
                    hasNextPage: boolean;
                    page: number;
                    pageSize: number;
                    totalCount: number;
                };
                posWithdrawInterval: number;
                lastCheckpoint: LastCheckpoint;
            }>(TRANSACTIONS_ENDPOINT, {
                userAddress: address,
                page,
            });

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
                    pagination: response.paginationData,
                    posWithdrawInterval: response.posWithdrawInterval,
                    lastCheckpoint: response.lastCheckpoint,
                },
            };
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred.",
            };
        }
    }

    async getMerkleProof(
        networkID: number,
        depositCount: number
    ): Promise<GetMerkleProofResponse> {
        try {
            const response = await this.get<MerkleProofResponse>(
                MERKLE_PROOF_ENDPOINT,
                {
                    networkId: networkID,
                    depositCount,
                }
            );

            if (
                response.message ===
                "Network id doesn't exist or not being tracked"
            ) {
                return { success: false, error: response.message };
            }

            if (response.error === "deposit_not_synced") {
                return { success: false, error: "Deposit not synced yet" };
            }

            if (!response.proof) {
                return {
                    success: false,
                    error: "Proof is missing in the response.",
                };
            }

            return { success: true, data: response.proof };
        } catch (error) {
            console.error("Error fetching merkle proof:", error);
            return { success: false, error: "Error fetching merkle proof" };
        }
    }
}
