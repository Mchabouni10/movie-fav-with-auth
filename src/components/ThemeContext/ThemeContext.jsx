// ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    console.log('Current theme:', isDarkMode ? 'Dark Mode' : 'Light Mode');
    // Apply the theme class to the body
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};



