import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import theme from './theme/theme.json';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyles />
      APP
    </ThemeProvider>
  );
};

export default App;
