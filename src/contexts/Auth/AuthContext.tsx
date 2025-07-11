import { useCallback, useEffect, useState } from "react";
import { getMetaMaskProvider } from "../../services/MetaMask/metaMaskService";
import { logoutMetaMask } from "../../services/requests/loginMetaMask/login";
import { checkAuth } from "../../services/requests/checkAuth/checkAuth";
import { ethers } from "ethers";
import { AuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExtraData = async (provider: ethers.Provider, address: string) => {
    const rawBalance = await provider.getBalance(address);
    setBalance(ethers.formatEther(rawBalance));
  };

  const login = useCallback(async () => {
    try {
      const { address, provider } = await getMetaMaskProvider();
      setAddress(address);
      await fetchExtraData(provider, address);
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Login failed. Please try again.";

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      console.error("Login failed", err instanceof Error ? err.message : err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutMetaMask();
      setAddress(null);
      setBalance(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Logout failed. Please try again.";

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      console.error("Logout failed", err instanceof Error ? err.message : err);
    }
  }, []);

  const checkLogin = useCallback(async () => {
    try {
      const res = await checkAuth();
      setAddress(res.address);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await fetchExtraData(provider, res.address);
    } catch {
      setAddress(null);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const sendTransaction = useCallback(async (to: string, value: string) => {
    try {
      const { provider } = await getMetaMaskProvider();
      const signer = await provider.getSigner();
      const validAddress = ethers.getAddress(to);

      const tx = await signer.sendTransaction({
        to: validAddress,
        value: ethers.parseEther(value),
      });

      return tx;
    } catch (err) {
      console.error("Send Transaction failed", err);
      throw err;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ address, balance, login, logout, isLoading, sendTransaction }}
    >
      {children}
    </AuthContext.Provider>
  );
};
