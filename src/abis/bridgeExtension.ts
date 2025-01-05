import { Abi } from "viem";

export const bridgeExtensionAbi: Abi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "AmountDoesNotMatchMsgValue", type: "error" },
    { inputs: [], name: "InvalidAddress", type: "error" },
    { inputs: [], name: "InvalidDepositIndex", type: "error" },
    { inputs: [], name: "OriginMustBeBridgeExtension", type: "error" },
    { inputs: [], name: "SenderMustBeBridge", type: "error" },
    { inputs: [], name: "UnclaimedAsset", type: "error" },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        inputs: [],
        name: "bridge",
        outputs: [
            {
                internalType: "contract PolygonZkEVMBridgeV2",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "bytes", name: "permitData", type: "bytes" },
            {
                internalType: "uint32",
                name: "destinationNetwork",
                type: "uint32",
            },
            { internalType: "address", name: "callAddress", type: "address" },
            {
                internalType: "address",
                name: "fallbackAddress",
                type: "address",
            },
            { internalType: "bytes", name: "callData", type: "bytes" },
            {
                internalType: "bool",
                name: "forceUpdateGlobalExitRoot",
                type: "bool",
            },
        ],
        name: "bridgeAndCall",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "bridge_", type: "address" }],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "originAddress", type: "address" },
            { internalType: "uint32", name: "originNetwork", type: "uint32" },
            { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "onMessageReceived",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];
