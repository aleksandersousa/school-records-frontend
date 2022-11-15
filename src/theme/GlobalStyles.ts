import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: unset;
    list-style-type: none;
    font-family: "Roboto", "sans-serif";
  }

  #root {
    height: 100vh;
  }

  [type=button] {
    -webkit-appearance: none !important;
  }


  article,
  aside,
  details,
  figcaption,
  figure,
  header,
  hgroup,
  menu,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  section {
    padding-top: 4rem;
  }

  h1 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h1};
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1.142857143;
    margin: 0;
  }

  h2 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h2};
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1.166666667;
  }

  h3 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h3};
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1.2;
  }

  h4 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h4};
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1.25;
  }

  h5 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h5};
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1.33;
  }

  h6 {
    font-size: ${({ theme }): string => theme.tipography.fontSizes.h6};
    font-weight: 500;
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

  .breadcrumb {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.625rem;
  }
`;
