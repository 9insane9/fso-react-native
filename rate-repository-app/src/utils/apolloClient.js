import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const serverURI = process.env.EXPO_PUBLIC_APOLLO_URI;

const httpLink = new HttpLink({
  uri: serverURI,
});

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async ({ headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
