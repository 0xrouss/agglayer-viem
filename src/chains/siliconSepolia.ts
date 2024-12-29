import { Chain, siliconSepolia as baseSiliconSepolia } from "viem/chains";

export const siliconSepolia: Chain = {
    ...baseSiliconSepolia,
    contracts: {
        ...baseSiliconSepolia.contracts,
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        }
    },
    custom: {
        ...(baseSiliconSepolia.custom || {}),
        aggLayerIndexedId: 16,
    },
};
