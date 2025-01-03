export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_DATA = "0x";

export const BASE_URL = "https://api-gateway.polygon.technology/api/v3";

export const TRANSACTIONS_ENDPOINT =
    process.env.ENVIRONMENT === "testnet"
        ? "/transactions/testnet"
        : "/transactions/mainnet";

export const MERKLE_PROOF_ENDPOINT =
    process.env.ENVIRONMENT === "testnet"
        ? "/proof/testnet/merkle-proof"
        : "/proof/mainnet/merkle-proof";

export const DLT_BRIDGE_ADDRESS_MAINNET =
    "0x2a3dd3eb832af982ec71669e178424b10dca2ede";
export const DLT_BRIDGE_ADDRESS_TESTNET =
    "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582";
export const DLT_BRIDGE_ADDRESS =
    process.env.ENVIRONMENT === "testnet"
        ? DLT_BRIDGE_ADDRESS_TESTNET
        : DLT_BRIDGE_ADDRESS_MAINNET;

export const DLT_ROLLUP_MANAGER_ADDRESS_MAINNET =
    "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2";
export const DLT_ROLLUP_MANAGER_ADDRESS_TESTNET =
    "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff";
export const DLT_ROLLUP_MANAGER_ADDRESS =
    process.env.ENVIRONMENT === "testnet"
        ? DLT_ROLLUP_MANAGER_ADDRESS_TESTNET
        : DLT_ROLLUP_MANAGER_ADDRESS_MAINNET;
