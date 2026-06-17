import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";
import Text from "../Text";
import { View, StyleSheet, Image, Pressable } from "react-native";
import theme from "../../theme";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

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
});

const RepositoryViewItem = () => {
  const { id } = useParams();
  const { repository, error, loading } = useRepository(id);

  if (error) {
    return <Text>Error</Text>;
  }

  if (loading) {
    return <Text>Loading</Text>;
  }

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

export default RepositoryViewItem;
