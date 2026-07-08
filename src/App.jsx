import { ReportPage } from './pages/ReportPage';
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
  padding: 20px 0;

  @media print {
    display: block; /* Desativa o flex na impressão! */
    padding: 0;
  }
`;

function App() {
  return (
    <AppWrapper>
      <GlobalPrintStyle />
      <ReportPage />
    </AppWrapper>
  );
}

export default App;