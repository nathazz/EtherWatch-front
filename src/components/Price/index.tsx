import { Loader2 } from "lucide-react";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";
import { useQueryPrice } from "../../services/queries/ethPrice";
import { currencySymbols, type CurrencyKey } from "../../utils/constants";

export const Price = () => {
  const { theme } = useDarkMode();
  const { data: balance, isLoading } = useQueryPrice();
  const loading = isLoading || !balance;

  return (
    <div className="mb-8">
      <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Price</h2>
      <div
        className={`${theme.cardBg} rounded-xl p-8 ${theme.shadow} border ${theme.border} w-full`}
      >
        <div className="mb-6">
          <div className={`${theme.textSecondary} text-lg font-mono`}>
            Actually Price
          </div>
        </div>

        <div className="flex flex-wrap justify-start items-end gap-x-8 gap-y-4">
          {(["usd", "brl", "eur"] as CurrencyKey[]).map((key) => (
            <div
              key={key}
              className={`flex items-center justify-between text-5xl font-bold ${theme.text}`}
            >
              <div className="flex items-baseline gap-2">
                {loading ? (
                  <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                ) : (
                  <>
                    <span>{balance?.price?.[key]}</span>
                    <span className="text-2xl font-normal text-right text-gray-400">
                      {currencySymbols[key]}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
