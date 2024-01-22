import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [IsDLightMode, setIsDLightMode] = useState(true);

  const toggleTheme = () => {
    setIsDLightMode((prevMode) => !prevMode);
  };

  const theme = {
    IsDLightMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
