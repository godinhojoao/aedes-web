// import fetch from 'cross-fetch';
// import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import "./styles/main.scss";
import { LinearProgress } from "@mui/material";

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: import.meta.env.VITE_AEDES_API_URL, // not working yet to testing library
//     fetch
//   }),
//   cache: new InMemoryCache(),
// });

function App(): JSX.Element {
  const isLoading = false; // get this from context in future
  return (
  // <ApolloProvider client={client}>
    <HashRouter>
      {isLoading && <LinearProgress /> }
      <AppRoutes />
    </HashRouter>
  // {/* </ApolloProvider> */}
  );
}

export default App;
