import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    font-family: ${props => props.theme.typography.fontFamily};
    color: ${props => props.theme.colors.primary};
    line-height: ${props => props.theme.typography.body.lineHeight};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.heading.fontWeight};
    line-height: ${props => props.theme.typography.heading.lineHeight};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${props => props.theme.transitions.smooth};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: ${props => props.theme.transitions.smooth};
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;