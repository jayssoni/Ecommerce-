import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const Logo = styled(Link)`
  color: ${theme.colors.background};
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${theme.colors.background};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${theme.colors.accent};
    transition: ${theme.transitions.smooth};
  }

  &:hover:after {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo to="/">Gothic Noir</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;