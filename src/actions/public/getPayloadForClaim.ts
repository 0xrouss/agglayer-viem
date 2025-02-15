import { Address, Hash, Hex, Client } from "viem";
import { getBridgeLogData } from "./getBridgeLogData";
import { chainsList } from "../../chains";
import { getMerkleProof } from "../../api/getMerkleProof";

/**
 * Type definition for the claim payload data structure
 */
export type ClaimPayload = {
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
};

/**
 * Retrieves the necessary payload data for claiming bridged assets or messages.
 * This function gathers all required proof data and parameters needed to execute
 * a claim on the destination network.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param transactionHash - The hash of the original bridge transaction
 * @param bridgeIndex - Optional index of the bridge event in case of multiple events (defaults to 0)
 * @returns A promise that resolves to the claim payload containing all necessary proof data
 * @throws Error if:
 *  - The client's chain is not configured
 *  - The merkle proof request fails
 *  - The proof data is not found
 */
export async function getPayloadForClaim(
  client: Client,
  transactionHash: Hash,
  bridgeIndex: number = 0
): Promise<ClaimPayload> {
  const data = await getBridgeLogData(client, transactionHash, bridgeIndex);
  const {
    originNetwork,
    originTokenAddress,
    destinationNetwork,
    destinationAddress,
    amount,
    metadata,
    depositCount,
  } = data;

  if (!client.chain) {
    throw new Error("Client does not have chain");
  }

  const chainConfig = chainsList[client.chain.id];

  const response = await getMerkleProof(client.chain.id, depositCount);

  if (!response.success) {
    throw new Error(response.error);
  }
  if (!response.data) {
    throw new Error("Proof data not found");
  }

  const payload = {
    smtProofLocalExitRoot: response.data.merkle_proof as Hash[],
    smtProofRollupExitRoot: response.data.rollup_merkle_proof as Hash[],
    globalIndex: computeGlobalIndex(
      depositCount,
      chainConfig.rollupId
    ) as BigInt,
    mainnetExitRoot: response.data.main_exit_root as Hash,
    rollupExitRoot: response.data.rollup_exit_root as Hash,
    originNetwork: originNetwork as number,
    originAddress: originTokenAddress as Address,
    destinationNetwork: destinationNetwork as number,
    destinationAddress: destinationAddress as Address,
    amount: amount as BigInt,
    metadata: metadata as Hex,
  };
  return payload;
}

function computeGlobalIndex(indexLocal: number, sourceNetworkId: number) {
  const _GLOBAL_INDEX_MAINNET_FLAG = BigInt(2 ** 64);

  if (BigInt(sourceNetworkId) === BigInt(0)) {
    return BigInt(indexLocal) + _GLOBAL_INDEX_MAINNET_FLAG;
  } else {
    return BigInt(indexLocal) + BigInt(sourceNetworkId - 1) * BigInt(2 ** 32);
  }
}
