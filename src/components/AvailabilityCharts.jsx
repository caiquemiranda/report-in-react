import styled from 'styled-components';

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  padding: 20px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const ChartTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 15px;
  color: #333;
`;

const ChartImg = styled.img`
  width: 100%;
  max-width: 600px; /* Limita o tamanho para não ficar distorcido */
  border: 1px solid #e2e8f0;
  border-radius: 4px;
`;

export const AvailabilityCharts = ({ chart1Src, chart2Src }) => (
  <ChartsContainer>
    <ChartWrapper>
      <ChartTitle>DISPONIBILIDADE POR PAINEL</ChartTitle>
      <ChartImg src={chart1Src} alt="Gráfico Disponibilidade por Painel" />
    </ChartWrapper>
    
    <ChartWrapper>
      <ChartTitle>DISPONIBILIDADE GERAL DO SISTEMA</ChartTitle>
      <ChartImg src={chart2Src} alt="Gráfico Disponibilidade Geral" />
    </ChartWrapper>
  </ChartsContainer>
);