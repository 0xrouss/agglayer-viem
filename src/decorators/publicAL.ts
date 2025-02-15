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
import { BridgeLogData } from "../types/bridge";
import { RollupData } from "../actions/public/getRollupDetails";

type SimulationResult = {
  request: Record<string, unknown>;
  result: undefined;
};

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
    permitData?: `0x${string}`;
    forceUpdateGlobalExitRoot?: boolean;
  }) => Promise<SimulationResult>;

  simulateBridgeETH: (args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    account: Account | Address;
    forceUpdateGlobalExitRoot?: boolean;
  }) => Promise<SimulationResult>;

  simulateBridgeMessage: (args: {
    destinationNetwork: number;
    destinationAddress: Address;
    amount: bigint;
    account: Account | Address;
    metadata: `0x${string}`;
    forceUpdateGlobalExitRoot?: boolean;
  }) => Promise<SimulationResult>;

  simulateBridgeAndCall: (args: {
    destinationNetwork: number;
    callAddress: Address;
    amount: bigint;
    token: Address;
    account: Account | Address;
    fallbackAddress: Address;
    calldata: `0x${string}`;
    permitData?: `0x${string}`;
    forceUpdateGlobalExitRoot?: boolean;
  }) => Promise<SimulationResult>;

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
  }) => Promise<SimulationResult>;

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
  }) => Promise<SimulationResult>;

  isBridgeClaimed: (args: {
    depositCount: number;
    originNetworkId: number;
  }) => Promise<boolean>;

  getRollupDetails: (rollupId: number) => Promise<RollupData>;

  getRollupCount: () => Promise<bigint>;

  getBridgeLogData: (
    transactionHash: Hash,
    bridgeIndex?: number
  ) => Promise<BridgeLogData>;

  getPayloadForClaim: (
    transactionHash: Hash,
    bridgeIndex?: number
  ) => Promise<{
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
  }>;
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
      simulateBridgeMessage: (args) => simulateBridgeMessage(client, args),
      simulateBridgeAndCall: (args) => simulateBridgeAndCall(client, args),
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
