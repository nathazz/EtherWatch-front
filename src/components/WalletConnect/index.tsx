import { useAuth } from "../../contexts/useAuthContext";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

export const ConnectWalletButton = () => {
  const { address, login, logout, isLoading } = useAuth();
  const { theme } = useDarkMode();

  const handleConnect = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="p-1 flex gap-2">
      {address ? (
        <button
          onClick={handleLogout}
          className={`
            ${theme.bg}
            ${theme.text}
            ${theme.hover}
            border
            ${theme.border}
            px-4 py-2 sm:px-6 sm:py-3
            text-sm
            rounded-full
            cursor-pointer
            flex justify-center items-center
            transition-colors duration-200
          `}
        >
          Logout
        </button>
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
