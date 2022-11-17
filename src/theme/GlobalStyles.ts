import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    font-family: "Roboto", "sans-serif";
  }

  #root {
    height: 100vh;
  }

  [type=button] {
    -webkit-appearance: none !important;
  }

  /* style toastfy */
  .Toastify__toast-theme--light.Toastify__toast--success {
    background-color: ${({ theme }): string => theme.colors.success.dark};
    color: ${({ theme }): string => theme.colors.primary.white};
  }
  .Toastify__toast-theme--light.Toastify__toast--error {
    background-color: ${({ theme }): string => theme.colors.error.dark};
    color: ${({ theme }): string => theme.colors.primary.white};
  }
  .Toastify__progress-bar--error {
    background-color: ${({ theme }): string => theme.colors.primary.white};
  }
  .Toastify__toast-icon {
    svg {
      fill: ${({ theme }): string => theme.colors.primary.white};
    }
  }

  h1 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h1};
    letter-spacing: 1px;
    line-height: 1.142857143;
    margin: 0;
  }

  h2 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h2};
    letter-spacing: 1px;
    line-height: 1.166666667;
  }

  h3 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h3};
    letter-spacing: 1px;
    line-height: 1.2;
  }

  h4 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h4};
    letter-spacing: 1px;
    line-height: 1.25;
  }

  h5 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h5};
    letter-spacing: 1px;
    line-height: 1.33;
  }

  h6 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h6};
    letter-spacing: 1px;
    line-height: 1.4;
  }

  p {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.paragraph};
    letter-spacing: 1px;
    line-height: 1.5;
  }

  label {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.label};
    letter-spacing: 1px;
    line-height: 1.571428571;
  }

  span {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.tiny};
    letter-spacing: 1px;
    line-height: 1.666666667;
  }

  input, textarea {
    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;
