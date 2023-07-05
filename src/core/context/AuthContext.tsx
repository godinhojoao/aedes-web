import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface AuthContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: any): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const authContextValue: AuthContextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
