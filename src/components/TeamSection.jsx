import React from 'react';
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

// O Grid é o segredo para manter as duas colunas alinhadas
const GridRow = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr; /* Coluna 1 fixa em 240px, Coluna 2 ocupa o resto */
  gap: 15px;
  margin-bottom: 25px;
  font-size: 13px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const ValueBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espaço entre as linhas de nomes */
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const RegularText = styled.span`
  font-weight: normal;
  text-align: justify;
  line-height: 1.4;
`;

const EmailLink = styled.a`
  color: #0000ee;
  text-decoration: underline;
  font-weight: normal;
`;

export const TeamSection = ({ data }) => {
  return (
    <SectionWrapper>
      <TitleBox>
        <TitleText>Equipe Envolvida</TitleText>
      </TitleBox>

      <GridRow>
        <Label>Gerentes de Serviços:</Label>
        <ValueBlock>
          {data.gerentes.map((nome, index) => (
            <BoldText key={index}>{nome}</BoldText>
          ))}
        </ValueBlock>
      </GridRow>

      <GridRow>
        <Label>Escopo do Contrato:</Label>
        <ValueBlock>
          <RegularText>{data.escopo}</RegularText>
        </ValueBlock>
      </GridRow>

      <GridRow>
        <Label>Data base p/ renovação:</Label>
        <ValueBlock>
          <BoldText>{data.dataRenovacao}</BoldText>
        </ValueBlock>
      </GridRow>

      <GridRow>
        <Label>Equipe IBSystems:</Label>
        <ValueBlock>
          {data.equipeTecnica.map((membro, index) => (
            <BoldText key={index}>{membro}</BoldText>
          ))}
        </ValueBlock>
      </GridRow>

      {/* Renderização dinâmica dos contatos */}
      {data.contatos.map((contato, index) => (
        <React.Fragment key={index}>
          <GridRow style={{ marginBottom: '5px' }}>
            <Label>{contato.cargo} :</Label>
            <ValueBlock>
              <BoldText>{contato.nome}</BoldText>
            </ValueBlock>
          </GridRow>
          <GridRow style={{ marginBottom: '25px' }}>
            <RegularText style={{ paddingLeft: '2px' }}>Correio Eletrônico</RegularText>
            <ValueBlock>
              <EmailLink href={`mailto:${contato.email}`}>{contato.email}</EmailLink>
            </ValueBlock>
          </GridRow>
        </React.Fragment>
      ))}

    </SectionWrapper>
  );
};