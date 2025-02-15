import { Account, Address, Client, Hash, Hex } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";

/**
 * Simulates claiming bridged assets on the destination network.
 * This function allows testing an asset claim transaction without actually executing it.
 * It verifies the bridge proof and simulates releasing the bridged tokens.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.smtProofLocalExitRoot - Merkle proof for the local exit root
 * @param args.smtProofRollupExitRoot - Merkle proof for the rollup exit root
 * @param args.globalIndex - Global index of the bridge transaction
 * @param args.mainnetExitRoot - Exit root from the mainnet
 * @param args.rollupExitRoot - Exit root from the rollup
 * @param args.originNetwork - The network ID where the bridge originated
 * @param args.originTokenAddress - The address of the token on the origin network
 * @param args.destinationNetwork - The network ID where the claim is being made
 * @param args.destinationAddress - The address that will receive the tokens
 * @param args.amount - The amount of tokens to claim
 * @param args.metadata - Additional metadata associated with the bridge
 * @param args.account - The account that will be used to simulate the transaction
 * @returns A promise that resolves to the simulation result containing the request data and result
 */
export async function simulateClaimAsset(
  client: Client,
  args: {
    smtProofLocalExitRoot: Hash[];
    smtProofRollupExitRoot: Hash[];
    globalIndex: BigInt;
    mainnetExitRoot: Hash;
    rollupExitRoot: Hash;
    originNetwork: number;
    originTokenAddress: Address;
    destinationNetwork: number;
    destinationAddress: Address;
    amount: BigInt;
    metadata: Hex;
    account: Account | Address;
  }
): Promise<{
  request: Record<string, unknown>;
  result: undefined;
}> {
  const {
    smtProofLocalExitRoot,
    smtProofRollupExitRoot,
    globalIndex,
    mainnetExitRoot,
    rollupExitRoot,
    originNetwork,
    originTokenAddress,
    destinationNetwork,
    destinationAddress,
    amount,
    metadata,
    account,
  } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return simulateContract(client, {
    address: unifiedBridge.address,
    abi: polygonZkEvmBridgeV2Abi,
    functionName: "claimAsset",
    args: [
      smtProofLocalExitRoot,
      smtProofRollupExitRoot,
      globalIndex,
      mainnetExitRoot,
      rollupExitRoot,
      originNetwork,
      originTokenAddress,
      destinationNetwork,
      destinationAddress,
      amount,
      metadata,
    ],
    account,
    chain: client.chain,
  });
}
