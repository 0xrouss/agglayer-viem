import { Chain, sepolia as baseSepolia } from "viem/chains";

export const sepolia: Chain = {
    ...baseSepolia,
    contracts: {
        ...baseSepolia.contracts,
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
    },
    custom: {
        ...(baseSepolia.custom || {}),
        aggLayerIndexedId: 0,
    },
};
