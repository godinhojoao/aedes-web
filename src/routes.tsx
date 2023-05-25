import { useRoutes } from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";

function AppRoutes(): JSX.Element {
  const routes = useRoutes([
    { path: "/", element: <SignInPage /> },
    { path: "/cadastro", element: <SignUpPage /> },
  ]);
  return <>{routes}</>;
}

export { AppRoutes };
