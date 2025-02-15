import { Account, Address, Client, zeroAddress } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { getUnifiedBridge } from "../../chains";

/**
 * Bridges native ETH from the current network to a destination network.
 * This function is a specialized version of bridgeAsset specifically for bridging native ETH.
 * It automatically uses the zero address as the token address to indicate native ETH.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.destinationAddress - The address that will receive the ETH on the destination chain
 * @param args.amount - The amount of ETH to bridge (in wei)
 * @param args.account - The account that will sign the transaction
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the transaction hash
 */
export async function writeBridgeETH(
  client: Client,
  args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    account: Account | Address;
    forceUpdateGlobalExitRoot?: boolean;
  }
): Promise<`0x${string}`> {
  const {
    destinationNetwork,
    destinationAddress,
    amount,
    account,
    forceUpdateGlobalExitRoot = false,
  } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return writeContract(client, {
    address: unifiedBridge.address,
    abi: polygonZkEvmBridgeV2Abi,
    functionName: "bridgeAsset",
    args: [
      destinationNetwork,
      destinationAddress,
      amount,
      zeroAddress,
      forceUpdateGlobalExitRoot,
      "0x",
    ],
    account,
    value: amount,
    chain: client.chain,
  });
}
