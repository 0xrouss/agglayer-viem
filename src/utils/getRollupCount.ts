import { PublicClient } from "viem";
import { readContract } from "viem/actions";
import { polygonRollupManagerABI } from "../abis";

/**
 * Retrieves the number of rollups managed by the `rollupManager` contract on a supported blockchain network.
 *
 * @param {PublicClient} client - A `PublicClient` instance from `viem`.
 * @returns {Promise<number>} - The number of rollups from the `rollupManager` contract.
 *                              Returns `-1` if the chain is unsupported or the contract is unavailable.
 *
 * @remarks
 * - Supported chains:
 *   - Ethereum Mainnet (chain ID `1`)
 *   - Ethereum Sepolia Testnet (chain ID `11_155_111`)
 * - The `rollupManager` contract must be defined in the `chain.contracts` object.
 * - Uses the `rollupCount` function from the contract's ABI.
 */
async function getRollupCount(client: PublicClient): Promise<number> {
    const chain = client.chain;

    if (
        chain &&
        (chain.id == 1 || chain.id === 11_155_111) &&
        chain.contracts &&
        chain.contracts.rollupManager
    ) {
        const rollupManager = chain.contracts.rollupManager as {
            address: `0x${string}`;
        };

        const result = await readContract(client, {
            address: rollupManager.address,
            abi: polygonRollupManagerABI,
            functionName: "rollupCount",
        });

        return result as number;
    }

    return -1;
}
