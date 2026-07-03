import Text from "./Text";
import { formControl } from "./formStyle";
import theme from "../../theme";
import { StyleSheet, TextInput as RNTextInput } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    ...formControl,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const TextInput = ({ field, placeholder, variant = "default" }) => {
  const { value, touched, error, onChange, onBlur } = field;

  const inputProps = {
    multiline: variant === "multiline",
    secureTextEntry: variant === "password",
  };

  return (
    <>
      <RNTextInput
        {...inputProps}
        style={[
          styles.textInput,
          variant === "multiline" && {
            //hacky way to make it more similar to single line inputs
            paddingTop: 15,
            textAlignVertical: "top",
          },
          touched &&
            error && {
              borderColor: theme.colors.error,
            },
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
      />

      {touched && error && (
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      )}
    </>
  );
};

export default TextInput;
