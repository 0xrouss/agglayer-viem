import { Account, Address, WalletClient } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
import { writeContract } from "viem/actions";

/**
 * TODO
 * @param client
 * @param originNetwork
 * @param destinationNetwork
 * @param destinationAddress
 * @param amount
 * @param forceUpdateGlobalExitRoot
 * @param metadata
 * @param account
 * @returns
 */
export async function writeBridgeMessage(
    client: WalletClient,
    originNetwork: number,
    destinationNetwork: number,
    destinationAddress: Address,
    amount: bigint,
    forceUpdateGlobalExitRoot: Boolean,
    metadata: any, // TODO
    account: Account
) {
    const bridgeAddress: Address = getBridgeAddress(originNetwork);

    return writeContract(client, {
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
