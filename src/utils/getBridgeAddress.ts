import { Address } from "viem";
import { indexedChains } from "../chains";

/**
 * TODO
 * @param indexedId
 * @returns
 */
export const getBridgeAddress = (indexedId: number): Address => {
    const chain = indexedChains[indexedId];

    const unifiedBridge = chain?.contracts?.unifiedBridge as {
        address: Address;
    };

    return unifiedBridge.address;
};
