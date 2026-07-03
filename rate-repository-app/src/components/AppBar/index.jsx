import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import useAuthStorage from "../../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client/react";
import theme from "../../theme";
import { ME } from "../../graphql/queries";
import Tab from "./Tab";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

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
          <>
            <Tab
              text="Create a review"
              link="/review"
            />
            <Tab
              text="My reviews"
              link="/myreviews"
            />
            <Tab
              text="Sign out"
              onPress={handleSignOut}
            />
          </>
        ) : (
          <>
            <Tab
              text="Sign in"
              link="/signin"
            />
            <Tab
              text="Sign up"
              link="/signup"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
