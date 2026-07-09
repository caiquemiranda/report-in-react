import { useState } from 'react';
import { ReportPage } from './pages/ReportPage';
import { NewReportPage } from './pages/NewReportPage';
import { Sidebar } from './components/Sidebar';
import { reports } from './data/reports';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalPrintStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #e0e0e0;
  }

  /* O Vite usa uma div #root para renderizar o app. Precisamos destravá-la na impressão */
  @media print {
    html, body, #root {
      margin: 0 !important;
      padding: 0 !important;
      background-color: white;
      height: auto !important;      /* Libera a altura para múltiplas páginas */
      min-height: auto !important;
      overflow: visible !important; /* Impede o corte de conteúdo */
      display: block !important;    /* Desativa qualquer flexbox global */
    }
    
    @page {
      size: A4;
      margin: 0mm !important; 
    }
  }
`;

// Substituímos a div inline por um componente estilizado
const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-left: 240px; /* Reserva o espaço da sidebar fixa */
  padding: 20px 0;

  @media print {
    display: block; /* Desativa o flex na impressão! */
    margin-left: 0;
    padding: 0;
  }
`;

function App() {
  const [selectedKey, setSelectedKey] = useState(reports[0]?.key);
  const [mode, setMode] = useState('view'); // 'view' | 'create'
  const selectedReport = reports.find((report) => report.key === selectedKey) ?? reports[0];

  return (
    <>
      <GlobalPrintStyle />
      <Sidebar
        reports={reports}
        selectedKey={selectedReport?.key}
        onChange={setSelectedKey}
        mode={mode}
        onCreateNew={() => setMode('create')}
        onBackToView={() => setMode('view')}
      />
      <AppWrapper>
        {mode === 'create' ? (
          <NewReportPage reports={reports} onCancel={() => setMode('view')} />
        ) : (
          selectedReport && <ReportPage data={selectedReport.data} />
        )}
      </AppWrapper>
    </>
  );
}

export default App;