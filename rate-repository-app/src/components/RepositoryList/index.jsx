import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  // useWindowDimensions,
} from "react-native";
import Text from "../common/Text";
import theme from "../../theme";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";
// import { Menu, Icon, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import SearchInput from "./SearchInput";
import SortMenu from "./SortMenu";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortKey,
  setSortKey,
  keyword,
  setKeyword,
}) => {
  const repositoryNodes = repositories?.edges?.map((e) => e.node) ?? [];
  const navigate = useNavigate();

  return (
    <View style={{ flex: 1 }}>
      {/* this could break scrolling? */}
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <SortMenu
        sortKey={sortKey}
        setSortKey={setSortKey}
        options={SORT_OPTIONS}
      />
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
    </View>
  );
};

const SORT_OPTIONS = {
  latest: {
    label: "Latest repositories",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highestRated: {
    label: "Highest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowestRated: {
    label: "Lowest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const sortOption = SORT_OPTIONS[sortKey];

  const [debouncedKeyword] = useDebounce(keyword, 2000);

  const { loading, error, repositories } = useRepositories({
    orderBy: sortOption.orderBy,
    orderDirection: sortOption.orderDirection,
    searchKeyword: debouncedKeyword,
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortKey={sortKey}
      setSortKey={setSortKey}
      keyword={keyword}
      setKeyword={setKeyword}
    />
  );
};

export default RepositoryList;
