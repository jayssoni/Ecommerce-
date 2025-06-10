import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  font-family: ${theme.typography.fontFamily};
  padding: ${props => {
    switch (props.size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '0.875rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  }};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: ${theme.transitions.smooth};
  position: relative;
  overflow: hidden;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.background};
          border: 2px solid ${theme.colors.primary};
          &:hover {
            background-color: transparent;
            color: ${theme.colors.primary};
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.background};
          border: 2px solid ${theme.colors.secondary};
          &:hover {
            background-color: transparent;
            color: ${theme.colors.secondary};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.background};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.background};
          border: 2px solid ${theme.colors.primary};
        `;
    }
  }}

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.1);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 120%;
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;