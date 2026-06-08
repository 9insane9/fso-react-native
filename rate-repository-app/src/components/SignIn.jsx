import Text from "./Text";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      // console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

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
          formik.errors.username && { borderColor: theme.colors.error },
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.formElement,
          styles.field,
          formik.errors.password && { borderColor: theme.colors.error },
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Pressable
        onPress={formik.handleSubmit}
        style={[styles.formElement, styles.button]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
