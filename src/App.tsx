import fetch from "cross-fetch";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { useState } from "react";
import { HashRouter } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Header } from "./core/components/Header";
import { SideBarMenu } from "./core/components/SidebarMenu";
import Box from "@mui/material/Box";
import { ContentBox } from "./core/components/ContentBox";
import { AppRoutes } from "./routes";
import { isAuthenticatedRoute } from "./core/shared/isAuthenticatedRoute";
import "./styles/main.scss";
import { AuthProvider } from "./core/context/AuthContext";

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_AEDES_API_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [open, setOpen] = useState(true);
  const isDashboardPage = isAuthenticatedRoute(pathname);
  const isLoading = false; // get this from context in future
  const mainBoxStyles = isDashboardPage
    ? {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      width: "100%",
    }
    : { width: "100%" };

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <HashRouter>
          {isLoading && <LinearProgress />}
          {isDashboardPage && <Header open={open} setOpen={setOpen} />}
          <Box sx={mainBoxStyles}>
            {isDashboardPage && <SideBarMenu open={open} setOpen={setOpen} />}
            {(isDashboardPage && (
              <ContentBox>
                <AppRoutes setPathname={setPathname} />
              </ContentBox>
            )) || <AppRoutes setPathname={setPathname} />}
          </Box>
        </HashRouter>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
