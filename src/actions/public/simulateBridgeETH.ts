import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { assertExtendedClient } from "../../chains";
import { ZERO_ADDRESS, ZERO_DATA } from "../../constants";

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
export async function simulateBridgeETH(
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        forceUpdateGlobalExitRoot: Boolean;
        account: Account | Address;
    }
) /* TODO Add return type */ {
    assertExtendedClient(client);

    const {
        destinationNetwork,
        destinationAddress,
        amount,
        forceUpdateGlobalExitRoot,
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
            ZERO_ADDRESS,
            forceUpdateGlobalExitRoot,
            ZERO_DATA,
        ],
        account,
        value: amount,
        chain: client.chain,
    });
}
