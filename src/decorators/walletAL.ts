import { Account, Chain, Address, Transport, Client } from "viem";
import {
    writeBridgeAsset,
    writeBridgeETH,
    writeBridgeMessage,
    writeBridgeAndCall,
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
        account: Account | Address;
        permitData?: string;
        forceUpdateGlobalExitRoot?: Boolean;
    }) => Promise<any>; //TODO

    writeBridgeETH: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        forceUpdateGlobalExitRoot?: Boolean;
    }) => Promise<any>; //TODO

    writeBridgeMessage: (args: {
        destinationNetwork: number;
        destinationAddress: Address;
        amount: bigint;
        account: Account | Address;
        metadata: any; //TODO
        forceUpdateGlobalExitRoot?: Boolean;
    }) => Promise<any>; //TODO

    writeBridgeAndCall: (args: {
        destinationNetwork: number;
        callAddress: Address;
        amount: bigint;
        token: Address;
        account: Account | Address;
        fallbackAddress: Address;
        calldata: string;
        permitData?: string;
        forceUpdateGlobalExitRoot?: Boolean;
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
            writeBridgeAndCall: (args) => writeBridgeAndCall(client, args),
        };
    };
}
