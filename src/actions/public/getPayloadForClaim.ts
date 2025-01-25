import { Address, Hash, Hex, Client } from "viem";
import { getBridgeLogData } from "./getBridgeLogData";
import { chainsList } from "../../chains";
import { getMerkleProof } from "../../api/getMerkleProof";

// TODO
export async function getPayloadForClaim(
    client: Client,
    transactionHash: Hash,
    bridgeIndex: number = 0
): Promise<{
    smtProof: Hash[];
    smtProofRollup: Hash[];
    globalIndex: BigInt;
    mainnetExitRoot: Hash;
    rollupExitRoot: Hash;
    originNetwork: number;
    originAddress: Address;
    destinationNetwork: number;
    destinationAddress: Address;
    amount: BigInt;
    metadata: Hex;
}> {
    const data = await getBridgeLogData(client, transactionHash, bridgeIndex);
    const {
        originNetwork,
        originAddress,
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
        smtProof: response.data.merkle_proof as Hash[],
        smtProofRollup: response.data.rollup_merkle_proof as Hash[],
        globalIndex: computeGlobalIndex(
            depositCount,
            chainConfig.rollupId
        ) as BigInt,
        mainnetExitRoot: response.data.main_exit_root as Hash,
        rollupExitRoot: response.data.rollup_exit_root as Hash,
        originNetwork: originNetwork as number,
        originAddress: originAddress as Address,
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
        return (
            BigInt(indexLocal) + BigInt(sourceNetworkId - 1) * BigInt(2 ** 32)
        );
    }
}
