import { chainsList } from "../chains";
import { GetMerkleProofResponse, MerkleProofResponse } from "../types/api";
import { createUrl } from "./createUrl";

export async function getMerkleProof(
    chainId: number,
    depositCount: number
): Promise<GetMerkleProofResponse> {
    const chainConfig = chainsList[chainId];

    if (chainConfig == null) {
        throw new Error(`Chain with ID ${chainId} is not supported`);
    }

    if (chainConfig.api.requiresPolygonApiKey && process.env.API_KEY == null) {
        throw new Error("API key is required for this chain");
    }

    let endpoint = chainConfig.api.baseUrl;

    if (
        chainConfig.api.version === "v3" &&
        chainConfig.api.requiresPolygonApiKey
    ) {
        endpoint += chainConfig.testnet
            ? "/proof/testnet/merkle-proof"
            : "/proof/mainnet/merkle-proof";
    }

    if (chainConfig.api.version === "v1") {
        endpoint += "/merkle-proof";
    }

    const url = createUrl(endpoint, {
        networkId: chainConfig.rollupId,
        depositCount,
    });

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Only include the API key if required
    if (chainConfig.api.requiresPolygonApiKey && process.env.API_KEY) {
        headers["x-api-key"] = process.env.API_KEY as string;
    }

    const result = await fetch(url, {
        method: "GET",
        headers,
    });

    const response: MerkleProofResponse = await result.json();

    try {
        if (
            response.message === "Network id doesn't exist or not being tracked"
        ) {
            return { success: false, error: response.message };
        }

        if (response.error === "deposit_not_synced") {
            return { success: false, error: "Deposit not synced yet" };
        }

        if (response.error === "destination_not_supported") {
            return { success: false, error: "Destination not supported" };
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
