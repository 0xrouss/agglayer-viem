import { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { polygonRollupManagerABI } from "../../abis";
import { getRollupManager } from "../../chains";

/**
 * Type definition for rollup data structure
 */
export type RollupData = {
  rollupContract: Address;
  chainID: bigint;
  verifier: Address;
  forkID: bigint;
  lastLocalExitRoot: `0x${string}`;
  lastBatchSequenced: bigint;
  lastVerifiedBatch: bigint;
  _legacyLastPendingState: bigint;
};

/**
 * Retrieves detailed information about a specific rollup from the Polygon zkEVM rollup manager.
 * This function queries the rollup manager contract to get the configuration and state of a rollup.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param rollupId - The unique identifier of the rollup to query
 * @returns A promise that resolves to the rollup data containing configuration and state information
 */
export async function getRollupDetails(
  client: Client,
  rollupId: number
): Promise<RollupData> {
  const rollupManager = getRollupManager(client);

  return readContract(client, {
    address: rollupManager.address,
    abi: polygonRollupManagerABI,
    functionName: "rollupIDToRollupData",
    args: [rollupId],
  }) as Promise<RollupData>;
}
