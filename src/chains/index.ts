import { Chain, ChainContract, Client, PublicClient } from "viem";
import { mainnet } from "./mainnet";
import { polygonZkEvm } from "./polygonZkEvm";
import { polygonZkEvmCardona } from "./polygonZkEvmCardona";
import { sepolia } from "./sepolia";
import { silicon } from "./silicon";
import { siliconSepolia } from "./siliconSepolia";
import { xLayer } from "./xLayer";

export { mainnet } from "./mainnet";
export { sepolia } from "./sepolia";
export { polygonZkEvm } from "./polygonZkEvm";
export { polygonZkEvmCardona } from "./polygonZkEvmCardona";
export { silicon } from "./silicon";
export { siliconSepolia } from "./siliconSepolia";
export { xLayer } from "./xLayer";

type Chains = Record<string, Chain>;

export type ExtendedClient = Client & {
    chain: Chain & {
        contracts: {
            unifiedBridge: ChainContract;
            bridgeExtension: ChainContract;
        };
        custom: {
            aggLayerIndexedId: number;
        };
    };
};

export function assertExtendedClient(
    client: Client
): asserts client is ExtendedClient {
    if (
        client.chain !== undefined &&
        client.chain.custom !== undefined &&
        client.chain.contracts !== undefined &&
        client.chain.contracts.unifiedBridge !== undefined &&
        client.chain.contracts.bridgeExtension !== undefined &&
        typeof client.chain.custom.aggLayerIndexedId !== "number"
    ) {
        throw new Error(
            "Client is not an ExtendedClient. Ensure you are using custom chains."
        );
    }
}

const mainnetChains: Chains = {
    mainnet,
    polygonZkEvm,
    silicon,
    xLayer,
};

const testnetChains: Chains = {
    sepolia,
    polygonZkEvmCardona,
    siliconSepolia,
};

export const chains: Chains =
    process.env.ENVIRONMENT === "testnet" ? testnetChains : mainnetChains;

export const indexedChains: Record<number, Chain> = Object.fromEntries(
    Object.values(chains).map((chain) => [
        chain.custom?.aggLayerIndexedId,
        chain,
    ])
);
