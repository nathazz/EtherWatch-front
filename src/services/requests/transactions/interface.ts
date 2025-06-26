export interface ISignature {
  _type: "signature";
  networkV: number | null;
  r: string;
  s: string;
  v: number;
}

export interface ITransaction {
  _type: "TransactionResponse";
  accessList: [] | null;
  blockNumber: number;
  blockHash: string;
  blobVersionedHashes: [] | null;
  chainId: string;
  data: string;
  from: string;
  gasLimit: string;
  gasPrice: string;
  hash: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  maxFeePerBlobGas: string | null;
  nonce: number;
  signature: ISignature;
  to: string;
  index: number;
  type: number;
  value: string;
}

export interface ITransactionResponse {
  tx: ITransaction;
}
