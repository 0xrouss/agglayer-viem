import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";

/**
 * Simulates bridging an ERC20 token or native asset from the current network to a destination network.
 * This function allows testing the bridge transaction without actually executing it.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.destinationAddress - The address that will receive the tokens on the destination chain
 * @param args.amount - The amount of tokens to bridge (in smallest unit, e.g., wei for ETH)
 * @param args.token - The address of the token to bridge (use address(0) for native token)
 * @param args.account - The account that will be used to simulate the transaction
 * @param args.permitData - Optional permit data for ERC20 permit functionality
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the simulation result containing the request data and result
 */
export async function simulateBridgeAsset(
  client: Client,
  args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    token: Address;
    account: Account | Address;
    permitData?: `0x${string}`;
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
    token,
    account,
    permitData = "0x",
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
      token,
      forceUpdateGlobalExitRoot,
      permitData,
    ],
    account,
    chain: client.chain,
  });
}
