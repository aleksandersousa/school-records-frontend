import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import AppRouter from './routes/Router';
import { GlobalStyles } from './theme/GlobalStyles';
import theme from './theme/theme.json';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <GlobalStyles />
      <AppRouter />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
