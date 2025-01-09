import { Address, ChainConfig, ChainContract } from "viem";
import { chainsList } from "../chains";

/**
 * Get the unified bridge for a given chain ID.
 * @param chainId - The chain ID
 * @returns The unified bridge ChainContract
 * @throws Error if the unified bridge cannot be found
 */
export const getUnifiedBridge = (chainId: number): ChainContract => {
    const chainConfig = chainsList[chainId];

    if (chainConfig === undefined) {
        throw new Error(`Chain with ID ${chainId} is not supported`);
    }

    return chainConfig.unifiedBridge;
};
