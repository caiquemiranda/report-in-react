import styled from 'styled-components';
import logoImg from '../assets/logo.png'; 

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  /* Se preferir a logo no centro da folha, troque 'flex-start' por 'center' */
  justify-content: flex-start; 
  margin-bottom: 0px;
  padding-top: 0px;
`;

const LogoImage = styled.img`
  /* Aumentamos significativamente o tamanho. Ajuste este número para mais ou para menos se precisar */
  max-height: 60px; 
  max-width: 100%;
  object-fit: contain;
`;

export const ReportHeader = () => (
  <HeaderContainer>
    <LogoImage src={logoImg} alt="Logo" />
  </HeaderContainer>
);