import styled from 'styled-components';
import { ReportHeader } from '../components/ReportHeader';
import { EquipmentTable } from '../components/EquipmentTable';
import { ReportImages } from '../components/ReportImages';
import { ReportObservations } from '../components/ReportObservations';
import { ReportFooter } from '../components/ReportFooter';

import reportData from '../data/relatorio.json';

// NOVO: Container para empilhar as páginas perfeitamente
const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* Espaço cinza escuro entre as folhas na tela */

  @media print {
    display: block; /* Remove o flex na impressão para não bugar a quebra de página */
    gap: 0;
  }
`;

const A4Page = styled.div`
  width: 210mm;
  height: 297mm;
  padding: 12mm 15mm 15mm 15mm; 
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0; /* Impede que a página seja espremida pelo navegador */

  @media print {
    margin: 0;
    box-shadow: none;
    width: 210mm;
    height: 297mm;
    padding: 12mm 15mm 15mm 15mm;
    
    /* Garante a quebra de página */
    page-break-after: always;
    break-after: page;
  }
`;

export const ReportPage = () => {
  const { paineis } = reportData;

  return (
    <ReportContainer>
      {paineis.map((painel, index) => (
        <A4Page key={painel.metadata.serial}>
          <ReportHeader />
          
          <EquipmentTable 
            equipment={painel.equipment}
            metadata={painel.metadata}
            measurements={painel.measurements}
          />

          <ReportImages 
            img1={painel.images.img1} 
            img2={painel.images.img2} 
          />

          <ReportObservations text={painel.observations} />

          {/* Passamos o index + 1 para o rodapé saber qual é a página atual */}
          <ReportFooter page={`Página ${index + 1}`} />
        </A4Page>
      ))}
    </ReportContainer>
  );
};