import { Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { assertExtendedClient } from "../../chains";
import { readContract } from "viem/actions";

// TODO Add documentation
export async function isBridgeClaimed(
    client: Client,
    args: {
        depositCount: number;
        originNetworkId: number;
    }
) /* TODO Add return type */ {
    assertExtendedClient(client);

    const { depositCount, originNetworkId } = args;

    const unifiedBridge = client.chain.contracts.unifiedBridge.address;

    return readContract(client, {
        address: unifiedBridge,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "isClaimed",
        args: [depositCount, originNetworkId],
    });
}
