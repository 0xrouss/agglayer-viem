import { Account, Address, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
import { assertExtendedClient } from "../../chains";
import { ZERO_DATA } from "../../constants";

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
export async function writeBridgeAsset(
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
    assertExtendedClient(client);

    const {
        destinationNetwork,
        destinationAddress,
        amount,
        token,
        account,
        permitData = ZERO_DATA,
        forceUpdateGlobalExitRoot = false,
    } = args;

    const bridgeAddress: Address = client.chain.contracts.unifiedBridge.address;

    return writeContract(client, {
        address: bridgeAddress,
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
