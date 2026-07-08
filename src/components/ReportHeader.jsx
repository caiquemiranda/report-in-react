import styled from 'styled-components';
import logoImg from '../assets/logo.png'; 

const HeaderContainer = styled.header`
  display: flex;
  align-items: flex-start; /* Força a logo para o topo absoluto do container */
  justify-content: flex-start; 
  margin-bottom: 15px; /* Reduzido de 30px para puxar a tabela para cima */
`;

const LogoImage = styled.img`
  max-height: 50px; /* Tamanho ajustado para proporção ideal */
  max-width: 100%;
  object-fit: contain;
  /* Margem negativa opcional para colar a logo um pouco mais à esquerda caso o padding da página seja grande */
  margin-left: -5px; 
`;

export const ReportHeader = () => (
  <HeaderContainer>
    <LogoImage src={logoImg} alt="Logo" />
  </HeaderContainer>
);