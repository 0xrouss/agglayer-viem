import { AbiEvent, decodeAbiParameters, Hash, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { BridgeLogData } from "../../types/bridge";
import { getTransactionReceipt } from "viem/actions";

// TODO
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

function decodedBridgeData(data: Hash): BridgeLogData {
    const abi = polygonZkEvmBridgeV2Abi;

    // Type guard to filter only AbiEvent objects
    const isAbiEvent = (item: any): item is AbiEvent => item.name !== undefined;

    const types = abi
        .filter(isAbiEvent)
        .filter((event) => event.name === "BridgeEvent");

    if (!types.length) {
        throw new Error("Data not decoded");
    }

    const decodedData = decodeAbiParameters(types[0].inputs, data);
    const [
        leafType,
        originNetwork,
        originAddress,
        destinationNetwork,
        destinationAddress,
        amount,
        metadata,
        depositCount,
    ] = decodedData;

    const result = {
        leafType,
        originNetwork,
        originAddress,
        destinationNetwork,
        destinationAddress,
        amount,
        metadata: metadata || "0x",
        depositCount,
    };

    return result;
}
