import { Chain } from "viem";
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
