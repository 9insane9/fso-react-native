import { StyleSheet, Pressable } from "react-native";
import Text from "../common/Text";
import theme from "../../theme";
import { formControl } from "./formStyle";

const styles = StyleSheet.create({
  control: formControl,
  button: {
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
  redButton: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  },
});

const Button = ({ onPress, buttonText, style, redVariant = false }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.control,
        styles.button,
        redVariant && styles.redButton,
        style,
      ]}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default Button;
