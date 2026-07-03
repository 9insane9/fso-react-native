import theme from "../../theme";

export const formContainer = {
  backgroundColor: theme.colors.repositoryItemBackground,
  flexShrink: 1,
  gap: 20,
  padding: 20,
};

export const formControl = {
  width: "100%",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.colors.textPrimary,
  height: 55,
  borderRadius: 10,
  fontSize: theme.fontSizes.heading,
  fontWeight: "100",
};
