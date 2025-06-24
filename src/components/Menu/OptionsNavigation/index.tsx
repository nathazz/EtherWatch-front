import { Eye, MapPin } from "lucide-react";
import React from "react";
import type { ITransaction } from "../../../interface/interfaces";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";

interface IProps {
  activeSection: string;
}

const transactions: ITransaction[] = [
  {
    hash: "0a8b41at...t",
    from: "0x1234...abcd",
    to: "0x23cab",
    value: "1,00 ETH",
  },
  {
    hash: "0xaddd...adz",
    from: "0xd58c...otcJ",
    to: "0x20cab",
    value: "0,50 ETH",
  },
  {
    hash: "0xab8c...vya",
    from: "0xab5c...8rct",
    to: "0x30cab",
    value: "3,00 ETH",
  },
];

export const OptionsNavigation: React.FC<IProps> = ({ activeSection }) => {
  const { theme, isDarkMode } = useDarkMode();

  const renderContent = () => {
    switch (activeSection) {
      case "pending_tx":
        return (
          <div className="p-6 lg:p-8">
            <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
              Address Monitor
            </h2>
            <div
              className={`${theme.cardBg} rounded-xl p-8 ${theme.shadow} border ${theme.border}`}
            >
              <div className="text-center">
                <MapPin
                  className={`mx-auto mb-4 ${theme.textSecondary}`}
                  size={48}
                />
                <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>
                  Monitor Ethereum Addresses
                </h3>
                <p className={theme.textSecondary}>
                  Track specific Ethereum addresses for balance changes and
                  transaction history in real-time.
                </p>
              </div>
            </div>
          </div>
        );
      case "balance_watch":
        return (
          <div className="p-6 lg:p-8">
            <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
              Balance Watch
            </h2>
            <div
              className={`${theme.cardBg} rounded-xl p-8 ${theme.shadow} border ${theme.border}`}
            >
              <div className="text-center">
                <Eye
                  className={`mx-auto mb-4 ${theme.textSecondary}`}
                  size={48}
                />
                <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>
                  Real-time Balance Monitoring
                </h3>
                <p className={theme.textSecondary}>
                  Watch Balance in the Ethereum mempool
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 lg:p-8">
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
                Gas Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} transition-all duration-200 hover:scale-105`}
                >
                  <div
                    className={`${theme.textSecondary} text-sm font-medium mb-2`}
                  >
                    Base Fee
                  </div>
                  <div className={`text-2xl font-bold ${theme.text}`}>
                    45,23{" "}
                    <span className={`text-lg ${theme.textSecondary}`}>
                      Gwei
                    </span>
                  </div>
                </div>
                <div
                  className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} transition-all duration-200 hover:scale-105`}
                >
                  <div
                    className={`${theme.textSecondary} text-sm font-medium mb-2`}
                  >
                    Priority Fee
                  </div>
                  <div className={`text-2xl font-bold ${theme.text}`}>
                    1,50{" "}
                    <span className={`text-lg ${theme.textSecondary}`}>
                      Gwei
                    </span>
                  </div>
                </div>
                <div
                  className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} transition-all duration-200 hover:scale-105`}
                >
                  <div
                    className={`${theme.textSecondary} text-sm font-medium mb-2`}
                  >
                    Max Fee
                  </div>
                  <div className={`text-2xl font-bold ${theme.text}`}>
                    55,00{" "}
                    <span className={`text-lg ${theme.textSecondary}`}>
                      Gwei
                    </span>
                  </div>
                </div>
                <div
                  className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} flex items-center justify-center transition-all duration-200 hover:scale-105`}
                >
                  <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md">
                    Low
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
                Balance Monitor
              </h2>
              <div
                className={`${theme.cardBg} rounded-xl p-8 ${theme.shadow} border ${theme.border}`}
              >
                <div className="mb-6">
                  <div className={`${theme.textSecondary} text-lg font-mono`}>
                    0x1234...abcd
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div className={`text-5xl font-bold ${theme.text}`}>
                    2,345{" "}
                    <span className={`text-3xl ${theme.textSecondary}`}>
                      ETH
                    </span>
                  </div>
                  <div
                    className={`${theme.textSecondary} text-sm flex items-center gap-2 lg:text-right`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Updated in real-time
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
                Pending Transactions
              </h2>
              <div
                className={`${theme.cardBg} rounded-xl overflow-hidden ${theme.shadow} border ${theme.border}`}
              >
                <div
                  className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 ${
                    isDarkMode ? "bg-slate-700" : "bg-gray-100"
                  } ${theme.textSecondary} text-sm font-semibold`}
                >
                  <div>Hash</div>
                  <div className="hidden lg:block">From</div>
                  <div className="hidden lg:block">To</div>
                  <div>Value</div>
                </div>

                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-t ${theme.border} ${theme.hover} transition-colors`}
                  >
                    <div className={`font-mono text-sm ${theme.text}`}>
                      {tx.hash}
                    </div>
                    <div
                      className={`font-mono text-sm ${theme.textSecondary} hidden lg:block`}
                    >
                      {tx.from}
                    </div>
                    <div
                      className={`font-mono text-sm ${theme.textSecondary} hidden lg:block`}
                    >
                      {tx.to}
                    </div>
                    <div className={`font-semibold ${theme.text}`}>
                      {tx.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:hidden mt-6 space-y-4">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className={`font-mono text-sm ${theme.text}`}>
                        {tx.hash}
                      </span>
                      <span className={`font-semibold ${theme.text}`}>
                        {tx.value}
                      </span>
                    </div>
                    <div className={`text-sm ${theme.textSecondary} space-y-1`}>
                      <div>From: {tx.from}</div>
                      <div>To: {tx.to}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="flex-1 md:ml-72">{renderContent()}</div>;
};
