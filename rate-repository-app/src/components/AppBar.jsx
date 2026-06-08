import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client/react";
import theme from "../theme";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
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

const Tab = ({ text, link, onPress }) => {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={styles.tab}
      >
        <Text
          style={styles.text}
          fontWeight="bold"
          fontSize="heading"
        >
          {text}
        </Text>
      </Pressable>
    );
  }

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
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const isLoggedIn = !!data?.me;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab
          text="Repositories"
          link="/"
        />

        {isLoggedIn ? (
          <Tab
            text="Sign out"
            onPress={handleSignOut}
          />
        ) : (
          <Tab
            text="Sign in"
            link="/signin"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
