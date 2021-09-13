import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URI || `http://localhost:4000/`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function AppProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
