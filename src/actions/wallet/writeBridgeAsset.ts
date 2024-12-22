import { Account, Address, WalletClient } from "viem";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { writeContract } from "viem/actions";

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
    client: WalletClient,
    originNetwork: number,
    destinationNetwork: number,
    destinationAddress: Address,
    amount: bigint,
    token: Address,
    forceUpdateGlobalExitRoot: Boolean,
    permitData: string,
    account: Account
) {
    const bridgeAddress: Address = getBridgeAddress(originNetwork);

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
