import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: auto; 
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* Garante que os textos de baixo fiquem alinhados */
  font-size: 13px;
  padding-bottom: 5px;
  font-family: 'Arial', sans-serif;
`;

const SignatureBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  width: ${(props) => props.$width};
  border-bottom: 1.5px solid #000;
`;

export const ReportFooter = () => (
  <FooterContainer>
    {/* Bloco 1: Linha em cima, texto embaixo */}
    <SignatureBlock>
      <Line $width="250px" style={{ marginBottom: '4px' }} />
      <span>Firmura / stamp: stamp</span>
    </SignatureBlock>

    {/* Bloco 2: Texto em cima, linha, texto embaixo */}
    <SignatureBlock>
      <span>12/06/2020</span>
      <Line $width="150px" style={{ margin: '2px 0 4px 0' }} />
      <span>Data</span>
    </SignatureBlock>

    {/* Bloco 3: Apenas texto, alinhado na base */}
    <div style={{ paddingBottom: '1px' }}>
      Página A4
    </div>
  </FooterContainer>
);