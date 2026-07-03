import theme from "../../theme";
import Text from "../common/Text";
import { Link } from "react-router-native";
import { StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  tab: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexShrink: 1,
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
