import { PublicClient } from "viem";
import { readContract } from "viem/actions";
import { polygonRollupManagerABI } from "../abis";

// TODO
async function getRollupDetails(client: PublicClient, indexedId: number) {
    const chain = client.chain;

    if (
        chain &&
        (chain.id == 1 || chain.id === 11_155_111) &&
        chain.contracts &&
        chain.contracts.rollupManager
    ) {
        const rollupManager = chain.contracts.rollupManager as {
            address: `0x${string}`;
        };

        const result = await readContract(client, {
            address: rollupManager.address,
            abi: polygonRollupManagerABI,
            functionName: "rollupIDToRollupData",
            args: [indexedId],
        });

        return result; // TODO Manage well the return and add type
    }
}
