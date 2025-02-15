import { Account, Address, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { getUnifiedBridge } from "../../chains";

/**
 * Bridges an ERC20 token or native asset from the current network to a destination network.
 * This function initiates a bridge transaction that will lock the tokens on the source chain
 * and make them available for claiming on the destination chain.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.destinationAddress - The address that will receive the tokens on the destination chain
 * @param args.amount - The amount of tokens to bridge (in smallest unit, e.g., wei for ETH)
 * @param args.token - The address of the token to bridge (use address(0) for native token)
 * @param args.account - The account that will sign the transaction
 * @param args.permitData - Optional permit data for ERC20 permit functionality
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the transaction hash
 */
export async function writeBridgeAsset(
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
): Promise<`0x${string}`> {
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

  return writeContract(client, {
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
