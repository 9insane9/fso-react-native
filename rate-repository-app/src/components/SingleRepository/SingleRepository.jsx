import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";
import Text from "../Text";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import theme from "../../theme";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { parseISO, format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  button: {
    height: 55,
    borderRadius: 10,
    fontSize: theme.fontSizes.heading,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.primary,
  },
  buttonText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
    color: theme.colors.repositoryItemBackground,
  },
  // separator: {
  //   height: 10,
  // },
  reviewContainer: {
    marginTop: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
    flexShrink: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: theme.colors.primary,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingNumber: {},
  reviewHeaderContainer: {
    flexShrink: 1,
    height: 50,
  },
  reviewText: {
    flexShrink: 1,
  },
  reviewRightPanel: {
    flexShrink: 1,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(parseISO(review.createdAt), "d MMM yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text
          fontSize="heading"
          fontWeight="bold"
          color="primary"
          style={[styles.ratingNumber]}
        >
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewRightPanel}>
        <View style={styles.reviewHeaderContainer}>
          <Text
            fontSize="heading"
            fontWeight="bold"
            color="secondary"
          >
            {review.user.username}
          </Text>
          <Text
            fontSize="subheading"
            color="secondary"
          >
            {formattedDate}
          </Text>
        </View>

        <Text
          fontSize="subheading"
          color="secondary"
          style={styles.reviewText}
        >
          {review.text}
        </Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryViewItem = ({ ...repository }) => {
  return (
    <View>
      <RepositoryItem {...repository} />
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, error, loading } = useRepository(id);

  const reviewNodes = repository?.reviews?.edges?.map((e) => e.node) ?? [];

  if (error) {
    return <Text>Error</Text>;
  }

  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryViewItem {...repository} />}
    />
  );
};

export default SingleRepository;
