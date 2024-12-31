import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import logger from './utils/logger';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      background: '#ffffff',
      text: '#000000',
    },
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#000000',
      text: '#ffffff',
    },
  },
});

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = React.useState(true); // Set dark theme by default

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(!isDark);

  logger.debug('ThemeProvider initialized');

  return (
    <NextUIProvider theme={theme}>
      <App toggleTheme={toggleTheme} />
    </NextUIProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
