import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink: HttpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
});

// set error link to fetch network and graphql errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// setup appollo client
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  // uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export default client;
