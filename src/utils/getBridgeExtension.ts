import { Address, ChainContract } from "viem";
import { chainsList } from "../chains";

/**
 * Get the bridge extension for a given chain ID.
 * @param chainId - The chain ID
 * @returns The bridge extension ChainContract
 * @throws Error if the bridge extension cannot be found
 */
export const getBridgeExtension = (chainId: number): ChainContract => {
    const chainConfig = chainsList[chainId];

    if (chainConfig === undefined) {
        throw new Error(`Chain with ID ${chainId} is not supported`);
    }

    if (chainConfig.bridgeExtension === undefined) {
        throw new Error(`Chain with ID ${chainId} has no bridgeExtension`);
    }

    return chainConfig.bridgeExtension;
};
