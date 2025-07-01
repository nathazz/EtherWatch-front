import { useCallback, useEffect, useState } from "react";
import { getMetaMaskProvider } from "../services/MetaMask/metaMaskService";
import { logoutMetaMask } from "../services/requests/loginMetaMask/login";
import { checkAuth } from "../services/requests/checkAuth/checkAuth";
import { AuthContext } from "./useAuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async () => {
    try {
      const { address } = await getMetaMaskProvider();
      setAddress(address);
    } catch (err) {
      console.error("Login failed", err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutMetaMask();
      setAddress(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  }, []);

  const checkLogin = useCallback(async () => {
    try {
      const res = await checkAuth();
      setAddress(res.address);
    } catch {
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <AuthContext.Provider value={{ address, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
