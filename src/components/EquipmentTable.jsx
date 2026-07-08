import styled from 'styled-components';

const ComponentWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  margin-bottom: 12px; /* Reduzido drasticamente para aproximar das fotos */
  page-break-inside: avoid;
  border: 1px solid #cbd5e1; 
  border-radius: 6px; 
  overflow: hidden; 
`;

const HeaderTitle = styled.div`
  /* Aplicando o degradê semelhante à logo (Ciano para Verde Água) */
  background: linear-gradient(90deg, #17d3d6 0%, #2bb5a3 100%);
  color: #ffffff;
  padding: 8px 12px; /* Reduzido para ganhar espaço vertical */
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #f8fafc; 
  padding: 8px 12px; /* Espaço mais justo */
  border-bottom: 1px solid #e2e8f0; 
  gap: 10px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 9px;
  color: #64748b;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2px;
`;

const InfoValue = styled.span`
  font-size: 12px;
  color: #0f172a;
  font-weight: bold;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ColumnHeaderRow = styled.tr`
  background-color: #ffffff;
`;

const ColumnHeader = styled.th`
  padding: 8px 12px; /* Reduzido o espaço do cabeçalho */
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  border-bottom: 2px solid #e2e8f0;
  text-align: ${(props) => props.$align || 'center'};
`;

const DataRow = styled.tr`
  background-color: ${(props) => (props.$alt ? '#f4f7f9' : '#ffffff')};
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DataCell = styled.td`
  padding: 6px 12px; /* Ajuste crucial para compactar as linhas da tabela */
  font-size: 11px;
  color: ${(props) => props.$color || '#334155'};
  text-align: ${(props) => props.$align || 'center'};
`;

const MainDescription = styled.strong`
  color: #0f172a;
  font-weight: 600;
`;

export const EquipmentTable = ({ equipment, metadata, measurements }) => {
  const getValueColor = (value) => {
    if (typeof value === 'string' && value.includes('-')) return '#dc2626';
    return '#2bb5a3'; 
  };

  return (
    <ComponentWrapper>
      <HeaderTitle>{equipment}</HeaderTitle>
      
      <InfoGrid>
        <InfoBlock>
          <InfoLabel>Nº Série</InfoLabel>
          <InfoValue>{metadata.serial}</InfoValue>
        </InfoBlock>
        <InfoBlock>
          <InfoLabel>Área Instalação</InfoLabel>
          <InfoValue>{metadata.area}</InfoValue>
        </InfoBlock>
        <InfoBlock>
          <InfoLabel>Fabricante</InfoLabel>
          <InfoValue>{metadata.manufacturer}</InfoValue>
        </InfoBlock>
        <InfoBlock>
          <InfoLabel>Modelo</InfoLabel>
          <InfoValue>{metadata.model}</InfoValue>
        </InfoBlock>
      </InfoGrid>

      <StyledTable>
        <thead>
          <ColumnHeaderRow>
            <ColumnHeader $align="left">Descrição</ColumnHeader>
            <ColumnHeader>Medição Atual</ColumnHeader>
            <ColumnHeader>Valor Referência</ColumnHeader>
            <ColumnHeader>Status</ColumnHeader>
          </ColumnHeaderRow>
        </thead>
        <tbody>
          {measurements.map((row, index) => (
            <DataRow key={index} $alt={index % 2 !== 0}>
              <DataCell $align="left">
                <MainDescription>{row.description}</MainDescription>
              </DataCell>
              <DataCell $color={getValueColor(row.current)}>
                <strong>{row.current}</strong>
              </DataCell>
              <DataCell $color={getValueColor(row.reference)}>
                {row.reference}
              </DataCell>
              <DataCell $color="#2bb5a3">{row.status}</DataCell>
            </DataRow>
          ))}
        </tbody>
      </StyledTable>
    </ComponentWrapper>
  );
};