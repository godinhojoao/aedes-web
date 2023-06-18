import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { DenguePage } from "./pages/Dengue";
import { InfoPage } from "./pages/Info";
import { useEffect } from "react";
import { ComplaintPage } from "./pages/Complaint";

interface RoutesProps {
  setPathname: React.Dispatch<React.SetStateAction<string>>;
}


function AppRoutes({ setPathname }: RoutesProps): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      <Route path="/denuncias" element={<ComplaintPage />} />
      <Route path="/mapa-dengue" element={<DenguePage />} />
      <Route path="/informacoes" element={<InfoPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export { AppRoutes };
