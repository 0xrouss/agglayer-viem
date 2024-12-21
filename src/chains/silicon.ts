import { Chain, silicon as baseSilicon } from "viem/chains";

export const silicon: Chain = {
    ...baseSilicon,
    contracts: {
        ...baseSilicon.contracts,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
        },
    },
    custom: {
        ...(baseSilicon.custom || {}),
        aggLayerIndexedId: 10,
    },
};
