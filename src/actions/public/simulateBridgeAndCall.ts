import { Account, Address, Client, zeroAddress } from "viem";
import { simulateContract } from "viem/actions";
import { bridgeExtensionAbi } from "../../abis";
import { getBridgeExtension } from "../../chains";
import { ZERO_DATA } from "../../constants";

/**
 * TODO
 * @param client
 * @param destinationNetwork
 * @param callAddress
 * @param amount
 * @param token
 * @param account
 * @param fallbackAddress
 * @param calldata
 * @param permitData
 * @param forceUpdateGlobalExitRoot
 * @returns
 */
export async function simulateBridgeAndCall(
    client: Client,
    args: {
        destinationNetwork: number;
        callAddress: Address;
        amount: bigint;
        token: Address;
        account: Account | Address;
        fallbackAddress: Address;
        calldata: string;
        permitData?: string;
        forceUpdateGlobalExitRoot?: Boolean;
    }
) /* TODO Add return type */ {
    const {
        destinationNetwork,
        callAddress,
        amount,
        token,
        account,
        fallbackAddress,
        calldata,
        permitData = ZERO_DATA,
        forceUpdateGlobalExitRoot = false,
    } = args;

    const bridgeExtension = getBridgeExtension(client);

    return simulateContract(client, {
        address: bridgeExtension.address,
        abi: bridgeExtensionAbi,
        functionName: "bridgeAndCall",
        args: [
            token,
            amount,
            permitData,
            destinationNetwork,
            callAddress,
            fallbackAddress,
            calldata,
            forceUpdateGlobalExitRoot,
        ],
        value: token === zeroAddress ? amount : 0n,
        account,
        chain: client.chain,
    });
}
