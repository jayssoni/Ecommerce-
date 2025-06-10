import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';

interface CardProps {
  image?: string;
  title: string;
  description: string;
  price?: string;
  onClick?: () => void;
}

const CardWrapper = styled(motion.div)`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: ${theme.transitions.smooth};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.div<{ image?: string }>`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      ${theme.colors.primary} 100%
    );
    opacity: 0;
    transition: ${theme.transitions.smooth};
  }

  ${CardWrapper}:hover &:after {
    opacity: 0.3;
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  font-size: 1.25rem;
`;

const CardDescription = styled.p`
  color: ${theme.colors.secondary};
  font-size: 0.875rem;
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.5;
`;

const CardPrice = styled.span`
  color: ${theme.colors.primary};
  font-size: 1.125rem;
  font-weight: 600;
  display: block;
`;

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
  onClick
}) => {
  return (
    <CardWrapper
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {image && <CardImage image={image} />}
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {price && <CardPrice>{price}</CardPrice>}
      </CardContent>
    </CardWrapper>
  );
};

export default Card;