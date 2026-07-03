import { Searchbar } from "react-native-paper";
import React from "react";

function SearchInputBase({ keyword, setKeyword }) {
  //   console.log("SearchInput render");
  return (
    <Searchbar
      value={keyword}
      onChangeText={setKeyword}
      style={{ margin: 15 }}
    />
  );
}

const SearchInput = React.memo(SearchInputBase);
SearchInput.displayName = "SearchInput";

export default SearchInput;
