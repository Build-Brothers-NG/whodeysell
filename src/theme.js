import React from "react";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#479E7A",
    },
    secondary: {
      main: "#666666",
    },
    text: {
      secondary: "#b3b3b3;",
      primary: "#666666",
    },
    error: {
      main: red.A400,
    },
    white: {
      main: "#FFFFFF",
    },
    bgcolor: {
      main: "rgba(201, 199, 199, 0.13)",
    },
  },
});

export default theme;

// const getDesignTokens = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === "light"
//       ? {
//           // palette values for light mode
//           primary: amber,
//           divider: amber[200],
//           text: {
//             primary: grey[900],
//             secondary: grey[800],
//           },
//         }
//       : {
//           // palette values for dark mode
//           primary: deepOrange,
//           divider: deepOrange[700],
//           background: {
//             default: deepOrange[900],
//             paper: deepOrange[900],
//           },
//           text: {
//             primary: "#fff",
//             secondary: grey[500],
//           },
//         }),
//   },
// });
