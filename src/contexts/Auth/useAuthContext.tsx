import type { TransactionResponse } from "ethers";
import { createContext, useContext } from "react";

interface AuthContextProps {
  address: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  sendTransaction: (
    to: string,
    value: string,
  ) => Promise<TransactionResponse | undefined>;
  balance: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  address: null,
  login: async () => {},
  logout: async () => {},
  sendTransaction: async () => {
    throw new Error("sendTransaction not implemented");
  },
  isLoading: true,
  balance: null,
});

export const useAuth = () => useContext(AuthContext);
