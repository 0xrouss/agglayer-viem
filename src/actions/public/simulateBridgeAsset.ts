import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { ZERO_DATA } from "../../constants";
import { getUnifiedBridge } from "../../chains";

/**
 * TODO
 * @param client
 * @param destinationNetwork
 * @param destinationAddress
 * @param amount
 * @param token
 * @param account
 * @param permitData
 * @param forceUpdateGlobalExitRoot
 * @returns
 */
export async function simulateBridgeAsset(
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        token: Address;
        account: Account | Address;
        permitData?: string;
        forceUpdateGlobalExitRoot?: Boolean;
    }
) /* TODO Add return type */ {
    const {
        destinationNetwork,
        destinationAddress,
        amount,
        token,
        account,
        permitData = ZERO_DATA,
        forceUpdateGlobalExitRoot = false,
    } = args;

    const unifiedBridge = getUnifiedBridge(client);

    return simulateContract(client, {
        address: unifiedBridge.address,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "bridgeAsset",
        args: [
            destinationNetwork,
            destinationAddress,
            amount,
            token,
            forceUpdateGlobalExitRoot,
            permitData,
        ],
        account,
        chain: client.chain,
    });
}
