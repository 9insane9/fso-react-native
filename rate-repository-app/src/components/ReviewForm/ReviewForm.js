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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating can't be lower than 0")
    .max(100, "Rating can't be higher than 100"),
  text: yup.string().optional(),
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const fields = {
    ownerName: getFormikField(formik, "ownerName"),
    repositoryName: getFormikField(formik, "repositoryName"),
    rating: getFormikField(formik, "rating"),
    text: getFormikField(formik, "text"),
  };

  return (
    <View style={styles.container}>
      <TextInput
        field={fields.ownerName}
        placeholder="Repository owner name"
      />
      <TextInput
        field={fields.repositoryName}
        placeholder="Repository name"
      />
      <TextInput
        field={fields.rating}
        placeholder="Rating between 0 and 100"
      />
      <TextInput
        variant="multiline"
        field={fields.text}
        placeholder="Review"
      />
      <Button
        onPress={formik.handleSubmit}
        buttonText="Create a review"
      />
    </View>
  );
};

export default ReviewForm;
