import { Hash, PublicClient } from "viem";
import { getBridgeLogData } from "./getBridgeLogData";
import { chainsList } from "../chains";
import { getMerkleProof } from "../api/getMerkleProof";

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
        smtProof: response.data.merkle_proof,
        smtProofRollup: response.data.rollup_merkle_proof,
        globalIndex: computeGlobalIndex(
            depositCount,
            chainConfig.rollupId
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
