import { Account, Address, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { getUnifiedBridge } from "../../chains";

/**
 * TODO
 * @param client
 * @param destinationNetwork
 * @param destinationAddress
 * @param amount
 * @param forceUpdateGlobalExitRoot
 * @param metadata
 * @param account
 * @returns
 */
export async function writeBridgeMessage(
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        metadata: any; // TODO
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

    return writeContract(client, {
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
