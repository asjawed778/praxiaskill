import { createTheme, ThemeOptions } from '@mui/material/styles';
import { AppColors, Colors } from './colors';

const createAppTheme = (mode: 'light' | 'dark') => {
  const palette: AppColors = Colors[mode];

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      background: {
        default: palette.background,
        paper: mode === 'light' ? '#fff' : '#1c1f22',
      },
      text: {
        primary: palette.text,
        secondary: palette.icon,
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
      fontFamily: 'Inter, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export default createAppTheme;
