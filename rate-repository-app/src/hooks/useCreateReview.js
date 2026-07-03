import { useMutation, useApolloClient } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    console.log(typeof rating, rating);
    const response = await mutate({
      variables: {
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      },
    });

    apolloClient.resetStore();
    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
