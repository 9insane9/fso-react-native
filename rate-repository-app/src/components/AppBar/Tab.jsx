import theme from "../../theme";
import Text from "../Text";
import { Link } from "react-router-native";
import { StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  tab: {
    padding: 20,
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

export default Tab;
