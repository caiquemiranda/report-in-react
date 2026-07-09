import styled from 'styled-components';

const SectionWrapper = styled.div`
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
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

const Description = styled.p`
  font-size: 13px;
  text-align: justify;
  margin-bottom: 20px;
  line-height: 1.5;
`;

// Reaproveitamos a estrutura da DevicesTable para manter o padrão
const TableWrapper = styled.div`
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const StyledTable = styled.table` width: 100%; border-collapse: collapse; `;

const HeaderRow = styled.tr`
  /* Substituímos a cor sólida pelo degradê padronizado */
  background: linear-gradient(90deg, #17d3d6 0%, #2bb5a3 100%);
`;

const HeaderCell = styled.th`
  padding: 8px 10px;
  font-size: 11px;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
`;

const DataRow = styled.tr`
  background-color: ${(props) => (props.$alt ? '#f0faf9' : '#ffffff')};
  border-bottom: 1px solid #e2e8f0;
`;

const DataCell = styled.td`
  padding: 6px 10px;
  font-size: 11px;
  color: #334155;
  text-align: center;
`;

export const GeneralConsiderations = ({ title, text, headers, data }) => (
  <SectionWrapper>
    {title && (
      <TitleBox>
        <TitleText>{title}</TitleText>
      </TitleBox>
    )}
    {text && <Description>{text}</Description>}
    
    <TableWrapper>
      <StyledTable>
        <thead>
          <HeaderRow>
            {headers.map((h, i) => <HeaderCell key={i}>{h}</HeaderCell>)}
          </HeaderRow>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <DataRow key={i} $alt={i % 2 !== 0}>
              {row.map((cell, j) => <DataCell key={j}>{cell}</DataCell>)}
            </DataRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  </SectionWrapper>
);