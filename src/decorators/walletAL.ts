import { Account, Chain, Address, Transport, Client, Hash, Hex } from "viem";
import {
    writeBridgeAsset,
    writeBridgeETH,
    writeBridgeMessage,
    writeBridgeAndCall,
    writeClaimAsset,
    writeClaimMessage,
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

    writeClaimAsset: (args: {
        smtProofLocalExitRoot: Hash[];
        smtProofRollupExitRoot: Hash[];
        globalIndex: BigInt;
        mainnetExitRoot: Hash;
        rollupExitRoot: Hash;
        originNetwork: number;
        originTokenAddress: Address;
        destinationNetwork: number;
        destinationAddress: Address;
        amount: BigInt;
        metadata: Hex;
        account: Account | Address;
    }) => Promise<any>;

    writeClaimMessage: (args: {
        smtProofLocalExitRoot: Hash[];
        smtProofRollupExitRoot: Hash[];
        globalIndex: BigInt;
        mainnetExitRoot: Hash;
        rollupExitRoot: Hash;
        originNetwork: number;
        originAddress: Address;
        destinationNetwork: number;
        destinationAddress: Address;
        amount: BigInt;
        metadata: Hex;
        account: Account | Address;
    }) => Promise<any>;
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
            writeClaimAsset: (args) => writeClaimAsset(client, args),
            writeClaimMessage: (args) => writeClaimMessage(client, args),
        };
    };
}
