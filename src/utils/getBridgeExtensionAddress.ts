import { Address } from "viem";
import { indexedChains } from "../chains";

/**
 * Get the bridge extension address for a given indexed network ID.
 * @param indexedId - The indexed network ID
 * @returns The bridge extension address
 * @throws Error if the bridge address cannot be found
 */
export const getBridgeExtensionAddress = (indexedId: number): Address => {
    const chain = indexedChains[indexedId];

    if (!chain || !chain.contracts?.bridgeExtension) {
        throw new Error(
            `Bridge extension address not found for indexedId: ${indexedId}`
        );
    }

    const bridgeExtension = chain.contracts.bridgeExtension as {
        address: Address;
    };

    return bridgeExtension.address;
};
