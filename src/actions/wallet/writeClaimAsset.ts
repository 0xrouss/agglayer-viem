import { Account, Address, Client, Hash, Hex } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { getUnifiedBridge } from "../../chains";

/**
 * Claims bridged assets on the destination network.
 * This function verifies the bridge proof and releases the bridged tokens to the destination address.
 * It requires proof data that can be obtained using the getPayloadForClaim function.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param args.smtProofLocalExitRoot - Merkle proof for the local exit root
 * @param args.smtProofRollupExitRoot - Merkle proof for the rollup exit root
 * @param args.globalIndex - Global index of the bridge transaction
 * @param args.mainnetExitRoot - Exit root from the mainnet
 * @param args.rollupExitRoot - Exit root from the rollup
 * @param args.originNetwork - The network ID where the bridge originated
 * @param args.originAddress - The address of the token on the origin network
 * @param args.destinationNetwork - The network ID where the claim is being made
 * @param args.destinationAddress - The address that will receive the tokens
 * @param args.amount - The amount of tokens to claim
 * @param args.metadata - Additional metadata associated with the bridge
 * @param args.account - The account that will sign the claim transaction
 * @returns A promise that resolves to the transaction hash
 */
export async function writeClaimAsset(
  client: Client,
  args: {
    smtProofLocalExitRoot: Hash[];
    smtProofRollupExitRoot: Hash[];
    globalIndex: BigInt;
    mainnetExitRoot: Hash;
    rollupExitRoot: Hash;
    originNetwork: number;
    originAddress: Address;
    destinationNetwork: number;
    destinationAddress: Address;
    amount: BigInt;
    metadata: Hex;
    account: Account | Address;
  }
): Promise<`0x${string}`> {
  const {
    smtProofLocalExitRoot,
    smtProofRollupExitRoot,
    globalIndex,
    mainnetExitRoot,
    rollupExitRoot,
    originNetwork,
    originAddress,
    destinationNetwork,
    destinationAddress,
    amount,
    metadata,
    account,
  } = args;

  const unifiedBridge = getUnifiedBridge(client);

  return writeContract(client, {
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
      originAddress,
      destinationNetwork,
      destinationAddress,
      amount,
      metadata,
    ],
    account,
    chain: client.chain,
  });
}
