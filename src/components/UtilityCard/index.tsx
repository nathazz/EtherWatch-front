import { Copy, CopyCheck, Loader, X } from "lucide-react";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";
import type { UtilityCardProps } from "../../interface/interfaces";
import { useEffect, useState } from "react";

export const UtilityCard = ({
  icon,
  title,
  placeholder,
  value,
  onChange,
  buttonLabel,
  ringColor,
  bgColor,
  buttonColor,
  onButtonClick,
  isLoading,
  result,
  hasQueried,
  copyText,
  onClearResult,
  showResult,
  error,
}: UtilityCardProps & {
  onClearResult: () => void;
  showResult: boolean;
}) => {
  const { theme } = useDarkMode();

  const isButtonDisabled = isLoading || value.trim() === "";

  const [copy, setCopy] = useState<boolean>(false);

  const handleCopy = () => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      setCopy(true);
    }
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  return (
    <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>
        <h2 className={`text-2xl font-semibold ${theme.text}`}>{title}</h2>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-slate-600/50 rounded-xl px-4 py-4 ${theme.text} focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all duration-300 text-base`}
      />
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      
      <button
        disabled={isButtonDisabled}
        onClick={onButtonClick}
        className={`mt-6 w-full bg-gradient-to-r cursor-pointer ${
          isButtonDisabled
            ? "from-gray-600 to-gray-700 cursor-not-allowed opacity-60"
            : buttonColor + " hover:brightness-110"
        } text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex justify-center items-center gap-2`}
      >
        {isLoading ? <Loader className="animate-spin w-5 h-5" /> : buttonLabel}
      </button>

      <div
        className={`mt-4 text-sm font-mono whitespace-pre-wrap ${theme.text}`}
      >
        {isLoading && "Loading..."}

        {!isLoading && !result && hasQueried && (
          <p className="text-gray-400">No data found.</p>
        )}

        {!isLoading && result && showResult && (
          <div className="relative">
            <div className="p-4 rounded-md border border-white/10 bg-black/10 mt-4">
              {result}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCopy}
                className={`flex items-center cursor-pointer gap-1 ${theme.hover} ${theme.active} ${theme.text} ${theme.border} px-3 py-1 rounded-md transition`}
              >
                {copy ? (
                  <CopyCheck className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copy ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={onClearResult}
                className={`flex items-center cursor-pointer gap-1 ${theme.hover} ${theme.active} ${theme.text} ${theme.border} px-3 py-1 rounded-md transition`}
              >
                <X className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
