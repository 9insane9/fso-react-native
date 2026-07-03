const getFormikField = (formik, fieldName) => {
  return {
    value: formik.values[fieldName],
    error: formik.errors[fieldName],
    touched: formik.touched[fieldName],
    onChange: formik.handleChange(fieldName),
    onBlur: formik.handleBlur(fieldName),
  };
};

export default getFormikField;
