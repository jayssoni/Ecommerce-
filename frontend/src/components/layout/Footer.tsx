import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.background};
  padding: ${theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  h4 {
    color: ${theme.colors.accent};
    margin-bottom: ${theme.spacing.md};
    font-size: 1.25rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50%;
      height: 2px;
      background-color: ${theme.colors.accent};
    }
  }
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.background};
  display: block;
  margin-bottom: ${theme.spacing.sm};
  transition: ${theme.transitions.smooth};
  
  &:hover {
    color: ${theme.colors.accent};
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};

  a {
    color: ${theme.colors.background};
    font-size: 1.5rem;
    transition: ${theme.transitions.smooth};
    
    &:hover {
      color: ${theme.colors.accent};
      transform: translateY(-3px);
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h4>About Us</h4>
          <p style={{ marginBottom: theme.spacing.md, lineHeight: '1.6' }}>
            Discover our curated collection of premium products, crafted with attention to detail and sophisticated style.
          </p>
          <SocialLinks>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h4>Quick Links</h4>
          <FooterLink to="/products">Products</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <h4>Customer Service</h4>
          <FooterLink to="/shipping">Shipping Information</FooterLink>
          <FooterLink to="/returns">Returns & Exchanges</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/size-guide">Size Guide</FooterLink>
        </FooterSection>

        <FooterSection>
          <h4>Newsletter</h4>
          <p style={{ marginBottom: theme.spacing.md }}>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          {/* Newsletter form can be added here */}
        </FooterSection>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;