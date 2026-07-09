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
import { ScheduledServices } from '../components/ScheduledServices';
import { OccurrenceSectionTitle, OccurrenceCard,TitleBox, TitleText, TitleContainer } from '../components/OccurrenceSection';
import { GeneralConsiderations } from '../components/GeneralConsiderations';
import { ImportantPointCard } from '../components/ImportantPointCard';

// Novo componente de Índice importado
import { ReportSummary } from '../components/ReportSummary';

import reportData from '../data/relatorio.json'; 

const { indice, paineis, servicos, equipe, introducao, servicosProgramados, ocorrencias, consideracoesGerais } = reportData;

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
  // 1. Extraímos TODOS os dados de uma vez só
  const { indice, paineis, servicos, equipe, introducao, servicosProgramados, ocorrencias } = reportData;
  let pageCounter = 1;

  // ==========================================
  // LÓGICA 1: Paginação da Tabela de Dispositivos
  // ==========================================
  const devices = servicos?.dispositivosTestados || [];
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

  // ==========================================
  // LÓGICA 2: Paginação das Ocorrências (6 Fotos)
  // ==========================================
  const paginateOccurrences = (atendimentos) => {
    if (!atendimentos) return [];
    const pages = [];
    
    atendimentos.forEach(oc => {
      const imgs = oc.imgs || [];
      if (imgs.length === 0) {
        pages.push({ ...oc, imgsChunk: [], isContinuation: false });
      } else {
        // Corta as imagens de 6 em 6
        for (let i = 0; i < imgs.length; i += 6) {
          pages.push({
            ...oc,
            imgsChunk: imgs.slice(i, i + 6), // Pega apenas até 6 imagens por vez
            isContinuation: i > 0 // Se i > 0, é a continuação do mesmo atendimento
          });
        }
      }
    });
    return pages;
  };

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
      {/* PÁGINA 8: SERVIÇOS PROGRAMADOS */}
      <A4Page>
        <ReportHeader />
        <ScheduledServices data={servicosProgramados} />
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

      {/* PÁGINA 9 E SEGUINTES: OCORRÊNCIAS DINÂMICAS */}
      {paginateOccurrences(ocorrencias?.atendimentos).map((pageData, index) => {
        const currentPage = pageCounter++;
        return (
          <A4Page key={`${pageData.id}-${index}`}>
            <ReportHeader />
            
            {/* O Título "Ocorrências Relevantes" SÓ aparece na primeira página */}
            {index === 0 && <OccurrenceSectionTitle data={ocorrencias} />}
            
            {/* Passamos os dados fatiados para o Card */}
            <OccurrenceCard oc={pageData} />
            
            <ReportFooter page={`Página ${currentPage}`} />
          </A4Page>
        );
      })}

      <A4Page>
        <ReportHeader />
        
        {/* Primeira tabela de considerações */}
        <GeneralConsiderations 
          title="Considerações Gerais"
          text="Geramos relatório inicial de todos os troubles pré-existentes no mês de janeiro, demos início ao mês com 41 troubles. Segue abaixo tabela com essa relação:"
          headers={['Nº', 'Point', 'Node', 'Event', 'Status']}
          data={consideracoesGerais.tabelaInicial.map(item => [item.id, item.point, item.node, item.event, item.status])}
        />

        {/* Segunda parte com texto e tabela de 12 troubles */}
        <GeneralConsiderations 
          text="Após nossa atuação terminamos o mês com 12 troubles. Em fevereiro devemos continuar a busca por redução dos troubles, segue abaixo tabela com os troubles deixados no final do atendimento técnico:"
          headers={['Nº', 'Point', 'Node', 'Event', 'Status']}
          data={consideracoesGerais.tabelaFinal.map(item => [item.id, item.point, item.node, item.event, item.status])}
        />
        
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

      <A4Page>
        <ReportHeader />
        
        <div style={{ padding: '20px' }}>
          <TitleBox><TitleText>Observações Importantes</TitleText></TitleBox>

          <ImportantPointCard 
            title="Disponibilidade"
            text="No anexo registramos o gráfico de disponibilidade do sistema, tanto por painel como a disponibilidade geral." 
          />
          
          <ImportantPointCard 
            type="alert"
            title="Atenção ao Equipamento TSW"
            text="Conforme relatado anteriormente, o TSW ficou um período desligado no mês de junho/23, chamamos a atenção para a necessidade de verificação com frequência." 
          />

          <ImportantPointCard 
            type="alert"
            title="Necessidade de Acesso - Silos"
            text="Realimentamos o módulo do SILOS, mas permanece status NO ANSWER. Precisamos do apoio da Bridgestone para providenciar acesso." 
          />
          
          <ImportantPointCard 
            type="alert"
            title="Substituição de Base - 4:M1-116"
            text="Necessária substituição da base do detector na subestação do Tandem. Aguardamos solução de acesso já comunicada ao Sr. Rafael." 
          />

          <ImportantPointCard 
            title="Cronograma de Visitas"
            text="As oito visitas do mês foram realizadas nos dias 04, 05, 06, 17, 18, 24, 25 e 26/02." 
          />
        </div>

        <div style={{ marginTop: 'auto', textAlign: 'center', paddingBottom: '40px' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold' }}>IGOR ANDRADE CASTRO</p>
          <p style={{ fontSize: '11px' }}>RESPONSÁVEL TÉCNICO</p>
          <p style={{ fontSize: '11px' }}>IBSYSTEMS ENGENHARIA LTDA</p>
        </div>
        
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

      <A4Page>
        <ReportHeader />
        
        <div style={{ padding: '20px' }}>
          <TitleBox>
            <TitleText>ANEXO I</TitleText>
          </TitleBox>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>GRÁFICO DEMONSTRATIVO</h2>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>DISPONIBILIDADE</h2>
          </div>

          <AvailabilityCharts 
            chart1Src="/imgs/anexo1/painel.jpg" 
            chart2Src="/imgs/anexo1/geral.jpg" 
          />
        </div>
        
        <ReportFooter page={`Página ${pageCounter++}`} />
      </A4Page>

    </ReportContainer>
  );
};