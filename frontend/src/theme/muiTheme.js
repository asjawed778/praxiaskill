import { createTheme } from '@mui/material/styles';
import { Colors } from './colors';

const createAppTheme = (mode) => {
  const palette= Colors[mode];

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
        default: mode ==="light" ? "#ffffff" : "#121212",
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
      fontFamily:  `"Inter", "Roboto", "sans-serif"`,
      h1: {
        fontFamily: `"Mohave", "sans-serif"`,
        fontWeight: 600,
        fontSize: "2.5rem",
      },
      h2: {
        fontFamily: `"Mohave", "sans-serif"`,
        fontWeight: 600,
        fontSize: "2rem",
      },
      body1: {
        fontFamily: `"Inter", "sans-serif"`,
        fontWeight: 400,
        fontSize: "1rem",
      },
      button: {
        fontFamily: `"Mohave", `,
        fontWeight: 400,
        fontSize: "0.875rem",
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export default createAppTheme;
