import React, { useState } from 'react';
import styled from 'styled-components';

// ==========================================
// COMPONENTE DE IMAGEM AJUSTÁVEL E SEGURA
// ==========================================
const DraggableContainer = styled.div`
  width: 100%;
  
  /* 1. O SEGREDO DO ALINHAMENTO: Substituímos o resize pelo aspect-ratio */
  /* 4/3 cria um formato de paisagem padrão (foto normal). Se preferir quadrado, use 1/1 */
  aspect-ratio: 4 / 6; 
  
  overflow: hidden;
  border: 1px solid #cbd5e1;
  border-radius: 2px;
  cursor: grab;
  position: relative;
  
  /* 2. O SEGREDO DA QUEBRA DE PÁGINA: Impede que a foto seja cortada ao meio */
  break-inside: avoid;

  &:active {
    cursor: grabbing;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none; 
`;

export const DraggableImage = ({ src, alt }) => {
  // Agora usamos porcentagem (50% é exatamente o centro)
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 50, y: 50 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartMouse({ x: e.clientX, y: e.clientY });
    setStartPos({ x: pos.x, y: pos.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Calcula o quanto o mouse moveu
    const deltaX = e.clientX - startMouse.x;
    const deltaY = e.clientY - startMouse.y;

    // Sensibilidade do movimento (se achar rápido, diminua para 0.1)
    const sensitivity = 0.2;

    // A MÁGICA DOS LIMITES: Math.min e Math.max garantem que a imagem NUNCA
    // passe de 0% ou 100%. Assim, ela nunca sai da caixa e não mostra fundo branco!
    const newX = Math.min(Math.max(startPos.x - (deltaX * sensitivity), 0), 100);
    const newY = Math.min(Math.max(startPos.y - (deltaY * sensitivity), 0), 100);

    setPos({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // BÔNUS: Dois cliques na imagem para centralizar ela de novo!
  const handleDoubleClick = () => setPos({ x: 50, y: 50 });




  return (
    <DraggableContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Solta a imagem se o mouse sair da caixa
      onDoubleClick={handleDoubleClick} // Centraliza ao dar clique duplo
      title="Arraste para ajustar o enquadramento. Puxe o canto inferior direito para alterar a altura."
    >
      <StyledImg
        src={src}
        alt={alt}
        // Aplica a posição em porcentagem
        style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
      />
    </DraggableContainer>
  );
};

// ==========================================
// ESTILOS DE LAYOUT
// ==========================================
const TitleContainer = styled.div` margin-bottom: 20px; `;

const TitleBox = styled.div`
  border: 3px solid #2bb5a3; padding: 8px; text-align: center; margin-bottom: 25px;
`;

const TitleText = styled.h2`
  margin: 0; font-size: 16px; font-weight: bold; text-transform: uppercase; color: #000;
`;

const IntroText = styled.p` font-size: 13px; text-align: justify; `;

const CardWrapper = styled.div`
  display: flex; flex-direction: column; flex-grow: 1; 
`;

const TextSection = styled.div` 
  margin-bottom: 20px; font-size: 13px; line-height: 1.5; 
`;

const CardTitle = styled.div`
  font-weight: bold; color: #2bb5a3; border-bottom: 1px solid #2bb5a3; margin-bottom: 10px; padding-bottom: 5px;
`;

// O SEGREDO ESTÁ AQUI: Grid unificado
const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 8px; 
  width: 100%;
  margin-top: 4px; /* Dá um respiro entre o texto longo e as fotos */
  
  /* Também aplicamos a regra no Grid para garantir que a linha inteira fique unida */
  page-break-inside: avoid;
  break-inside: avoid;
`;

// ==========================================
// COMPONENTES EXPORTADOS
// ==========================================
export const OccurrenceSectionTitle = ({ data }) => (
  <TitleContainer>
    <TitleBox><TitleText>Ocorrências Relevantes</TitleText></TitleBox>
    <IntroText>{data.introducao}</IntroText>
  </TitleContainer>
);

export const OccurrenceCard = ({ oc }) => {
  return (
    <CardWrapper>
      <TextSection>
        {/* Se for a página 2 da mesma ocorrência, adiciona (Continuação) no título */}
        <CardTitle>Atendimento - {oc.id} {oc.isContinuation ? "(Continuação)" : ""}</CardTitle>
        <div><strong>Local:</strong> {oc.local}</div>
        <div><strong>Requisitante:</strong> {oc.requisitante}</div>
        <div><strong>Tipo de Manutenção:</strong> {oc.tipo}</div>
        <div><strong>Serviço a realizar:</strong> {oc.descricao}</div>
      </TextSection>

      <PhotoGrid>
        {/* Renderiza o "pedaço" do array (no máximo 6 imagens) */}
        {oc.imgsChunk?.map((src, i) => (
          <DraggableImage key={i} src={src} alt={`Evidência ${i + 1}`} />
        ))}
      </PhotoGrid>
    </CardWrapper>
  );
};