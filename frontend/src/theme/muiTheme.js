import { createTheme } from "@mui/material/styles";
import { Colors } from "./colors";

const createAppTheme = (mode) => {
  const palette = Colors[mode];

  const themeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#121212",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#e0e0e0",
        secondary: mode === "light" ? "#969696" : "#b0b0b0",
      },
      success: {
        main: palette.success,
      },
      warning: {
        main: palette.warning,
      },
      error: {
        main: palette.error,
      },
    },

    typography: {
      fontFamily: "'Roboto'",
      body1: {
        fontWeight: 100,
        fontSize: "14px",
        [createTheme().breakpoints.up("sm")]: {
          fontSize: "16px",
        },
        [createTheme().breakpoints.up("md")]: {
          fontSize: "18px",
        },
        [createTheme().breakpoints.up("lg")]: {
          fontSize: "20px",
        },
        [createTheme().breakpoints.up("xl")]: {
          fontSize: "22px",
        },
      },
      body2: {
        fontWeight: 100,
        // color: "textSecondary",
        fontSize: "12px",
        [createTheme().breakpoints.up("sm")]: {
          fontSize: "12px",
        },
        [createTheme().breakpoints.up("md")]: {
          fontSize: "13px",
        },
        [createTheme().breakpoints.up("lg")]: {
          fontSize: "14px",
        },
        [createTheme().breakpoints.up("xl")]: {
          fontSize: "15px",
        },
      },
      h1: {
        fontWeight: 600,
        fontSize: "32px",
        [createTheme().breakpoints.up("sm")]: {
          fontSize: "36px",
        },
        [createTheme().breakpoints.up("md")]: {
          fontSize: "40px",
        },
        [createTheme().breakpoints.up("lg")]: {
          fontSize: "44px",
        },
        [createTheme().breakpoints.up("xl")]: {
          fontSize: "48px",
        },
      },
      h2: {
        fontWeight: 600,
        fontSize: "28px",
        [createTheme().breakpoints.up("sm")]: {
          fontSize: "32px",
        },
        [createTheme().breakpoints.up("md")]: {
          fontSize: "36px",
        },
        [createTheme().breakpoints.up("lg")]: {
          fontSize: "40px",
        },
        [createTheme().breakpoints.up("xl")]: {
          fontSize: "44px",
        },
      },
      h3: {
        fontWeight: 600,
        fontSize: "24px",
        [createTheme().breakpoints.up("sm")]: {
          fontSize: "28px",
        },
        [createTheme().breakpoints.up("md")]: {
          fontSize: "32px",
        },
        [createTheme().breakpoints.up("lg")]: {
          fontSize: "36px",
        },
        [createTheme().breakpoints.up("xl")]: {
          fontSize: "40px",
        },
      },
      h4: {
        fontWeight: 600,
        fontSize: "20px",
        [createTheme().breakpoints.up("sm")]: {
          fontSize: "24px",
        },
        [createTheme().breakpoints.up("md")]: {
          fontSize: "28px",
        },
        [createTheme().breakpoints.up("lg")]: {
          fontSize: "32px",
        },
        [createTheme().breakpoints.up("xl")]: {
          fontSize: "36px",
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export default createAppTheme;
