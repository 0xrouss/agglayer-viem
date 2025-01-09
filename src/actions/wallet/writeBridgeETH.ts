import { Account, Address, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { getUnifiedBridge } from "../../chains";
import { ZERO_ADDRESS, ZERO_DATA } from "../../constants";

/**
 * TODO
 * @param client
 * @param destinationNetwork
 * @param destinationAddress
 * @param amount
 * @param token
 * @param forceUpdateGlobalExitRoot
 * @param permitData
 * @param account
 * @returns
 */
export async function writeBridgeETH(
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        forceUpdateGlobalExitRoot?: Boolean;
    }
) /* TODO Add return type */ {
    const {
        destinationNetwork,
        destinationAddress,
        amount,
        account,
        forceUpdateGlobalExitRoot = false,
    } = args;

    const unifiedBridge = getUnifiedBridge(client);

    return writeContract(client, {
        address: unifiedBridge.address,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "bridgeAsset",
        args: [
            destinationNetwork,
            destinationAddress,
            amount,
            ZERO_ADDRESS,
            forceUpdateGlobalExitRoot,
            ZERO_DATA,
        ],
        account,
        value: amount,
        chain: client.chain,
    });
}
