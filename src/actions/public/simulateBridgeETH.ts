import { Account, Address, Client, zeroAddress } from "viem";
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
 * @param account
 * @param forceUpdateGlobalExitRoot
 * @returns
 */
export async function simulateBridgeETH(
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

    return simulateContract(client, {
        address: unifiedBridge.address,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "bridgeAsset",
        args: [
            destinationNetwork,
            destinationAddress,
            amount,
            zeroAddress,
            forceUpdateGlobalExitRoot,
            ZERO_DATA,
        ],
        account,
        value: amount,
        chain: client.chain,
    });
}
