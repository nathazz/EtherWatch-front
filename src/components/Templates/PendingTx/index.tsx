import { MapPin } from "lucide-react";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";

export const PendingTX = () => {
  const { theme } = useDarkMode();

  return (
    <div className={`p-6 lg:p-8 ${theme.bg} min-h-screen`}>
      <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
        Address Monitor
      </h2>

      <div
        className={`${theme.cardBg} rounded-xl p-8 ${theme.shadow} border ${theme.border}`}
      >
        <div className="text-center mb-8">
          <MapPin className={`mx-auto mb-4 ${theme.textSecondary}`} size={48} />
          <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>
            Monitor Ethereum Addresses
          </h3>
          <p className={theme.textSecondary}>
            Track Ethereum transactions in real-time.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className={`min-w-full text-sm ${theme.text}`}>
            <thead>
              <tr className={`${theme.border} border-b text-left`}>
                <th className="p-2">From</th>
                <th className="p-2">To</th>
                <th className="p-2">Value (ETH)</th>
                <th className="p-2">Gas Price (Gwei)</th>
                <th className="p-2">Nonce</th>
              </tr>
            </thead>
            <tbody>
              {/* {txs.map((tx) => (
                <tr key={tx.hash} className={`${theme.hover} transition-colors`}>
                  <td className="p-2 truncate max-w-xs">{tx.from}</td>
                  <td className="p-2 truncate max-w-xs">{tx.to || "-"}</td>
                  <td className="p-2">{(parseFloat(tx.value) / 1e18).toFixed(5)}</td>
                  <td className="p-2">{(parseFloat(tx.gasPrice) / 1e9).toFixed(2)}</td>
                  <td className="p-2">{tx.nonce}</td>
                </tr>
              ))}

              {txs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-400">
                    No pending transactions found.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
