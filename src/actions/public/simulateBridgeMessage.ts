import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getUnifiedBridge } from "../../chains";

/**
 * TODO
 * @param client
 * @param destinationNetwork
 * @param destinationAddress
 * @param amount
 * @param token
 * @param account
 * @param metadata
 * @param forceUpdateGlobalExitRoot
 * @returns
 */
export async function simulateBridgeMessage(
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        metadata: any; //TODO
        forceUpdateGlobalExitRoot?: Boolean;
    }
) /* TODO Add return type */ {
    const {
        destinationNetwork,
        destinationAddress,
        amount,
        account,
        metadata,
        forceUpdateGlobalExitRoot = false,
    } = args;

    const unifiedBridge = getUnifiedBridge(client);

    return simulateContract(client, {
        address: unifiedBridge.address,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "bridgeMessage",
        args: [
            destinationNetwork,
            destinationAddress,
            forceUpdateGlobalExitRoot,
            metadata,
        ],
        account,
        value: amount,
        chain: client.chain,
    });
}
