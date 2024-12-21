import { Chain, mainnet as baseMainnet } from "viem/chains";

export const mainnet: Chain = {
    ...baseMainnet,
    contracts: {
        ...baseMainnet.contracts,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
        },
    },
    custom: {
        ...(baseMainnet.custom || {}),
        aggLayerIndexedId: 0,
    },
};
