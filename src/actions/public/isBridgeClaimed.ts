import { Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";
import { readContract } from "viem/actions";

// TODO Add documentation
export async function isBridgeClaimed(
    client: Client,
    args: {
        depositCount: number;
        originNetworkId: number;
    }
) /* TODO Add return type */ {
    const { depositCount, originNetworkId } = args;

    const unifiedBridge = getUnifiedBridge(client);

    return readContract(client, {
        address: unifiedBridge.address,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "isClaimed",
        args: [depositCount, originNetworkId],
    });
}
