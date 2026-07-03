import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";
import Text from "../common/Text";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import theme from "../../theme";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import ReviewItem from "./ReviewItem";

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
});

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
