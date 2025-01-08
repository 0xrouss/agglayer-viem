import { Hash, PublicClient } from "viem";
import { getBridgeLogData } from "./getBridgeLogData";
import { BridgeApiClient } from "../api/BridgeApiClient";

export async function getPayloadForClaim(
    client: PublicClient,
    transactionHash: Hash,
    bridgeIndex: number = 0
) {
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

    const apiClient = new BridgeApiClient();

    if (
        !client.chain?.custom ||
        !client.chain?.custom.aggLayerIndexedId == null
    ) {
        console.log(client.chain);
        throw new Error("Chain custom data not found");
    }

    const sourceNetworkId = client.chain?.custom.aggLayerIndexedId as number;

    const response = await apiClient.getMerkleProof(
        sourceNetworkId,
        depositCount
    );

    if (!response.success) {
        throw new Error(response.error);
    }
    if (!response.data) {
        throw new Error("Proof data not found");
    }

    const payload = {
        smtProof: response.data.merkle_proof,
        smtProofRollup: response.data.rollup_merkle_proof,
        globalIndex: computeGlobalIndex(
            depositCount,
            sourceNetworkId
        ).toString(),
        mainnetExitRoot: response.data.main_exit_root,
        rollupExitRoot: response.data.rollup_exit_root,
        originNetwork: originNetwork,
        originTokenAddress: originTokenAddress,
        destinationNetwork: destinationNetwork,
        destinationAddress: destinationAddress,
        amount: amount,
        metadata: metadata,
    };
    return payload;
}

function computeGlobalIndex(indexLocal: number, sourceNetworkId: number) {
    const _GLOBAL_INDEX_MAINNET_FLAG = BigInt(2 ** 64);

    if (BigInt(sourceNetworkId) === BigInt(0)) {
        return BigInt(indexLocal) + _GLOBAL_INDEX_MAINNET_FLAG;
    } else {
        return (
            BigInt(indexLocal) + BigInt(sourceNetworkId - 1) * BigInt(2 ** 32)
        );
    }
}
