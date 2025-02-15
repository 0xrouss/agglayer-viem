import { Account, Address, Client, zeroAddress } from "viem";
import { simulateContract } from "viem/actions";
import { bridgeExtensionAbi } from "../../abis";
import { getBridgeExtension } from "../../chains";

/**
 * Simulates bridging tokens and executing a contract call on the destination network.
 * This function allows testing a bridge-and-call transaction without actually executing it.
 * It combines bridging tokens with executing a smart contract call on the destination chain.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.destinationNetwork - The network ID of the destination chain
 * @param args.callAddress - The address of the contract to call on the destination chain
 * @param args.amount - The amount of tokens to bridge (in smallest unit, e.g., wei for ETH)
 * @param args.token - The address of the token to bridge (use address(0) for native token)
 * @param args.account - The account that will be used to simulate the transaction
 * @param args.fallbackAddress - The address to receive tokens if the contract call fails
 * @param args.calldata - The encoded function call data to execute on the destination chain
 * @param args.permitData - Optional permit data for ERC20 permit functionality
 * @param args.forceUpdateGlobalExitRoot - Whether to force an update of the global exit root
 * @returns A promise that resolves to the simulation result containing the request data and result
 */
export async function simulateBridgeAndCall(
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
): Promise<{
  request: Record<string, unknown>;
  result: undefined;
}> {
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

  return simulateContract(client, {
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
