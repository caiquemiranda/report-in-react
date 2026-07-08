import styled from 'styled-components';
import { ReportHeader } from '../components/ReportHeader';
import { EquipmentTable } from '../components/EquipmentTable';
import { ReportImages } from '../components/ReportImages';
import { ReportObservations } from '../components/ReportObservations';
import { ReportFooter } from '../components/ReportFooter';

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

  @media print {
    margin: 0;
    box-shadow: none;
    width: 100%;
    height: 100vh; /* Se ajusta à página única */
    padding: 12mm 15mm 15mm 15mm;
  }
`;

// Dados estritamente idênticos ao modelo
const mockMeasurements = [
  { description: 'Tensão Laço Detecção 01', current: '29,1 Vcc', reference: '24 Vcc ≤ X ≤ 30 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão Baterias', current: '27,1 Vcc', reference: 'X ≥ 24,1 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão Saída Auxiliar', current: '28,1 Vcc', reference: 'X ≥ 24,1 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão NAC 01', current: '-23,2 Vcc', reference: 'X ≥ -30 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão NAC 02', current: '-23,5 Vcc', reference: 'X ≥ -30 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão NAC 03', current: '-23,6 Vcc', reference: 'X ≥ -30 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão NAC 04', current: '-23,7 Vcc', reference: 'X ≥ -30 Vcc', status: 'Em Conformidade' },
  { description: 'Tensão alimentação AC', current: '221 Vac', reference: '198 Vac ≤ X ≥ 242 Vac', status: 'Em Conformidade' },
];

export const ReportPage = () => {
  return (
    <A4Page>
      <ReportHeader />
      
      <EquipmentTable 
        equipment="SIMPLEX 4010ES / PN-04"
        metadata={{
          serial: 'PN-04',
          area: 'FABRICA A',
          manufacturer: 'Simplex',
          model: '4010ES'
        }}
        measurements={mockMeasurements}
      />

      <ReportImages img1="" img2="" />

      <ReportObservations text="Painel foi inspecionado e os alertas são replicados no supervisório (TSW), relatados na lista de Troubles." />

      <ReportFooter />
    </A4Page>
  );
};