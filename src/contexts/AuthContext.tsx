import { useCallback, useEffect, useState } from "react";
import { getMetaMaskProvider } from "../services/MetaMask/metaMaskService";
import { logoutMetaMask } from "../services/requests/loginMetaMask/login";
import { checkAuth } from "../services/requests/checkAuth/checkAuth";
import { AuthContext } from "./useAuthContext";
import { ethers } from "ethers";

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
    } catch (err) {
      console.error("Login failed", err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutMetaMask();
      setAddress(null);
      setBalance(null);
    } catch (err) {
      console.error("Logout failed", err);
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

  return (
    <AuthContext.Provider
      value={{ address, balance, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
