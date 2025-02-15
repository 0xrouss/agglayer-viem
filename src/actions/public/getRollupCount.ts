import { Client } from "viem";
import { readContract } from "viem/actions";
import { polygonRollupManagerABI } from "../../abis";
import { getRollupManager } from "../../chains";

/**
 * Retrieves the total number of rollups registered in the Polygon zkEVM rollup manager.
 * This function queries the rollup manager contract to get the count of all registered rollups.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @returns A promise that resolves to the number of registered rollups as a bigint
 */
export async function getRollupCount(client: Client): Promise<bigint> {
  const rollupManager = getRollupManager(client);

  return readContract(client, {
    address: rollupManager.address,
    abi: polygonRollupManagerABI,
    functionName: "rollupCount",
  }) as Promise<bigint>;
}
