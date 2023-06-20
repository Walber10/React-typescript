import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Sans-Serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeightBold: 700,
    fontWeightRegular: 400,
    body1: {
      fontWeight: 700,
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 400,
    },
    caption: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "0.8rem",
    },
  },
});

export default theme;
