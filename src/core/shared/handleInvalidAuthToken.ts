import { Account } from "../interfaces/types/Account";
import { LocalStorageManager } from "./LocalStorageManager";

interface HandleInvalidAuthTokenInput {
  error: { message: string; }
  setIsAuthenticated: (value: React.SetStateAction<boolean>) => void
  setAccount: (value: React.SetStateAction<Account | null>) => void
}

export function handleInvalidAuthToken({ setIsAuthenticated, setAccount, error }: HandleInvalidAuthTokenInput): void {
  if (error.message === "Invalid token") {
    LocalStorageManager.removeItem("aedes-token");
    LocalStorageManager.removeItem("aedes-account");
    setIsAuthenticated(false);
    setAccount(null);
  }
}