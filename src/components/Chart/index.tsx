import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useQueryMarketData } from "../../services/queries/ethMarket";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

const getColor = (val: number) => (val >= 0 ? "#22c55e" : "#ef4444");

export function ChangeChartCard() {
  const { theme } = useDarkMode();
  const { data: marketData, isLoading } = useQueryMarketData();

  const changeData = marketData
    ? (["usd", "brl", "eur"] as const).map((currency) => ({
        name: currency.toUpperCase(),
        value: marketData.market_data.change_24h_percent[currency],
      }))
    : [];

  const marketCaps = marketData?.market_data.market_cap;
  const volumes = marketData?.market_data.volume_24h;

  return (
    <>
      <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Market Cap</h2>
      <div
        className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border}`}
      >
        <div className={`${theme.textSecondary} text-sm font-medium mb-4`}>
          Market Change (24h)
        </div>

        {isLoading ? (
          <div className="text-center text-lg text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={changeData}>
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis
                    tickFormatter={(v) => `${v.toFixed(1)}%`}
                    stroke="#888"
                    domain={["auto", "auto"]}
                  />
                  <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {changeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getColor(entry.value)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {(["usd", "brl", "eur"] as const).map((currency) => (
                <div
                  key={currency}
                  className={`p-4 rounded-xl ${theme.cardBg} border ${theme.border}`}
                >
                  <h4 className={`text-lg font-semibold mb-2 ${theme.text}`}>
                    {currency.toUpperCase()}
                  </h4>
                  <p className={`text-sm ${theme.textSecondary}`}>
                    Market Cap:
                  </p>
                  <p className={`text-base font-medium ${theme.text}`}>
                    {marketCaps?.[currency].toLocaleString(undefined, {
                      style: "currency",
                      currency: currency.toUpperCase(),
                    }) ?? "-"}
                  </p>

                  <p className={`text-sm mt-2 ${theme.textSecondary}`}>
                    Volume (24h):
                  </p>
                  <p className={`text-base font-medium ${theme.text}`}>
                    {volumes?.[currency].toLocaleString(undefined, {
                      style: "currency",
                      currency: currency.toUpperCase(),
                    }) ?? "-"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
