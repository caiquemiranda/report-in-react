import styled from 'styled-components';
import { ReportHeader } from '../components/ReportHeader';
import { EquipmentTable } from '../components/EquipmentTable';
import { ReportImages } from '../components/ReportImages';
import { ReportObservations } from '../components/ReportObservations';
import { ReportFooter } from '../components/ReportFooter';
import { ServicesSection } from '../components/ServicesSection';
import { DevicesTable } from '../components/DevicesTable';
import { TeamSection } from '../components/TeamSection';
import { IntroductionSection } from '../components/IntroductionSection';

// Novo componente de Índice importado
import { ReportSummary } from '../components/ReportSummary';

import reportData from '../data/relatorio.json'; 

const { indice, paineis, servicos, equipe, introducao } = reportData;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; 

  @media print {
    display: block; 
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
  flex-shrink: 0; 
  overflow: hidden; 

  @media print {
    margin: 0;
    box-shadow: none;
    width: 210mm;
    height: 297mm;
    page-break-after: always;
  }
`;

// Um componente simples só para marcar as páginas que ainda vamos construir
const PlaceholderBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  color: #64748b;
  font-size: 20px;
  font-weight: bold;
`;

export const ReportPage = () => {
  const { indice, paineis, servicos } = reportData;
  let pageCounter = 1;

  // Lógica da tabela de serviços (mantida)
  const devices = servicos.dispositivosTestados || [];
  const FIRST_PAGE_LIMIT = 21; 
  const NEXT_PAGES_LIMIT = 35; 
  const servicePages = [];
  
  if (devices.length <= FIRST_PAGE_LIMIT) {
    servicePages.push({ isFirst: true, items: devices });
  } else {
    servicePages.push({ isFirst: true, items: devices.slice(0, FIRST_PAGE_LIMIT) });
    let remaining = devices.slice(FIRST_PAGE_LIMIT);
    while (remaining.length > 0) {
      servicePages.push({ isFirst: false, items: remaining.slice(0, NEXT_PAGES_LIMIT) });
      remaining = remaining.slice(NEXT_PAGES_LIMIT);
    }
  }

  return (
    <ReportContainer>
      
      {/* PÁGINA 1: CAPA */}
      <A4Page>
        <ReportHeader />
        <PlaceholderBox>Capa do Relatório (A Desenvolver)</PlaceholderBox>
        {/* A capa geralmente não leva o cabeçalho/rodapé padrão */}
      </A4Page>
      {/* Avança o contador secretamente para a capa contar como pág 1 */}
      <div style={{ display: 'none' }}>{pageCounter++}</div>

      {/* PÁGINA 2: ÍNDICE */}
      <A4Page>
        <ReportHeader />
        <ReportSummary items={indice} />
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

      {/* PÁGINA 3: INTRODUÇÃO */}
      <A4Page>
        <ReportHeader />
        <PlaceholderBox>Introdução (A Desenvolver)</PlaceholderBox>
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

      {/* PÁGINA 4: EQUIPE ENVOLVIDA */}
      <A4Page>
        <ReportHeader />
        <IntroductionSection data={introducao} />
        <TeamSection data={equipe} />
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

      {/* PÁGINA 5: SERVIÇOS EXECUTADOS */}
      {servicePages.map((pageData, index) => {
        const currentPage = pageCounter++;
        return (
          <A4Page key={`services-page-${index}`}>
            <ReportHeader />
            {pageData.isFirst && <ServicesSection data={servicos} />}
            <DevicesTable devices={pageData.items} />
            <ReportFooter page={`Página ${currentPage}`} />
          </A4Page>
        );
      })}

      {/* PÁGINA 6, 7...: PAINÉIS (INSPEÇÕES) */}
      {paineis.map((painel) => {
        const currentPage = pageCounter++;
        return (
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
            <ReportFooter page={`Página ${currentPage}`} />
          </A4Page>
        );
      })}

    </ReportContainer>
  );
};