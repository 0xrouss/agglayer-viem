import { Client } from "viem";
import { readContract } from "viem/actions";
import { polygonRollupManagerABI } from "../../abis";
import { getRollupManager } from "../../chains";

// TODO
export async function getRollupCount(
    client: Client
) /* TODO Add return type */ {
    const rollupManager = getRollupManager(client);

    return readContract(client, {
        address: rollupManager.address,
        abi: polygonRollupManagerABI,
        functionName: "rollupCount",
    });
}
