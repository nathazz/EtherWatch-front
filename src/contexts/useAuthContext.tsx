import { createContext, useContext } from "react";

interface AuthContextProps {
  address: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  balance: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  address: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  balance: null,
});

export const useAuth = () => useContext(AuthContext);
