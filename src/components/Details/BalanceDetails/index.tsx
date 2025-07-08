import { Detail } from "..";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import type { IBalanceResponse } from "../../../services/requests/balance/interface";

export function BalanceDetail({ balance }: { balance: IBalanceResponse }) {
  const { theme } = useDarkMode();

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm ${theme.text}`}
    >
      <Detail label="Address" value={balance.address} />
      <Detail label="Balance" value={balance.balance} />
      <Detail label="Tx Count" value={balance.txCount} />
    </div>
  );
}
