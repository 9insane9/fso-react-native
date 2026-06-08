import { FlatList, View, StyleSheet, Text } from "react-native";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { loading, error, repositories } = useRepositories();

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <FlatList
      style={styles.container}
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} />}
    />
  );
};

export default RepositoryList;
