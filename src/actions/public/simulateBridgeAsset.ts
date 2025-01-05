import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { assertExtendedClient } from "../../chains";

/**
 * TODO
 * @param client
 * @param originNetwork
 * @param destinationNetwork
 * @param destinationAddress
 * @param amount
 * @param token
 * @param forceUpdateGlobalExitRoot
 * @param permitData
 * @param account
 * @returns
 */
export async function simulateBridgeAsset(
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        token: Address;
        forceUpdateGlobalExitRoot: Boolean;
        permitData: string;
        account: Account | Address;
    }
) /* TODO Add return type */ {
    assertExtendedClient(client);

    const {
        destinationNetwork,
        destinationAddress,
        amount,
        token,
        forceUpdateGlobalExitRoot,
        permitData,
        account,
    } = args;

    const bridgeAddress: Address = client.chain.contracts.unifiedBridge.address;

    return simulateContract(client, {
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
        value: amount,
        chain: client.chain,
    });
}
