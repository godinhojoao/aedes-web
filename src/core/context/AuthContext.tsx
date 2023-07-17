import { useState, createContext, Dispatch, SetStateAction } from "react";
import { Account } from "../interfaces/types/Account";
import { LocalStorageManager } from "../shared/LocalStorageManager";

export interface AuthContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  account: Account | null;
  setAccount: Dispatch<SetStateAction<Account | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: any): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);
  const authContextValue: AuthContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    account,
    setAccount,
    logout: () => {
      LocalStorageManager.removeItem('aedes-account');
      LocalStorageManager.removeItem('aedes-token');
      setIsAuthenticated(false);
      setAccount(null);
    }
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
