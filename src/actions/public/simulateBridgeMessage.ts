import { Account, Address, PublicClient } from "viem";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
import { simulateContract } from "viem/actions";
import { polygonZkEvmBridgeV2Abi } from "../../abis";

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
export async function simulateBridgeMessage(
    client: PublicClient,
    originNetwork: number,
    destinationNetwork: number,
    destinationAddress: Address,
    amount: bigint,
    forceUpdateGlobalExitRoot: Boolean,
    metadata: any, //TODO
    account: Account
) {
    const bridgeAddress: Address = getBridgeAddress(originNetwork);

    return simulateContract(client, {
        address: bridgeAddress,
        abi: polygonZkEvmBridgeV2Abi,
        functionName: "bridgeMessage",
        args: [
            destinationNetwork,
            destinationAddress,
            forceUpdateGlobalExitRoot,
            metadata,
        ],
        account,
        value: amount,
        chain: client.chain,
    });
}
