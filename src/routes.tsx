import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { DenguePage } from "./pages/Dengue";
import { InfoPage } from "./pages/Info";
import { useEffect, useState } from "react";
import { ComplaintPage } from "./pages/Complaint";
import { LocalStorageManager } from "./core/shared/LocalStorageManager";
import { isAuthenticatedRoute } from "./core/shared/isAuthenticatedRoute";

interface RoutesProps {
  setPathname: React.Dispatch<React.SetStateAction<string>>;
}

export function AppRoutes({ setPathname }: RoutesProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const onAuthenticatedRoute = isAuthenticatedRoute(location.pathname);
    setPathname(location.pathname);

    if (!onAuthenticatedRoute) {
      const token = LocalStorageManager.getItem("aedes-token");
      const account = LocalStorageManager.getItem("aedes-account", true);
      const hasAuthCredentials = !!token && !!account;
      setIsAuthenticated(hasAuthCredentials);

      if (hasAuthCredentials && !onAuthenticatedRoute) {
        navigate('/denuncias');
      }
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/entrar" element={<SignInPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/denuncias" element={<ComplaintPage />} />
          <Route path="/mapa-dengue" element={<DenguePage />} />
          <Route path="/informacoes" element={<InfoPage />} />
        </>
      ) : (
        <Route path="/entrar" element={<SignInPage />} />
      )}
      <Route path="*" element={<Navigate to="/entrar" />} />
    </Routes>
  );
}
