import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoArea = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PlaceholderLogo = styled.div`
  /* Substitua por uma tag <img /> quando tiver a logo real */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1f6fa8;
  font-weight: bold;
  font-size: 14px;
`;

const TitleArea = styled.div`
  width: 75%;
  text-align: center;
  padding-right: 25%; /* Para manter o texto estritamente no centro */
`;

export const ReportHeader = () => (
  <HeaderContainer>
    <LogoArea>
      <PlaceholderLogo>
        <span style={{ fontSize: '30px' }}>📊</span>
        IBSystems
        <span style={{ fontSize: '10px', color: '#666', fontWeight: 'normal' }}>Intelligent Building</span>
      </PlaceholderLogo>
    </LogoArea>
    <TitleArea>
    </TitleArea>
  </HeaderContainer>
);