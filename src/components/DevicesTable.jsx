import styled from 'styled-components';

const TableWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  overflow: hidden;
  page-break-inside: auto; /* Permite que a tabela quebre de página se for muito longa */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ColumnHeaderRow = styled.tr`
  background: linear-gradient(90deg, #17d3d6 0%, #2bb5a3 100%);
`;

const ColumnHeader = styled.th`
  padding: 8px 10px;
  font-size: 11px;
  color: #ffffff;
  text-transform: uppercase;
  text-align: ${(props) => props.$align || 'center'};
  border-right: 1px solid rgba(255,255,255,0.2);
  
  &:last-child {
    border-right: none;
  }
`;

const DataRow = styled.tr`
  background-color: ${(props) => (props.$alt ? '#f0faf9' : '#ffffff')}; /* Zebrado suave com a cor da marca */
  border-bottom: 1px solid #e2e8f0;
`;

const DataCell = styled.td`
  padding: 6px 10px;
  font-size: 11px;
  color: #334155;
  text-align: ${(props) => props.$align || 'center'};
  border-right: 1px solid #e2e8f0;

  &:last-child {
    border-right: none;
  }
`;

export const DevicesTable = ({ devices }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <ColumnHeaderRow>
            <ColumnHeader>Nº</ColumnHeader>
            <ColumnHeader>Point</ColumnHeader>
            <ColumnHeader>Node</ColumnHeader>
            <ColumnHeader $align="left">LOCAL</ColumnHeader>
            <ColumnHeader>V/C</ColumnHeader>
            <ColumnHeader>Data</ColumnHeader>
          </ColumnHeaderRow>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <DataRow key={index} $alt={index % 2 !== 0}>
              <DataCell><strong>{device.numero}</strong></DataCell>
              <DataCell>{device.point}</DataCell>
              <DataCell>{device.node}</DataCell>
              <DataCell $align="left">{device.local}</DataCell>
              <DataCell>{device.vc}</DataCell>
              <DataCell>{device.data}</DataCell>
            </DataRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};
