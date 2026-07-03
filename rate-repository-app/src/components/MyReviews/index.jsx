import { FlatList } from "react-native";
import ReviewItem from "../SingleRepository/ReviewItem";
import { useQuery } from "@apollo/client/react";
import { ME } from "../../graphql/queries";
import Text from "../common/Text";

const MyReviews = () => {
  const { data, error, loading } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (error) {
    return <Text>Error</Text>;
  }

  if (loading) {
    return <Text>Loading</Text>;
  }

  const reviewNodes = data.me.reviews.edges.map((e) => e.node) ?? [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          userListVariant
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
