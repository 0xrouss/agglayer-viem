import { Address } from "viem";
import { indexedChains } from "../chains";

/**
 * TODO
 * @param indexedId
 * @returns
 */
export const getBridgeExtension = (indexedId: number): Address => {
    const chain = indexedChains[indexedId];

    const bridgeExtension = chain?.contracts?.bridgeExtension as {
        address: Address;
    };

    return bridgeExtension.address;

    // TODO catch, atm not all chains have the bridge extension address informed
};
