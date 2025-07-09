import { useEffect, useState } from "react";
import { MapPin, Activity, Zap, Hash, Clock, ArrowRight } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { TransactionResponse } from "ethers";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import { Tooltip } from "../../Tooltip";
import { formatValues } from "../../../utils/formatValues";

let socket: Socket;

export const PendingTX = () => {
  const { theme } = useDarkMode();
  const [txs, setTxs] = useState<TransactionResponse[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_DEV);
    socket.emit("subscribePendingTxs");

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("pendingTx", (tx: TransactionResponse) => {
      setTxs((prev) => [tx, ...prev.slice(0, 19)]);
    });

    return () => {
      socket.emit("unsubscribePendingTxs");
      socket.disconnect();
    };
  }, []);

  return (
    <div
      className={`min-h-screen w-full ${theme.bg} transition-colors duration-200`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="relative">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="text-white w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              {isConnected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
          <h1
            className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 ${theme.text}`}
          >
            Ethereum Monitor
          </h1>
          <p
            className={`text-sm sm:text-base lg:text-lg ${theme.textSecondary} max-w-2xl mx-auto leading-relaxed`}
          >
            Real-time tracking of Ethereum transactions with live updates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div
            className={`${theme.cardBg} rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border ${theme.border} transition-all duration-200 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm ${theme.textSecondary} mb-1 font-medium`}
                >
                  Total Monitored
                </p>
                <p className={`text-xl lg:text-2xl font-bold ${theme.text}`}>
                  {txs.length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                <Hash className="text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
            </div>
          </div>

          <div
            className={`${theme.cardBg} rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border ${theme.border} transition-all duration-200 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm ${theme.textSecondary} mb-1 font-medium`}
                >
                  Connection
                </p>
                <p
                  className={`text-xl lg:text-2xl font-bold ${
                    isConnected
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isConnected ? "Live" : "Offline"}
                </p>
              </div>
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 ${
                  isConnected
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                } rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}
              >
                <Zap
                  className={`w-5 h-5 ${
                    isConnected
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
            </div>
          </div>

          <div
            className={`${theme.cardBg} rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border ${theme.border} transition-all duration-200 hover:shadow-xl sm:col-span-2 xl:col-span-1`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm ${theme.textSecondary} mb-1 font-medium`}
                >
                  Latest Nonce
                </p>
                <p className={`text-xl lg:text-2xl font-bold ${theme.text}`}>
                  {txs.length > 0 ? txs[0].nonce : "-"}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                <Clock className="text-purple-600 dark:text-purple-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table/Cards */}
        <div
          className={`${theme.cardBg} rounded-xl lg:rounded-2xl shadow-lg border ${theme.border} overflow-hidden`}
        >
          <div className={`p-4 lg:p-6 border-b ${theme.border}`}>
            <h2
              className={`text-lg lg:text-xl font-semibold ${theme.text} flex items-center gap-2`}
            >
              <MapPin className="text-blue-600 dark:text-blue-400 flex-shrink-0 w-5 h-5" />
              <span>Recent Transactions</span>
            </h2>
          </div>

          {/* Desktop Table View (1400px and up) */}
          <div className="hidden 2xl:block">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-36" />
                  <col className="w-36" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-20" />
                  <col className="w-20" />
                  <col className="w-40" />
                  <col className="w-20" />
                </colgroup>
                <thead className={`${theme.bg} border-b ${theme.border}`}>
                  <tr>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      From
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      To
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      Value (ETH)
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      Gas Price
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      Chain ID
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      Block #
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      Hash
                    </th>
                    <th
                      className={`px-3 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}
                    >
                      Nonce
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme.border}`}>
                  {txs.map((tx) => (
                    <tr
                      key={tx.hash}
                      className={`${theme.hover} transition-colors duration-150`}
                    >
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse flex-shrink-0"></div>
                          <Tooltip value={tx.from}>
                            <span className={`text-sm ${theme.text} truncate`}>
                              {formatValues(tx.from)}
                            </span>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center">
                          <ArrowRight
                            className={`${theme.textSecondary} mr-2 flex-shrink-0 w-4 h-4`}
                          />
                          <Tooltip value={tx.to}>
                            <span className={`text-sm ${theme.text} truncate`}>
                              {formatValues(tx.to)}
                            </span>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-sm font-medium ${theme.text} truncate block`}
                        >
                          {tx.value}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-sm ${theme.text} truncate block`}
                        >
                          {tx.gasPrice}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-sm ${theme.text} truncate block`}
                        >
                          {tx.chainId || "-"}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-sm ${theme.text} truncate block`}
                        >
                          {tx.blockNumber || "-"}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <Tooltip value={tx.hash}>
                          <span className={`text-sm ${theme.text} truncate`}>
                            {formatValues(tx.hash)}
                          </span>
                        </Tooltip>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-sm ${theme.text} truncate block`}
                        >
                          {tx.nonce}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {txs.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className={`px-3 py-12 text-center ${theme.textSecondary}`}
                      >
                        <div className="flex flex-col items-center">
                          <Activity className="mb-4 opacity-50 w-12 h-12" />
                          <p className="text-lg font-medium">
                            No pending transactions found
                          </p>
                          <p className="text-sm mt-2">
                            {isConnected
                              ? "Waiting for new transactions..."
                              : "Please check your connection"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tablet/Desktop Card View (lg to 2xl) */}
          <div className="hidden lg:block 2xl:hidden">
            <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
              {txs.length === 0 ? (
                <div className={`p-8 text-center ${theme.textSecondary}`}>
                  <Activity className="mx-auto mb-4 opacity-50 w-12 h-12" />
                  <p className="text-lg font-medium">
                    No pending transactions found
                  </p>
                  <p className="text-sm mt-2">
                    {isConnected
                      ? "Waiting for new transactions..."
                      : "Please check your connection"}
                  </p>
                </div>
              ) : (
                txs.map((tx, index) => (
                  <div
                    key={tx.hash}
                    className={`p-4 ${theme.hover} transition-colors duration-150`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse flex-shrink-0"></div>
                        <span className={`text-sm font-medium ${theme.text}`}>
                          Transaction #{index + 1}
                        </span>
                      </div>
                      <span className={`text-sm ${theme.textSecondary}`}>
                        Nonce: {tx.nonce}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium block mb-1`}
                          >
                            From:
                          </span>
                          <Tooltip value={tx.from}>
                            <span className={`text-sm ${theme.text} truncate`}>
                              {formatValues(tx.from)}
                            </span>
                          </Tooltip>
                        </div>
                        <div>
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium block mb-1`}
                          >
                            To:
                          </span>
                          <Tooltip value={tx.to}>
                            <span className={`text-sm ${theme.text} truncate`}>
                              {formatValues(tx.to)}
                            </span>
                          </Tooltip>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium`}
                          >
                            Value:
                          </span>
                          <span className={`text-xs font-medium ${theme.text}`}>
                            {tx.value} ETH
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium`}
                          >
                            Gas Price:
                          </span>
                          <span className={`text-xs ${theme.text}`}>
                            {tx.gasPrice}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium`}
                          >
                            Chain ID:
                          </span>
                          <span className={`text-xs ${theme.text}`}>
                            {tx.chainId || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium`}
                          >
                            Block #:
                          </span>
                          <span className={`text-xs ${theme.text}`}>
                            {tx.blockNumber || "-"}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`text-xs ${theme.textSecondary} font-medium block mb-1`}
                          >
                            Hash:
                          </span>
                          <Tooltip value={tx.hash}>
                            <span className={`text-sm ${theme.text} truncate`}>
                              {formatValues(tx.hash)}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:hidden">
            {txs.length === 0 ? (
              <div className={`p-6 text-center ${theme.textSecondary}`}>
                <Activity className="mx-auto mb-4 opacity-50 w-10 h-10" />
                <p className="text-base font-medium">
                  No pending transactions found
                </p>
                <p className="text-sm mt-2">
                  {isConnected
                    ? "Waiting for new transactions..."
                    : "Please check your connection"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {txs.map((tx, index) => (
                  <div
                    key={tx.hash}
                    className={`p-4 ${theme.hover} transition-colors duration-150`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center min-w-0 flex-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse flex-shrink-0"></div>
                        <span className={`text-sm font-medium ${theme.text}`}>
                          Transaction #{index + 1}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${theme.textSecondary} flex-shrink-0`}
                      >
                        Nonce: {tx.nonce}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div>
                            <span
                              className={`text-xs ${theme.textSecondary} font-medium block mb-1`}
                            >
                              From:
                            </span>
                            <Tooltip value={tx.from}>
                              <span
                                className={`text-sm ${theme.text} truncate`}
                              >
                                {formatValues(tx.from)}
                              </span>
                            </Tooltip>
                          </div>

                          <div>
                            <span
                              className={`text-xs ${theme.textSecondary} font-medium block mb-1`}
                            >
                              To:
                            </span>
                            <Tooltip value={tx.to}>
                              <span
                                className={`text-sm ${theme.text} truncate`}
                              >
                                {formatValues(tx.to)}
                              </span>
                            </Tooltip>
                          </div>

                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs ${theme.textSecondary} font-medium`}
                            >
                              Value:
                            </span>
                            <span
                              className={`text-xs font-medium ${theme.text}`}
                            >
                              {tx.value} ETH
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs ${theme.textSecondary} font-medium`}
                            >
                              Gas Price:
                            </span>
                            <span className={`text-xs ${theme.text}`}>
                              {tx.gasPrice}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs ${theme.textSecondary} font-medium`}
                            >
                              Chain ID:
                            </span>
                            <span className={`text-xs ${theme.text}`}>
                              {tx.chainId || "-"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs ${theme.textSecondary} font-medium`}
                            >
                              Block #:
                            </span>
                            <span className={`text-xs ${theme.text}`}>
                              {tx.blockNumber || "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span
                          className={`text-xs ${theme.textSecondary} font-medium block mb-1`}
                        >
                          Hash:
                        </span>
                        <Tooltip value={tx.hash}>
                          <span className={`text-sm ${theme.text} truncate`}>
                            {formatValues(tx.hash)}
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
