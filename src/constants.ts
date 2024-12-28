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
