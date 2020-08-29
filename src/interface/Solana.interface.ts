export interface SolanaTransaction {
    signatures: Array<string>;
    accountKeys: Array<string>;
    programIdIndex: Array<number>;
    
    numReadonlySignedAccounts: number;
    numReadonlyUnsignedAccounts: number;
    numRequiredSignatures: number;
}