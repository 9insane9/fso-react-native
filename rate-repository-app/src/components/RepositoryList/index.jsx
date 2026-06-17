import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import theme from "../../theme";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories?.edges?.map((e) => e.node) ?? [];
  const navigate = useNavigate();

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { loading, error, repositories } = useRepositories();

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
