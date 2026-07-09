import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 40px; /* Espaçamento extra entre diferentes atendimentos */
`;

const TextSection = styled.div` 
  margin-bottom: 10px; 
  font-size: 13px;
  line-height: 1.5; 
`;

const Title = styled.div`
  font-weight: bold;
  color: #2bb5a3; /* Cor da nossa marca */
  border-bottom: 1px solid #2bb5a3;
  margin-bottom: 10px;
  padding-bottom: 5px;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-template-rows: repeat(2, 1fr);    
  gap: 1px; /* Espaço um pouco maior entre as fotos para dar respiro */
  flex-grow: 1;
`;

const Photo = styled.img`
  width: 100%;
  height: 150px; /* Definimos uma altura fixa para que as 6 fotos fiquem uniformes */
  object-fit: cover; 
  border: 2px solid #cbd5e1; /* Borda mais suave e profissional */
  border-radius: 8px; /* Cantos levemente arredondados */
`;

export const OccurrenceCard = ({ oc }) => (
  <CardWrapper>
    <TextSection>
      <Title>Atendimento - {oc.id}</Title>
      <div><strong>Local:</strong> {oc.local}</div>
      <div><strong>Requisitante:</strong> {oc.requisitante}</div>
      <div><strong>Tipo de Manutenção:</strong> {oc.tipo}</div>
      <div><strong>Serviço a realizar:</strong> {oc.descricao}</div>
    </TextSection>

    <PhotoGrid>
      {oc.imgs.map((src, i) => (
        <Photo key={i} src={src} alt={`Foto ${i + 1}`} />
      ))}
    </PhotoGrid>
  </CardWrapper>
);