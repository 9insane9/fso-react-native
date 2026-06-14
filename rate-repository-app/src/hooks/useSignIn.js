import { useMutation, useApolloClient } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username,
        password,
      },
    });

    const token = response?.data?.authenticate?.accessToken;

    if (token) {
      await authStorage.setAccessToken(token);
    }
    apolloClient.resetStore();
    return response;
  };

  return [signIn, result];
};

export default useSignIn;
