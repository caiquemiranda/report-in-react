import { ReportPage } from './pages/ReportPage';
import { createGlobalStyle } from 'styled-components';

const GlobalPrintStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #e0e0e0;
  }

  @media print {
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: white;
      height: 100vh; /* Trava a altura exatamente na janela de impressão */
      overflow: hidden; /* Corta qualquer escape para uma segunda página */
    }
    
    @page {
      size: A4;
      margin: 0mm !important; /* Tenta forçar Margem Nenhuma no Chrome */
    }
  }
`;

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <GlobalPrintStyle />
      <ReportPage />
    </div>
  );
}

export default App;