export interface IBlock {
  _type: "Block";
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  blobGasUsed: string;
  excessBlobGas: string;
  hash: string;
  miner: string;
  prevRandao: string;
  nonce: string;
  number: number;
  parentHash: string;
  timestamp: number;
  parentBeaconBlockRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  transactions: string[];
}

export interface IBlockResponse {
  block: IBlock;
}
