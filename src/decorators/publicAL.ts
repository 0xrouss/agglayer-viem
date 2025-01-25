import { Account, Chain, Address, Transport, Client, Hash, Hex } from "viem";
import {
    getBridgeLogData,
    getPayloadForClaim,
    getRollupCount,
    getRollupDetails,
    isBridgeClaimed,
    simulateBridgeAndCall,
    simulateBridgeAsset,
    simulateBridgeETH,
    simulateBridgeMessage,
    simulateClaimAsset,
    simulateClaimMessage,
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
        permitData?: string;
        forceUpdateGlobalExitRoot?: Boolean;
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

    simulateBridgeAndCall: (args: {
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

    simulateClaimAsset: (args: {
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
    }) => Promise<any>; // TODO

    simulateClaimMessage: (args: {
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
    }) => Promise<any>; // TODO

    isBridgeClaimed: (args: {
        depositCount: number;
        originNetworkId: number;
    }) => Promise<any>; // TODO

    getRollupDetails: (rollupId: number) => Promise<any>; // TODO

    getRollupCount: () => Promise<any>; // TODO

    getBridgeLogData: (
        transactionHash: Hash,
        bridgeIndex?: number
    ) => Promise<any>; // TODO

    getPayloadForClaim: (
        transactionHash: Hash,
        bridgeIndex?: number
    ) => Promise<any>; // TODO
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
            simulateBridgeAndCall: (args) =>
                simulateBridgeAndCall(client, args),
            simulateClaimAsset: (args) => simulateClaimAsset(client, args),
            simulateClaimMessage: (args) => simulateClaimMessage(client, args),
            isBridgeClaimed: (args) => isBridgeClaimed(client, args),
            getRollupDetails: (rollupId) => getRollupDetails(client, rollupId),
            getRollupCount: () => getRollupCount(client),
            getBridgeLogData: (transactionHash, rollupId) =>
                getBridgeLogData(client, transactionHash, rollupId),
            getPayloadForClaim: (transactionHash, rollupId) =>
                getPayloadForClaim(client, transactionHash, rollupId),
        };
    };
}
