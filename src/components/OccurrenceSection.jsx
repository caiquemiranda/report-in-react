import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 10px 20px;
`;

const TitleBox = styled.div`
  border: 3px solid #2bb5a3;
  padding: 8px;
  text-align: center;
  margin-bottom: 25px;
`;

const TitleText = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
`;

const IntroText = styled.p`
  font-size: 13px;
  text-align: justify;
  margin-bottom: 20px;
`;

const OccurrenceCard = styled.div`
  margin-bottom: 30px;
  page-break-inside: avoid;
`;

const Field = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
`;

const Label = styled.span` font-weight: bold; `;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 15px;
`;

const MainImage = styled.img` width: 100%; border: 1px solid #ddd; `;
const ThumbContainer = styled.div` display: flex; gap: 10px; `;
const Thumb = styled.img` width: 48%; border: 1px solid #ddd; `;

export const OccurrenceSection = ({ data }) => (
  <SectionWrapper>
    <TitleBox>
      <TitleText>Ocorrências Relevantes</TitleText>
    </TitleBox>
    <IntroText>{data.introducao}</IntroText>

    {data.atendimentos.map((oc, i) => (
      <OccurrenceCard key={i}>
        <Field><Label>Atendimento - {oc.id}</Label></Field>
        <Field><Label>Local: </Label>{oc.local}</Field>
        <Field><Label>Requisitante: </Label>{oc.requisitante}</Field>
        <Field><Label>Tipo de Manutenção: </Label>{oc.tipo}</Field>
        <Field><Label>Serviço a realizar: </Label>{oc.descricao}</Field>
        
        <ImagesGrid>
          <MainImage src={oc.imgs[0]} alt="Screenshot sistema" />
          <ThumbContainer>
            <Thumb src={oc.imgs[1]} alt="Foto 1" />
            <Thumb src={oc.imgs[2]} alt="Foto 2" />
          </ThumbContainer>
        </ImagesGrid>
      </OccurrenceCard>
    ))}
  </SectionWrapper>
);