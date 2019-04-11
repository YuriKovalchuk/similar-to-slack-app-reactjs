import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f0e40"
    },
    secondary: {
      main: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
