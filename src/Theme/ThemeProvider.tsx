import React, { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, THEMES, ThemeContext } from './ThemeContext';

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEMES) || THEMES.LIGHT;

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<THEMES>(defaultTheme);
  const toggleTheme = () =>
    theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
