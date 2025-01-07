import { Account, Chain, Address, Transport, Client } from "viem";
import {
    writeBridgeAsset,
    writeBridgeETH,
    writeBridgeMessage,
} from "../actions/wallet";

export type WalletActionsAL<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined
> = {
    writeBridgeAsset: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        token: Address;
        forceUpdateGlobalExitRoot: Boolean;
        permitData: string;
        account: Account | Address;
    }) => Promise<any>; //TODO

    writeBridgeETH: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        forceUpdateGlobalExitRoot: Boolean;
        account: Account | Address;
    }) => Promise<any>; //TODO

    writeBridgeMessage: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        forceUpdateGlobalExitRoot: Boolean;
        metadata: any; //TODO
        account: Account | Address;
    }) => Promise<any>; //TODO
};

export function walletActionsAL() {
    return <
        transport extends Transport,
        chain extends Chain | undefined = Chain | undefined,
        account extends Account | undefined = Account | undefined
    >(
        client: Client<transport, chain, account>
    ): WalletActionsAL<chain, account> => {
        return {
            writeBridgeAsset: (args) => writeBridgeAsset(client, args),
            writeBridgeETH: (args) => writeBridgeETH(client, args),
            writeBridgeMessage: (args) => writeBridgeMessage(client, args),
        };
    };
}
