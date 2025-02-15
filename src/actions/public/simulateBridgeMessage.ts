import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";

/**
 * Simulates bridging a message from the current network to a destination network.
 * This function allows testing a message bridge transaction without actually executing it.
 * Messages can be used for cross-chain communication and can optionally carry ETH value.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.destinationAddress - The address that will receive the message on the destination chain
 * @param args.amount - The amount of ETH to send with the message (in wei)
 * @param args.account - The account that will be used to simulate the transaction
 * @param args.metadata - The arbitrary message data to be bridged (as bytes)
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the simulation result containing the request data and result
 */
export async function simulateBridgeMessage(
  client: Client,
  args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    account: Account | Address;
    metadata: `0x${string}`;
    forceUpdateGlobalExitRoot?: boolean;
  }
): Promise<{
  request: Record<string, unknown>;
  result: undefined;
}> {
  const {
    destinationNetwork,
    destinationAddress,
    amount,
    account,
    metadata,
    forceUpdateGlobalExitRoot = false,
  } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return simulateContract(client, {
    address: unifiedBridge.address,
    abi: polygonZkEvmBridgeV2Abi,
    functionName: "bridgeMessage",
    args: [
      destinationNetwork,
      destinationAddress,
      forceUpdateGlobalExitRoot,
      metadata,
    ],
    account,
    value: amount,
    chain: client.chain,
  });
}
