import { Account, Address, Client } from "viem";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { assertExtendedClient } from "../../chains";
import { ZERO_ADDRESS, ZERO_DATA } from "../../constants";

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
    assertExtendedClient(client);

    const {
        destinationNetwork,
        destinationAddress,
        amount,
        account,
        forceUpdateGlobalExitRoot = false,
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
