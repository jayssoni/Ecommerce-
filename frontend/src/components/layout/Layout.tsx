import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding: ${theme.spacing.lg} 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${theme.spacing.md};

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;