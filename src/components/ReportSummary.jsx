import styled from 'styled-components';

const SummaryContainer = styled.div`
  font-family: 'Arial', sans-serif;
  color: #000;
  padding: 20px 40px; /* Dá uma margem interna elegante */
`;

const MainTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 30px;
`;

const IndexRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 12px;
  font-size: 13px;
  
  /* Se for level 2 (subtópico), aplica um recuo à esquerda e tira o negrito */
  padding-left: ${(props) => (props.$level === 2 ? '20px' : '0')};
  font-weight: ${(props) => (props.$level === 1 ? 'normal' : 'normal')};
`;

const ItemTitle = styled.span`
  background: white; /* Cobre o pontilhado que passar por baixo */
  padding-right: 5px;
`;

// O pontilhado que estica automaticamente
const Dots = styled.div`
  flex-grow: 1;
  border-bottom: 1.5px dotted #000;
  position: relative;
  top: -4px; /* Ajuste fino para alinhar o ponto com a base do texto */
  margin: 0 5px;
`;

const PageNumber = styled.span`
  background: white;
  padding-left: 5px;
  font-weight: bold;
`;

export const ReportSummary = ({ items }) => {
  return (
    <SummaryContainer>
      <MainTitle>ÍNDICE</MainTitle>
      
      {items.map((item, index) => (
        <IndexRow key={index} $level={item.level}>
          <ItemTitle>{item.titulo}</ItemTitle>
          <Dots />
          <PageNumber>{item.pagina}</PageNumber>
        </IndexRow>
      ))}
    </SummaryContainer>
  );
};