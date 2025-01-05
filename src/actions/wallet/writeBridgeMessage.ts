import { Account, Address, Client } from "viem";
import { polygonZkEvmBridgeV2Abi } from "../../abis";
import { getBridgeAddress } from "../../utils/getBridgeAddress";
import { writeContract } from "viem/actions";
import { assertExtendedClient } from "../../chains";

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
    client: Client,
    args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        forceUpdateGlobalExitRoot: Boolean;
        metadata: any; // TODO
        account: Account | Address;
    }
) /* TODO Add return type */ {
    assertExtendedClient(client);

    const {
        destinationNetwork,
        destinationAddress,
        amount,
        forceUpdateGlobalExitRoot,
        metadata,
        account,
    } = args;

    const bridgeAddress: Address = client.chain.contracts.unifiedBridge.address;

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
