import styled from 'styled-components';

const SectionWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  color: #000;
  padding: 10px 20px;
`;

const TitleBox = styled.div`
  border: 3px solid #2bb5a3; /* Cor da identidade visual IBSystems */
  padding: 8px;
  text-align: center;
  margin-bottom: 40px;
`;

const TitleText = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
`;

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 1.6;
  text-align: justify; /* Padrão de relatório técnico */
  margin-bottom: 20px;
`;

export const IntroductionSection = ({ data }) => {
  return (
    <SectionWrapper>
      <TitleBox>
        <TitleText>Introdução</TitleText>
      </TitleBox>
      
      {data.paragrafos.map((texto, index) => (
        <Paragraph key={index}>{texto}</Paragraph>
      ))}
    </SectionWrapper>
  );
};