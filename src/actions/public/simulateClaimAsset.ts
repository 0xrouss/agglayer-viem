import { Account, Address, Client, Hash, Hex } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";

/**
 * TODO
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
) /* TODO Add return type */ {
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
