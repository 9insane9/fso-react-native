import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
// import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    // height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tab: {
    padding: 20,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "red",
  },
  text: {
    color: theme.colors.appBarText,
  },
});

const Tab = ({ text, link }) => {
  return (
    <Link
      to={link}
      style={styles.tab}
    >
      <Text
        style={styles.text}
        fontWeight="bold"
        fontSize="heading"
      >
        {text}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab
          text="Repositories"
          link="/"
        />
        <Tab
          text="Sign in"
          link="/signin"
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
