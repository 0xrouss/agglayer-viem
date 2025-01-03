import { Chain, mainnet as baseMainnet } from "viem/chains";

export const mainnet: Chain = {
    ...baseMainnet,
    rpcUrls: {
        default: {
            http: ["https://eth.llamarpc.com"], // TODO change it to env
        },
    },
    contracts: {
        ...baseMainnet.contracts,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 16_896_718,
        },
        rollupManager: {
            address: "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2",
            blockCreated: 16_896_721,
        },
    },
    custom: {
        ...(baseMainnet.custom || {}),
        aggLayerIndexedId: 0,
    },
};
