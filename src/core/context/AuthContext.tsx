import { useState, createContext, Dispatch, SetStateAction } from "react";
import { Account } from "../interfaces/types/Account";

export interface AuthContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  account: Account | null;
  setAccount: Dispatch<SetStateAction<Account | null>>;
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
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
