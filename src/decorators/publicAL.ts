import { Account, Chain, Address, Transport, Client } from "viem";
import {
    isBridgeClaimed,
    simulateBridgeETH,
    simulateBridgeMessage,
} from "../actions/public";

export type PublicActionsAL<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined
> = {
    simulateBridgeETH: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        forceUpdateGlobalExitRoot: Boolean;
        account: Account | Address;
    }) => Promise<any>; //TODO

    simulateBridgeMessage: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        forceUpdateGlobalExitRoot: Boolean;
        metadata: any; //TODO
        account: Account | Address;
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
            simulateBridgeETH: (args) => simulateBridgeETH(client, args),
            simulateBridgeMessage: (args) =>
                simulateBridgeMessage(client, args),
            isBridgeClaimed: (args) => isBridgeClaimed(client, args),
        };
    };
}
