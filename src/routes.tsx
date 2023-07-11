import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
// import { DenguePage } from "./pages/Dengue";
import { InfoPage } from "./pages/Info";
import { useContext, useEffect } from "react";
import { ComplaintPage } from "./pages/Complaint";
import { LocalStorageManager } from "./core/shared/LocalStorageManager";
import { isAuthenticatedRoute } from "./core/shared/isAuthenticatedRoute";
import { AuthContext, AuthContextValue } from "./core/context/AuthContext";
import { Account } from "./core/interfaces/types/Account";

interface RoutesProps {
  setPathname: React.Dispatch<React.SetStateAction<string>>;
}

export function AppRoutes({ setPathname }: RoutesProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated, setAccount } =
    useContext(AuthContext) || ({} as AuthContextValue);
  const token = LocalStorageManager.getItem<string>("aedes-token");
  const account = LocalStorageManager.getItem<Account>("aedes-account", true);
  const hasAuthCredentials = !!token && !!account;

  useEffect(() => {
    const onAuthenticatedRoute = isAuthenticatedRoute(location.pathname);
    setPathname(location.pathname);
    setIsAuthenticated(hasAuthCredentials);
    setAccount(account);

    if (!onAuthenticatedRoute && hasAuthCredentials) {
      return navigate("/denuncias");
    }

    if (onAuthenticatedRoute && !hasAuthCredentials) {
      LocalStorageManager.removeItem(!token ? "aedes-account" : "aedes-token");
      return navigate("/entrar");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/entrar" element={<SignInPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/denuncias" element={<ComplaintPage />} />
          {/* <Route path="/mapa-dengue" element={<DenguePage />} /> */}
          <Route path="/informacoes" element={<InfoPage />} />
        </>
      ) : (
        <Route path="/entrar" element={<SignInPage />} />
      )}
      <Route path="*" element={<Navigate to="/entrar" />} />
    </Routes>
  );
}
