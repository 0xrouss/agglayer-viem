import { ChainContract, Client } from "viem";
import { chainsList } from ".";
import { ChainConfig } from "./config";

export function getChainConfig(client: Client): ChainConfig {
    if (client.chain === undefined) {
        throw new Error("Client must have a chain");
    }
    const config = chainsList[client.chain.id];
    if (!config) {
        throw new Error(`Chain with ID ${client.chain.id} is not supported`);
    }
    return config;
}

// Unified bridge getter
export function getUnifiedBridge(client: Client): ChainContract {
    const config = getChainConfig(client);
    if (!config.unifiedBridge) {
        throw new Error(`Chain ${client.chain?.id} has no unifiedBridge`);
    }
    return config.unifiedBridge;
}

// Bridge extension getter
export function getBridgeExtension(client: Client): ChainContract {
    const config = getChainConfig(client);
    if (!config.bridgeExtension) {
        throw new Error(`Chain ${client.chain?.id} has no bridgeExtension`);
    }
    return config.bridgeExtension;
}

// Rollup manager getter
export function getRollupManager(client: Client): ChainContract {
    const config = getChainConfig(client);
    if (!config.rollupManager) {
        throw new Error(`Chain ${client.chain?.id} has no rollupManager`);
    }
    return config.rollupManager;
}
