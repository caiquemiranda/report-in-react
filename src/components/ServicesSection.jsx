import styled from 'styled-components';

const SectionWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  color: #334155;
  margin-bottom: 20px;
`;

const TitleBox = styled.div`
  border: 3px solid #2bb5a3; /* Cor da identidade visual */
  padding: 8px;
  text-align: center;
  margin-bottom: 20px;
`;

const TitleText = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #0f172a;
`;

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 15px;
  text-indent: 40px; /* Parágrafo com recuo igual ao documento original */
`;

const Subtitle = styled.h3`
  font-size: 13px;
  font-weight: bold;
  font-style: italic;
  margin: 15px 0 10px 20px;
  color: #0f172a;
`;

const BulletItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  margin-left: 40px;
  margin-bottom: 15px;
`;

export const ServicesSection = ({ data }) => {
  return (
    <SectionWrapper>
      <TitleBox>
        <TitleText>Serviços Executados</TitleText>
      </TitleBox>

      <Paragraph>{data.introducao}</Paragraph>

      <Subtitle>1.1 Testes de dispositivos</Subtitle>
      <BulletItem>
        <span>➤</span>
        <span>{data.preventiva}</span>
      </BulletItem>

      <Subtitle>1.2 Manutenções Corretivas</Subtitle>
      <BulletItem>
        <span>➤</span>
        <span>{data.corretiva}</span>
      </BulletItem>

      <Paragraph>{data.chamadaTabela}</Paragraph>
    </SectionWrapper>
  );
};