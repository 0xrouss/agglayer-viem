import { Account, Address, Client } from "viem";
import { writeContract } from "viem/actions";
import { bridgeExtensionAbi } from "../../abis";
import { ZERO_ADDRESS, ZERO_DATA } from "../../constants";
import { getBridgeExtension } from "../../chains";

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
export async function writeBridgeAndCall(
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

    return writeContract(client, {
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
        value: token === ZERO_ADDRESS ? amount : 0n,
        account,
        chain: client.chain,
    });
}
