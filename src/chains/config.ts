import { Address, ChainContract } from "viem";

export type ChainConfig = {
    rollupId: number;
    gasToken: {
        name: string;
        symbol: string;
        address: Address;
        network: number;
    };
    unifiedBridge: ChainContract;
    bridgeExtension?: ChainContract;
    rollupManager?: ChainContract;
    rollupContract?: ChainContract;
    api: {
        baseUrl: string;
        version: string;
        requiresPolygonApiKey: boolean;
    };
    testnet: boolean;
};

export const chainsList: Record<number, ChainConfig> = {
    // Ethereum Mainnet
    1: {
        rollupId: 0,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 16_896_718,
        },
        bridgeExtension: {
            address: "0x64b20eb25aed030fd510ef93b9135278b152f6a6",
            blockCreated: 20_865_459,
        },
        rollupManager: {
            address: "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2",
            blockCreated: 16_896_721,
        },
        api: {
            baseUrl: "https://api-gateway.polygon.technology/api/v3",
            version: "v3",
            requiresPolygonApiKey: true,
        },
        testnet: false,
    },
    // Polygon zkEVM
    1101: {
        rollupId: 1,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
        bridgeExtension: {
            address: "0x64b20eb25aed030fd510ef93b9135278b152f6a6",
            blockCreated: 16_460_871,
        },
        rollupContract: {
            address: "0x519E42c24163192Dca44CD3fBDCEBF6be9130987",
            blockCreated: 19_098_451,
        },
        api: {
            baseUrl: "https://api-gateway.polygon.technology/api/v3",
            version: "v3",
            requiresPolygonApiKey: true,
        },
        testnet: false,
    },
    // X Layer
    196: {
        rollupId: 3,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
        bridgeExtension: {
            address: "0x64b20eb25aed030fd510ef93b9135278b152f6a6",
            blockCreated: 5_496_068,
        },
        rollupContract: {
            address: "0x519E42c24163192Dca44CD3fBDCEBF6be9130987",
            blockCreated: 19_545_462,
        },
        api: {
            baseUrl: "https://api-gateway.polygon.technology/api/v3",
            version: "v3",
            requiresPolygonApiKey: true,
        },
        testnet: false,
    },
    // Lumia
    994_873_017: {
        rollupId: 7,
        gasToken: {
            name: "Lumia Token",
            symbol: "LUMIA",
            address: "0xD9343a049D5DBd89CD19DC6BcA8c48fB3a0a42a7",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
        rollupContract: {
            address: "0x92726F7dE49300DBdb60930066bc1d0803c0740B",
            blockCreated: 20_183_666,
        },
        api: {
            baseUrl: "https://prism-bridge-api.eu-north-2.gateway.fm",
            version: "v1",
            requiresPolygonApiKey: false,
        },
        testnet: false,
    },
    // Wirex Paychain
    31415: {
        rollupId: 8,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
        rollupContract: {
            address: "0x78253E2E6120164bd826668A4C96Db20f78A94c9",
            blockCreated: 20_232_613,
        },
        api: {
            baseUrl: "https://pay-chain-bridge-api.eu-central-6.gateway.fm",
            version: "v1",
            requiresPolygonApiKey: false,
        },
        testnet: false,
    },
    // Silicon
    2355: {
        rollupId: 10,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
        bridgeExtension: {
            address: "0x64b20eb25aed030fd510ef93b9135278b152f6a6",
            blockCreated: 1_384_037,
        },
        rollupContract: {
            address: "0x419dcD0f72ebAFd3524b65a97ac96699C7fBebdB",
            blockCreated: 20_572_039,
        },
        api: {
            baseUrl: "https://api-gateway.polygon.technology/api/v3",
            version: "v3",
            requiresPolygonApiKey: true,
        },
        testnet: false,
    },
    // Ternoa
    752_025: {
        rollupId: 13,
        gasToken: {
            name: "Capsule Coin",
            symbol: "CAPS",
            address: "0x03Be5C903c727Ee2C8C4e9bc0AcC860Cca4715e2",
            network: 0,
        },
        unifiedBridge: {
            address: "0x2a3dd3eb832af982ec71669e178424b10dca2ede",
            blockCreated: 0,
        },
        rollupContract: {
            address: "0x7fF0B5fF6Eb8B789456639AC2A02487c338c1789",
            blockCreated: 21_522_690,
        },
        api: {
            baseUrl: "https://bridge.zkevm.ternoa.network/service",
            version: "v1",
            requiresPolygonApiKey: false,
        },
        testnet: false,
    },

    // Testnets
    // Ethereum Sepolia
    11_155_111: {
        rollupId: 0,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 4_789_186,
        },
        bridgeExtension: {
            address: "0x2311BFA86Ae27FC10E1ad3f805A2F9d22Fc8a6a1",
            blockCreated: 5_726_533,
        },
        rollupManager: {
            address: "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff",
            blockCreated: 4_789_190,
        },
        api: {
            baseUrl: "https://api-gateway.polygon.technology/api/v3",
            version: "v3",
            requiresPolygonApiKey: true,
        },
        testnet: true,
    },
    // Polygon zkEVM Cardona
    2442: {
        rollupId: 1,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        },
        bridgeExtension: {
            address: "0x2311BFA86Ae27FC10E1ad3f805A2F9d22Fc8a6a1",
            blockCreated: 2_395_661,
        },
        rollupContract: {
            address: "0xA13Ddb14437A8F34897131367ad3ca78416d6bCa",
            blockCreated: 5_157_692,
        },
        api: {
            baseUrl: "https://api-gateway.polygon.technology/api/v3",
            version: "v3",
            requiresPolygonApiKey: true,
        },
        testnet: true,
    },
    // Lumia Testnet
    1_952_959_480: {
        rollupId: 12,
        gasToken: {
            name: "Lumia Token",
            symbol: "LUMIA",
            address: "0x5787a0C1Ccf0C94D99fE5725120aB1f7482ed9E8",
            network: 0,
        },
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        },
        rollupContract: {
            address: "0x8603CF22EcB4343F82151201BCC4A40Bf6949b90",
            blockCreated: 5_988_558,
        },
        api: {
            baseUrl: "https://lumia-testnet-bridge-api.eu-north-2.gateway.fm",
            version: "v1",
            requiresPolygonApiKey: false,
        },
        testnet: true,
    },
    // Silicon Sepolia
    1_722_641_160: {
        rollupId: 16,
        gasToken: {
            name: "Ether",
            symbol: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            network: 0,
        },
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        },
        rollupContract: {
            address: "0x0947030d46917b307cd77F003beAC1b3EA6D7CF0",
            blockCreated: 6_441_412,
        },
        api: {
            baseUrl: "https://bridge-service-sepolia.silicon.network",
            version: "v1",
            requiresPolygonApiKey: false,
        },
        testnet: true,
    },
    // Haust Testnet
    1_570_754_601: {
        rollupId: 17,
        gasToken: {
            name: "HAUST",
            symbol: "HAUST",
            address: "0x73B3Fcabe217701fC6A83137074955002C2e6C86",
            network: 0,
        },
        unifiedBridge: {
            address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
            blockCreated: 0,
        },
        rollupContract: {
            address: "0xF3eca1D175cD7811519E251A9E0c7F13C9217734",
            blockCreated: 6_510_565,
        },
        api: {
            baseUrl: "https://haust-testnet-bridge-api.eu-north-2.gateway.fm",
            version: "v1",
            requiresPolygonApiKey: false,
        },
        testnet: true,
    },
};
