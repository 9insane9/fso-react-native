import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarBackground: "#24292e",
    appBarText: "white",
    mainBackground: "#e1e4e8",
    repositoryItemBackground: "white",
    error: "#d73a4a",
  },
  fontSizes: {
    heading: 20,
    subheading: 16,
    body: 14,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
