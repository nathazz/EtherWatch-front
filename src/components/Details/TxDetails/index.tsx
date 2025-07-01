import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import type { ITransactionResponse } from "../../../services/requests/transactions/interface";

export function TransactionDetails({ tx }: { tx: ITransactionResponse }) {
  const { theme } = useDarkMode();

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm ${theme.text}`}
    >
      <Detail label="Hash" value={tx.tx.hash} />
      <Detail label="From" value={tx.tx.from} />
      <Detail label="To" value={tx.tx.to} />
      <Detail label="Value" value={tx.tx.value} />
      <Detail label="Gas Price" value={tx.tx.gasPrice} />
      <Detail label="Nonce" value={tx.tx.nonce} />
      <Detail label="Block Number" value={tx.tx.blockNumber} />
      <Detail label="Type" value={tx.tx.type} />
      <Detail label="Chain ID" value={tx.tx.chainId} />
      <Detail label="Data" value={tx.tx.data} />
      <Detail label="Signature" value={JSON.stringify(tx.tx.signature)} />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  const { theme } = useDarkMode();
  return (
    <div className="flex flex-col">
      <span
        className={`uppercase text-xs font-semibold ${theme.textSecondary}`}
      >
        {label}
      </span>
      <span className={`break-all font-medium`}>{value}</span>
    </div>
  );
}
