import { Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";
import { readContract } from "viem/actions";

/**
 * Checks if a specific bridge deposit has been claimed on the destination network.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.depositCount - The unique identifier of the bridge deposit
 * @param args.originNetworkId - The network ID where the bridge deposit originated
 * @returns A promise that resolves to a boolean indicating whether the bridge deposit has been claimed
 */
export async function isBridgeClaimed(
  client: Client,
  args: {
    depositCount: number;
    originNetworkId: number;
  }
): Promise<boolean> {
  const { depositCount, originNetworkId } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return readContract(client, {
    address: unifiedBridge.address,
    abi: polygonZkEvmBridgeV2Abi,
    functionName: "isClaimed",
    args: [depositCount, originNetworkId],
  }) as Promise<boolean>;
}
