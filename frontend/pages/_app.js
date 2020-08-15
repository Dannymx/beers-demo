import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import "../css/tailwind.css";

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps}></Component>
    </ApolloProvider>
  );
};

export default App;
