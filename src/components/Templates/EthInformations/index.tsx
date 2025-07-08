import { useState } from "react";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import { useQueryEthInfos } from "../../../services/queries/ethInfos";
import {
  Github,
  Twitter,
  Globe,
  Cpu,
  Landmark,
  Coins,
  ArrowDownUp,
  Tags,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { popularCurrencies } from "../../../utils/constants";

export const EthInformations = () => {
  const { theme } = useDarkMode();
  const { data: ethInfo, isLoading } = useQueryEthInfos();
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (isLoading || !ethInfo)
    return (
      <p className={`text-center mt-10 ${theme.text}`}>
        Loading Ethereum info...
      </p>
    );

  const description = ethInfo.description.en;
  const shortDescription = description.slice(0, 300);
  const isTruncated = description.length > 300;

  const priceChartData = Object.entries(ethInfo.market_data.current_price)
    .filter(([currency]) => popularCurrencies.includes(currency))
    .map(([currency, value]) => ({
      currency: currency.toUpperCase(),
      value,
    }));

  const axisStrokeColor = theme.textSecondary.includes("400") ? "#ccc" : "#444";

  return (
    <div
      className={`min-h-screen px-2 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-10 flex justify-center items-start bg-transparent ${theme.bg} ${theme.text}`}
    >
      <div
        className={`w-full max-w-5xl bg-transparent rounded-xl sm:rounded-2xl border ${theme.cardBg} ${theme.border} ${theme.shadow} p-3 sm:p-4 md:p-6`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 text-center sm:text-left">
          <img
            src={ethInfo.image.large}
            alt="Ethereum Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0"
          />
          <div className="min-w-0 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 break-words">
              {ethInfo.name} ({ethInfo.symbol.toUpperCase()})
            </h1>
            <p className={`text-sm sm:text-base ${theme.textSecondary}`}>
              Rank #{ethInfo.market_cap_rank}
            </p>
          </div>
        </div>

        <div
          className={`mb-6 leading-relaxed text-sm sm:text-base ${theme.textSecondary}`}
        >
          <p className="break-words">
            {showFullDesc || !isTruncated
              ? description
              : shortDescription + "..."}
          </p>
          {isTruncated && (
            <button
              onClick={() => setShowFullDesc((prev) => !prev)}
              className="mt-2 cursor-pointer text-blue-500 underline hover:text-blue-400 transition text-sm"
            >
              {showFullDesc ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tags className="w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="text-lg sm:text-xl font-semibold">Categories</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {ethInfo.categories.slice(0, 8).map((category, index) => (
              <span
                key={index}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border ${theme.border} ${theme.textSecondary} ${theme.hover} break-words`}
                style={{ maxWidth: "calc(50% - 4px)" }}
              >
                {category}
              </span>
            ))}
            {ethInfo.categories.length > 8 && (
              <span
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border ${theme.border} ${theme.textSecondary}`}
              >
                +{ethInfo.categories.length - 8} more
              </span>
            )}
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">
            Price Chart (Top Currencies)
          </h2>
          <div className="w-full">
            <div className="h-48 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceChartData}
                  margin={{
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 40,
                  }}
                >
                  <XAxis
                    dataKey="currency"
                    stroke={axisStrokeColor}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{
                      fill: axisStrokeColor,
                      fontSize: window.innerWidth < 640 ? 10 : 11,
                      style: { whiteSpace: "nowrap" },
                    }}
                    axisLine={{ stroke: axisStrokeColor }}
                    tickLine={{ stroke: axisStrokeColor }}
                  />
                  <YAxis
                    stroke={axisStrokeColor}
                    tick={{
                      fill: axisStrokeColor,
                      fontSize: window.innerWidth < 640 ? 10 : 12,
                    }}
                    axisLine={{ stroke: axisStrokeColor }}
                    tickLine={{ stroke: axisStrokeColor }}
                    width={40}
                  />
                  <Tooltip
                    wrapperClassName="text-xs sm:text-sm"
                    cursor={{ fill: "#ccc" }}
                    formatter={(value) => [
                      `$${Number(value).toLocaleString()}`,
                      "Price",
                    ]}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
              <span className="text-sm sm:text-base break-words">
                Hashing Algorithm: <strong>{ethInfo.hashing_algorithm}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
              <span className="text-sm sm:text-base break-words">
                Genesis Date: <strong>{ethInfo.genesis_date}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
              <span className="text-sm sm:text-base break-words">
                Current Price (USD):{" "}
                <strong>
                  ${ethInfo.market_data.current_price.usd.toLocaleString()}
                </strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowDownUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
              <span className="text-sm sm:text-base break-words">
                24h Change:{" "}
                <strong
                  className={
                    ethInfo.market_data.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {ethInfo.market_data.price_change_percentage_24h.toFixed(2)}%
                </strong>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {ethInfo.links.homepage[0] && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
                <a
                  href={ethInfo.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-75 break-all text-sm sm:text-base"
                >
                  Official Website
                </a>
              </div>
            )}
            {ethInfo.links.twitter_screen_name && (
              <div className="flex items-start gap-2">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
                <a
                  href={`https://twitter.com/${ethInfo.links.twitter_screen_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-75 break-all text-sm sm:text-base"
                >
                  @{ethInfo.links.twitter_screen_name}
                </a>
              </div>
            )}
            {ethInfo.links.repos_url.github[0] && (
              <div className="flex items-start gap-2">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
                <a
                  href={ethInfo.links.repos_url.github[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-75 break-all text-sm sm:text-base"
                >
                  GitHub Repository
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
