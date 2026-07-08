import styled from 'styled-components';

// --- ESTILOS DO CONTAINER ---
const ComponentWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  margin-bottom: 25px;
  page-break-inside: avoid;
  border: 1px solid #cbd5e1; /* Borda sutil e moderna */
  border-radius: 4px;
  overflow: hidden; /* Mantém as bordas arredondadas limpas */
`;

// --- ESTILOS DOS DADOS DO EQUIPAMENTO (METADADOS) ---
const HeaderTitle = styled.div`
  background-color: #1f6fa8; /* Azul escuro profissional */
  color: #ffffff;
  padding: 8px 15px;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #f8fafc; /* Fundo cinza bem claro para destacar do papel branco */
  padding: 12px 15px;
  border-bottom: 1px solid #cbd5e1;
  gap: 15px;
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
  margin-bottom: 3px;
`;

const InfoValue = styled.span`
  font-size: 12px;
  color: #0f172a;
  font-weight: bold;
`;

// --- ESTILOS DA TABELA DE MEDIÇÕES ---
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const ColumnHeaderRow = styled.tr`
  background-color: #ffffff;
`;

const ColumnHeader = styled.th`
  padding: 10px 15px;
  font-size: 10px;
  color: #475569;
  text-transform: uppercase;
  border-bottom: 2px solid #e2e8f0;
`;

const DataRow = styled.tr`
  background-color: ${(props) => (props.$alt ? '#f1f5f9' : '#ffffff')};
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DataCell = styled.td`
  padding: 8px 15px;
  font-size: 11px;
  color: ${(props) => props.$color || '#334155'};
`;

const MainDescription = styled.strong`
  color: #0f172a;
  font-weight: 600;
`;

export const EquipmentTable = ({ equipment, metadata, measurements }) => {
  // Função para determinar a cor. Valores negativos ficam em vermelho, resto padrão.
  const getValueColor = (value) => {
    if (typeof value === 'string' && value.includes('-')) return '#dc2626'; // Vermelho moderno
    return '#2563eb'; // Azul moderno
  };

  return (
    <ComponentWrapper>
      
      {/* 1. SEÇÃO DE METADADOS (Grid Moderno) */}
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

      {/* 2. SEÇÃO DE MEDIÇÕES (Tabela Limpa) */}
      <StyledTable>
        <thead>
          <ColumnHeaderRow>
            <ColumnHeader>Descrição</ColumnHeader>
            <ColumnHeader>Medição Atual</ColumnHeader>
            <ColumnHeader>Valor Referência</ColumnHeader>
            <ColumnHeader>Status</ColumnHeader>
          </ColumnHeaderRow>
        </thead>
        <tbody>
          {measurements.map((row, index) => (
            <DataRow key={index} $alt={index % 2 !== 0}>
              <DataCell>
                <MainDescription>{row.description}</MainDescription>
              </DataCell>
              <DataCell $color={getValueColor(row.current)}>
                <strong>{row.current}</strong>
              </DataCell>
              <DataCell $color={getValueColor(row.reference)}>
                {row.reference}
              </DataCell>
              <DataCell $color="#2563eb">{row.status}</DataCell>
            </DataRow>
          ))}
        </tbody>
      </StyledTable>
      
    </ComponentWrapper>
  );
};