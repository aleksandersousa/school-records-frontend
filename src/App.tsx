import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppRouter from './routes/Router';
import { GlobalStyles } from './theme/GlobalStyles';
import theme from './theme/theme.json';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
