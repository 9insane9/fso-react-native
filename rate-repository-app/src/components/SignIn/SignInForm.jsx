import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    flexShrink: 1,
    gap: 20,
    padding: 20,
  },
  formElement: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.textPrimary,
    height: 55,
    borderRadius: 10,
    fontSize: theme.fontSizes.heading,
    fontWeight: "100",
  },
  field: {
    paddingLeft: 10,
  },
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
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.formElement,
          styles.field,
          formik.touched.username &&
            formik.errors.username && {
              borderColor: theme.colors.error,
            },
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[
          styles.formElement,
          styles.field,
          formik.touched.password &&
            formik.errors.password && {
              borderColor: theme.colors.error,
            },
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}

      <Pressable
        onPress={formik.handleSubmit}
        style={[styles.formElement, styles.button]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
