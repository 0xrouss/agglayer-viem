export type MerkleProofResponse = {
    proof?: {
        merkle_proof: string[];
        rollup_merkle_proof: string[];
        main_exit_root: string;
        rollup_exit_root: string;
    };
    message?: string;
    error?: string;
};

export type TransactionsPagination = {
    hasNextPage: boolean;
    page: number;
    pageSize: number;
    totalCount: number;
};

export type LastCheckpoint = {
    _id: string;
    proposer: string;
    checkpointNumber: number;
    reward: bigint;
    start: number;
    end: number;
    root: string;
    transactionHash: string;
    timestamp: number;
    __v: string;
};

export type TransactionsResponseData = {
    transactions: any[];
    pagination: TransactionsPagination;
    posWithdrawInterval: number;
    lastCheckpoint: LastCheckpoint;
};

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

export type GetTransactionsFromAddressResponse =
    ApiResponse<TransactionsResponseData>;

export type GetMerkleProofResponse = ApiResponse<MerkleProofResponse["proof"]>;
