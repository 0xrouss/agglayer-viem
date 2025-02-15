import { Account, Address, Client, zeroAddress } from "viem";
import { writeContract } from "viem/actions";
import { bridgeExtensionAbi } from "../../abis";
import { getBridgeExtension } from "../../chains";

/**
 * Bridges tokens and executes a contract call on the destination network.
 * This function combines bridging tokens with executing a smart contract call on the destination chain.
 * If the call fails, the tokens will be sent to the fallback address.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.callAddress - The address of the contract to call on the destination chain
 * @param args.amount - The amount of tokens to bridge (in smallest unit, e.g., wei for ETH)
 * @param args.token - The address of the token to bridge (use address(0) for native token)
 * @param args.account - The account that will sign the transaction
 * @param args.fallbackAddress - The address to receive tokens if the contract call fails
 * @param args.calldata - The encoded function call data to execute on the destination chain
 * @param args.permitData - Optional permit data for ERC20 permit functionality
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the transaction hash
 */
export async function writeBridgeAndCall(
  client: Client,
  args: {
    destinationNetwork: number;
    callAddress: Address;
    amount: bigint;
    token: Address;
    account: Account | Address;
    fallbackAddress: Address;
    calldata: `0x${string}`;
    permitData?: `0x${string}`;
    forceUpdateGlobalExitRoot?: boolean;
  }
): Promise<`0x${string}`> {
  const {
    destinationNetwork,
    callAddress,
    amount,
    token,
    account,
    fallbackAddress,
    calldata,
    permitData = "0x",
    forceUpdateGlobalExitRoot = false,
  } = args;

  const bridgeExtension = getBridgeExtension(client);

  return writeContract(client, {
    address: bridgeExtension.address,
    abi: bridgeExtensionAbi,
    functionName: "bridgeAndCall",
    args: [
      token,
      amount,
      permitData,
      destinationNetwork,
      callAddress,
      fallbackAddress,
      calldata,
      forceUpdateGlobalExitRoot,
    ],
    value: token === zeroAddress ? amount : 0n,
    account,
    chain: client.chain,
  });
}
