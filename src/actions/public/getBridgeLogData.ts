import { AbiEvent, decodeAbiParameters, Hash, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { BridgeLogData } from "../../types/bridge";
import { getTransactionReceipt } from "viem/actions";

/**
 * Extracts and decodes bridge event data from a transaction receipt.
 * This function looks for BridgeEvent logs in the transaction receipt and decodes the data
 * into a structured format.
 *
 * @param client - The Viem client instance for interacting with the blockchain
 * @param transactionHash - The hash of the transaction containing the bridge event
 * @param bridgeIndex - Optional index of the bridge event in case of multiple events (defaults to 0)
 * @returns A promise that resolves to the decoded bridge event data
 * @throws Error if the bridge event log is not found or if the data cannot be decoded
 */
export async function getBridgeLogData(
  client: Client,
  transactionHash: Hash,
  bridgeIndex: number = 0
): Promise<BridgeLogData> {
  const receipt = await getTransactionReceipt(client, {
    hash: transactionHash,
  });

  const logs = receipt.logs.filter(
    (log) =>
      log.topics[0] &&
      log.topics[0].toLowerCase() ===
        "0x501781209a1f8899323b96b4ef08b168df93e0a90c673d1e4cce39366cb62f9b"
  );
  if (!logs.length) {
    throw new Error("Log not found in receipt");
  }
  const data = logs[bridgeIndex].data;
  return decodedBridgeData(data);
}

/**
 * Internal helper function to decode the raw bridge event data.
 *
 * @param data - The raw event data as a hex string
 * @returns The decoded bridge event data
 * @throws Error if the data cannot be decoded
 */
function decodedBridgeData(data: Hash): BridgeLogData {
  const abi = polygonZkEvmBridgeV2Abi;

  const isAbiEvent = (item: unknown): item is AbiEvent =>
    typeof item === "object" &&
    item !== null &&
    "name" in item &&
    typeof item.name === "string";

  const types = abi
    .filter(isAbiEvent)
    .filter((event) => event.name === "BridgeEvent");

  if (!types.length) {
    throw new Error("BridgeEvent not found in ABI");
  }

  const decodedData = decodeAbiParameters(types[0].inputs, data);
  const [
    leafType,
    originNetwork,
    originTokenAddress,
    destinationNetwork,
    destinationAddress,
    amount,
    metadata,
    depositCount,
  ] = decodedData;

  const result = {
    leafType,
    originNetwork,
    originTokenAddress,
    destinationNetwork,
    destinationAddress,
    amount,
    metadata: metadata || "0x",
    depositCount,
  };

  return result;
}
