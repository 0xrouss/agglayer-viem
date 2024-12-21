import { Account, Address, createPublicClient, http, WalletClient } from "viem";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
import { polygonZkEvmBridgeV2Abi } from "../../abis";

export async function bridgeMessage(
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

    const publicClient = createPublicClient({
        chain: client.chain,
        transport: http(),
    });

    const { request } = await publicClient.simulateContract({
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
    });

    return await client.writeContract(request);
}
