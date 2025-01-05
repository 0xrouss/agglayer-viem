import { Account, Address, Client } from "viem";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";
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
export async function writeBridgeAsset(
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
        value: amount,
        chain: client.chain,
    });
}
