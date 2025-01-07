import { Account, Chain, Address, Transport, Client } from "viem";
import {
    isBridgeClaimed,
    simulateBridgeAsset,
    simulateBridgeETH,
    simulateBridgeMessage,
} from "../actions/public";

export type PublicActionsAL<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined
> = {
    simulateBridgeAsset: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        token: Address;
        account: Account | Address;
        forceUpdateGlobalExitRoot?: Boolean;
        permitData?: string;
    }) => Promise<any>; //TODO

    simulateBridgeETH: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        forceUpdateGlobalExitRoot?: Boolean;
    }) => Promise<any>; //TODO

    simulateBridgeMessage: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        metadata: any; //TODO
        forceUpdateGlobalExitRoot?: Boolean;
    }) => Promise<any>; //TODO

    isBridgeClaimed: (args: {
        depositCount: number;
        originNetworkId: number;
    }) => Promise<any>; // TODO
};

export function publicActionsAL() {
    return <
        transport extends Transport,
        chain extends Chain | undefined = Chain | undefined,
        account extends Account | undefined = Account | undefined
    >(
        client: Client<transport, chain, account>
    ): PublicActionsAL<chain, account> => {
        return {
            simulateBridgeAsset: (args) => simulateBridgeAsset(client, args),
            simulateBridgeETH: (args) => simulateBridgeETH(client, args),
            simulateBridgeMessage: (args) =>
                simulateBridgeMessage(client, args),
            isBridgeClaimed: (args) => isBridgeClaimed(client, args),
        };
    };
}
