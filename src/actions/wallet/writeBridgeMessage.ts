import { Account, Address, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { getUnifiedBridge } from "../../chains";

/**
 * Bridges a message from the current network to a destination network through the Polygon zkEVM Bridge V2.
 * This function allows sending arbitrary messages across networks with an optional ETH value attached.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.destinationAddress - The address that will receive the message on the destination chain
 * @param args.amount - The amount of ETH to send with the message (in wei)
 * @param args.account - The account that will sign the transaction
 * @param args.metadata - The arbitrary message data to be bridged (as bytes)
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the transaction hash
 */
export async function writeBridgeMessage(
  client: Client,
  args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    account: Account | Address;
    metadata: `0x${string}`; // Hex string representing bytes
    forceUpdateGlobalExitRoot?: boolean;
  }
): Promise<`0x${string}`> {
  const {
    destinationNetwork,
    destinationAddress,
    amount,
    account,
    metadata,
    forceUpdateGlobalExitRoot = false,
  } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return writeContract(client, {
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
