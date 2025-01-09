import { Address, ChainContract } from "viem";

export type ChainConfig = {
    rollupId: number;
    unifiedBridge: ChainContract;
    bridgeExtension?: ChainContract;
    rollupManager?: ChainContract;
    testnet?: boolean;
};

export const chainsList: Record<number, ChainConfig> = {
    // Ethereum Mainnet
    1: {
        rollupId: 0,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 16_896_718,
        },
        rollupManager: {
            address: "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2",
            blockCreated: 16_896_721,
        },
    },
    // Polygon zkEVM
    1101: {
        rollupId: 1,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
    },
    // X Layer
    196: {
        rollupId: 3,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
    },
    // Silicon
    2355: {
        rollupId: 10,
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
    },

    // Testnets
    // Ethereum Sepolia
    11_155_111: {
        rollupId: 0,
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 4_789_186,
        },
        bridgeExtension: {
            address: "0x2311BFA86Ae27FC10E1ad3f805A2F9d22Fc8a6a1",
            blockCreated: 5_726_533,
        },
        rollupManager: {
            address: "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff",
            blockCreated: 4_789_190,
        },
        testnet: true,
    },
    // Polygon zkEVM Cardona
    2442: {
        rollupId: 1,
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        },
        testnet: true,
    },
    // Silicon Sepolia
    1_722_641_160: {
        rollupId: 16,
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        },
        testnet: true,
    },
};
