import { Chain, xLayer as baseXLayer } from "viem/chains";

export const xLayer: Chain = {
    ...baseXLayer,
    contracts: {
        ...baseXLayer.contracts,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
        },
    },
    custom: {
        ...(baseXLayer.custom || {}),
        aggLayerIndexedId: 3,
    },
};
