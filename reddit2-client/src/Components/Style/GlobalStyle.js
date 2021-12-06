import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  nav {
    background-color: ${({ theme }) => theme.header}
  }
  input {
    background: ${({ theme }) => theme.input}
  }
  button {
    background-color: ${({ theme }) => theme.button.background} !important;
    border: ${({ theme }) => theme.button.border};
    color: black !important
  }
  button&:hover, select&:hover {
    border: 1px solid black !important;
    opacity: 0.8
  } 
  .card {
    background-color: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
  }
  a, a:hover {
    text-decoration: none;
    color: inherit;
  }
  img {
    object-fit: cover
  }
  .w-md-editor-toolbar li:nth-child(12) {
    display: none
  }
`;