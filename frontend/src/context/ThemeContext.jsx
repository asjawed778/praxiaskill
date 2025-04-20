import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from '../theme/muiTheme';
import { Colors } from '../theme/colors';

const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
  colors: Colors['light'],
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); 

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const colors = useMemo(() => Colors[mode], [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, colors }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};
