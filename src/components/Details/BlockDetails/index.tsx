import { Detail } from "..";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import type { IBlockResponse } from "../../../services/requests/block/interface";

export function BlockDetails({ block }: { block: IBlockResponse }) {
  const { theme } = useDarkMode();

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm ${theme.text}`}
    >
      <Detail label="Block Number" value={block.block.number} />
      <Detail label="Hash" value={block.block.hash} />
      <Detail label="Miner" value={block.block.miner} />
      <Detail label="Gas Used" value={block.block.gasUsed} />
      <Detail label="Gas Limit" value={block.block.gasLimit} />
      <Detail label="Difficulty" value={block.block.difficulty} />
      <Detail label="Fee Per Gas" value={block.block.baseFeePerGas} />
      <Detail label="Parent Hash" value={block.block.parentHash} />
      <Detail label="Prev Randao" value={block.block.prevRandao} />
      <Detail
        label="Timestamp"
        value={new Date(block.block.timestamp * 1000).toLocaleString()}
      />
      <Detail
        label="Transactions Count"
        value={block.block.transactions.length}
      />
    </div>
  );
}
