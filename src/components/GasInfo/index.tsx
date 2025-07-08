import { useEffect, useState } from "react";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";
import { LoaderCircle } from "lucide-react";
import { useQueryGasFee } from "../../services/queries/ethGasFee";
import { getGasLevel } from "../../utils/gaslevel";

type FeeDataResponse = {
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

export const GasInfo = () => {
  const { theme } = useDarkMode();
  const { data: feeData, refetch, isFetching } = useQueryGasFee();

  const [secondsLeft, setSecondsLeft] = useState(30);
  const gasLevel = getGasLevel(feeData?.gasPrice);

  useEffect(() => {
    const tick = async () => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          refetch().then(() => {
            setSecondsLeft(30);
          });
          return 0;
        }
        return prev - 1;
      });
    };

    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [refetch]);

  const cards = [
    { label: "Base Fee", key: "gasPrice" },
    { label: "Priority Fee", key: "maxPriorityFeePerGas" },
    { label: "Max Fee", key: "maxFeePerGas" },
  ] as const;

  return (
    <div className="mb-8">
      <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
        Gas Info
        <span className="text-sm ml-4 text-gray-500">
          (Next update in {secondsLeft}s)
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item, index) => {
          const value = feeData?.[item.key as keyof FeeDataResponse] ?? null;

          return (
            <div
              key={index}
              className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} transition-all duration-200 hover:scale-105`}
            >
              <div className="flex flex-col items-start w-full">
                <div
                  className={`${theme.textSecondary} text-sm font-medium mb-2`}
                >
                  {item.label}
                </div>

                <div
                  className={`text-2xl font-bold ${theme.text} flex flex-wrap items-center gap-2 w-full`}
                >
                  {value && !isFetching ? (
                    <>
                      <span className="break-all min-w-0">{value}</span>
                      <span
                        className={`text-lg ${theme.textSecondary} whitespace-nowrap`}
                      >
                        Gwei
                      </span>
                    </>
                  ) : (
                    <LoaderCircle className="animate-spin w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} flex flex-col items-center text-center transition-all duration-200 hover:scale-105`}
        >
          <div className={`${theme.textSecondary} text-sm font-medium mb-2`}>
            Gas Level
          </div>

          <div className="text-2xl font-bold w-full flex justify-center">
            {feeData ? (
              <span
                className={`text-white px-6 py-2 rounded-lg font-semibold shadow-md ${gasLevel.color}`}
              >
                {gasLevel.label}
              </span>
            ) : (
              <LoaderCircle className="animate-spin w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
