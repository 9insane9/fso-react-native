import { StyleSheet, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import getFormikField from "../../utils/getFormikField";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { formContainer } from "../common/formStyle";

const styles = StyleSheet.create({
  container: formContainer,
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Must be at least 5 characters")
    .max(30, "Must be 30 characters or less"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Must be at least 5 characters")
    .max(50, "Must be 50 characters or less"),
  passwordConfirm: yup //better check if this works
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const fields = {
    username: getFormikField(formik, "username"),
    password: getFormikField(formik, "password"),
    passwordConfirm: getFormikField(formik, "passwordConfirm"),
  };

  return (
    <View style={styles.container}>
      <TextInput
        field={fields.username}
        placeholder="Username"
      />
      <TextInput
        field={fields.password}
        placeholder="Password"
        variant="password"
      />
      <TextInput
        field={fields.passwordConfirm}
        placeholder="Confirm password"
        variant="password"
      />
      <Button
        onPress={formik.handleSubmit}
        buttonText="Sign up and sign in"
      />
    </View>
  );
};

export default SignUpForm;
