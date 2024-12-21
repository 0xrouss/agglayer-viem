import { Chain, polygonZkEvmCardona as basePolygonZkEvmCardona } from "viem/chains";

export const polygonZkEvmCardona: Chain = {
    ...basePolygonZkEvmCardona,
    contracts: {
        ...basePolygonZkEvmCardona.contracts,
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
        },
        bridgeExtension: {
            address: "0x2311BFA86Ae27FC10E1ad3f805A2F9d22Fc8a6a1",
        },
    },
    custom: {
        ...(basePolygonZkEvmCardona.custom || {}),
        aggLayerIndexedId: 1,
    },
};
