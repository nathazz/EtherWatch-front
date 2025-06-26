import { Eye, MapPin } from "lucide-react";
import React from "react";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import { ChangeChartCard } from "../../Chart";
import UtilsTemplate from "../../Templates/Utilities";
import { Price } from "../../Price";

interface IProps {
  activeSection: string;
}

export const OptionsNavigation: React.FC<IProps> = ({ activeSection }) => {
  const { theme } = useDarkMode();

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

      case "utils":
        return <UtilsTemplate />;
      default:
        return (
          <div className="p-6 lg:p-8 max-w-screen-lg mx-auto">
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>
                Gas Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Base Fee", value: "45,23", unit: "Gwei" },
                  { label: "Priority Fee", value: "1,50", unit: "Gwei" },
                  { label: "Max Fee", value: "55,00", unit: "Gwei" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} transition-all duration-200 hover:scale-105`}
                  >
                    <div
                      className={`${theme.textSecondary} text-sm font-medium mb-2`}
                    >
                      {item.label}
                    </div>
                    <div className={`text-2xl font-bold ${theme.text}`}>
                      {item.value}{" "}
                      <span className={`text-lg ${theme.textSecondary}`}>
                        {item.unit}
                      </span>
                    </div>
                  </div>
                ))}

                <div
                  className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} border ${theme.border} flex items-center justify-center transition-all duration-200 hover:scale-105`}
                >
                  <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md">
                    Low
                  </span>
                </div>
              </div>
            </div>

            <Price />
            <ChangeChartCard />
          </div>
        );
    }
  };

  return <div className="flex-1 md:ml-72">{renderContent()}</div>;
};
