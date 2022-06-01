import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#428A17",
    },
  },
  typography: {
    allVariants: {
      color: "#818181",
    },
    h1: {
      fontSize: "1.8rem",
      color: "#CCCCCC",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.04rem",
      lineHeight: "0.9rem",
    },
  },
});
