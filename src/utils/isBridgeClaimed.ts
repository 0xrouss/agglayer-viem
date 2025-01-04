import { Address, PublicClient } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../abis";
import { DLT_BRIDGE_ADDRESS } from "../constants";

// TODO
export async function isBridgeClaimed(
    client: PublicClient,
    depositCount: number,
    originNetworkId: number
): Promise<boolean> {
    if (
        !client.chain ||
        !client.chain.contracts ||
        !client.chain.contracts.unifiedBridge
    ) {
        throw new Error(
            "Client not supported, ensure it uses a chain with the unifiedBridge contract"
        );
    }

    const unifiedBridge = client.chain.contracts.unifiedBridge as {
        address: Address;
    };

    return (await client.readContract({
        address: unifiedBridge.address || DLT_BRIDGE_ADDRESS,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "isClaimed",
        args: [depositCount, originNetworkId],
    })) as boolean;
}
