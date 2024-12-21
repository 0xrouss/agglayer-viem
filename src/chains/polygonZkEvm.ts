import { Chain, polygonZkEvm as basePolygonZkEvm } from "viem/chains";

export const polygonZkEvm: Chain = {
    ...basePolygonZkEvm,
    contracts: {
        ...basePolygonZkEvm.contracts,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
        },
    },
    custom: {
        ...(basePolygonZkEvm.custom || {}),
        aggLayerIndexedId: 1,
    },
};
