import { Address } from "viem";
import { indexedChains } from "../chains";

/**
 * Get the bridge address for a given indexed network ID.
 * @param indexedId - The indexed network ID
 * @returns The bridge address
 * @throws Error if the bridge address cannot be found
 */
export const getBridgeAddress = (indexedId: number): Address => {
    const chain = indexedChains[indexedId];

    if (!chain || !chain.contracts?.unifiedBridge) {
        throw new Error(`Bridge address not found for indexedId: ${indexedId}`);
    }

    const unifiedBridge = chain.contracts.unifiedBridge as {
        address: Address;
    };

    return unifiedBridge.address;
};
