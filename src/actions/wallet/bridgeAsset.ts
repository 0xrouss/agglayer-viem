import { Account, Address, createPublicClient, http, WalletClient } from "viem";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
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
export async function bridgeAsset(
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

    const publicClient = createPublicClient({
        chain: client.chain,
        transport: http(),
    });

    const { request } = await publicClient.simulateContract({
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
    });

    return await client.writeContract(request);
}
