import { Account, Address, Client, zeroAddress } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";

/**
 * Simulates bridging native ETH from the current network to a destination network.
 * This function allows testing an ETH bridge transaction without actually executing it.
 * It is a specialized version of bridgeAsset specifically for bridging native ETH.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.destinationAddress - The address that will receive the ETH on the destination chain
 * @param args.amount - The amount of ETH to bridge (in wei)
 * @param args.account - The account that will be used to simulate the transaction
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the simulation result containing the request data and result
 */
export async function simulateBridgeETH(
  client: Client,
  args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    account: Account | Address;
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
    forceUpdateGlobalExitRoot = false,
  } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return simulateContract(client, {
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
