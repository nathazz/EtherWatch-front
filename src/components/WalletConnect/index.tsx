import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/useAuthContext";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";
import { LogOut } from "lucide-react";

export const ConnectWalletButton = () => {
  const { address, login, logout, isLoading, balance } = useAuth();
  const { theme } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleConnect = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
    setIsModalOpen(false);
  };

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <div className="p-1 flex flex-col items-end sm:items-start gap-2 relative">
      {address ? (
        <>
          <button
            onClick={() => setIsModalOpen((prev) => !prev)}
            className={`
              ${theme.bg}
              ${theme.text}
              ${theme.hover}
              border
              ${theme.border}
              px-4 py-2 sm:px-6 sm:py-3
              text-sm
              gap-3
              rounded-full
              cursor-pointer
              flex justify-center items-center
              transition-colors duration-200
            `}
          >
            <img
              src="/assets/metamask_icon.svg"
              alt="MetaMask"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />

            {shortAddress}
          </button>

          {isModalOpen && (
            <div
              className={`
                absolute z-20
                ${theme.bg} ${theme.text} border ${theme.border}
                p-4 rounded-xl shadow-lg text-sm w-64
                left-1/2 -translate-x-1/2
                ${isMobile ? "top-full mt-2" : "bottom-full mb-2"}
              `}
            >
              <p className="truncate font-medium">{address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Balance: {balance ?? "-"} ETH
              </p>
              <button
                onClick={handleLogout}
                className={`
                  mt-3 w-full px-4 py-2 rounded-lg border
                  flex items-center justify-center gap-2
                  cursor-pointer text-center
                  ${theme.hover} ${theme.text} ${theme.border}
                  transition-colors duration-200
                `}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className={`
            cursor-pointer
            ${theme.bg}
            ${theme.text}
            ${theme.hover}
            border
            ${theme.border}
            px-4 py-2 sm:px-10 sm:py-3
            text-sm
            rounded-full
            flex items-center gap-2
            transition-colors duration-200
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <img
            src="/assets/metamask_icon.svg"
            alt="MetaMask"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          {isLoading ? "Loading..." : "MetaMask"}
        </button>
      )}
    </div>
  );
};
