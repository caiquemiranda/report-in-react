import { useState } from 'react';
import {
  SubSection,
  FieldRow,
  Label,
  Input,
  Textarea,
  LockSelect,
  ItemCard,
  ItemCardHeader,
  ItemLabel,
  SmallButton,
  AddButton,
} from './formStyles';

const emptyPainel = () => ({
  equipment: '',
  metadata: { serial: '', area: '', manufacturer: '', model: '' },
  measurements: [],
  images: { img1: '', img2: '' },
  observations: '',
});

const emptyMeasurement = () => ({ description: '', current: '', reference: '', status: '' });

// Editor específico para paineis[] — tem estrutura aninhada (metadata,
// measurements[], images) que o ListEditor genérico não cobre bem.
export const PaineisField = ({ items, onChange }) => {
  const [locked, setLocked] = useState(true);

  const updatePainel = (index, patch) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const updateMetadata = (index, key, value) => {
    updatePainel(index, { metadata: { ...items[index].metadata, [key]: value } });
  };

  const updateImages = (index, key, value) => {
    updatePainel(index, { images: { ...items[index].images, [key]: value } });
  };

  const updateMeasurement = (painelIndex, measurementIndex, patch) => {
    const measurements = [...items[painelIndex].measurements];
    measurements[measurementIndex] = { ...measurements[measurementIndex], ...patch };
    updatePainel(painelIndex, { measurements });
  };

  const addMeasurement = (painelIndex) => {
    updatePainel(painelIndex, { measurements: [...items[painelIndex].measurements, emptyMeasurement()] });
  };

  const removeMeasurement = (painelIndex, measurementIndex) => {
    updatePainel(painelIndex, {
      measurements: items[painelIndex].measurements.filter((_, i) => i !== measurementIndex),
    });
  };

  return (
    <SubSection>
      <FieldRow style={{ gridTemplateColumns: '180px 1fr 140px', marginBottom: '10px' }}>
        <Label>Painéis inspecionados</Label>
        <div />
        <LockSelect
          value={locked ? 'padrao' : 'novo'}
          onChange={(e) => setLocked(e.target.value === 'padrao')}
        >
          <option value="padrao">Valor padrão</option>
          <option value="novo">Novo valor</option>
        </LockSelect>
      </FieldRow>

      {items.map((painel, index) => (
        <ItemCard key={index}>
          <ItemCardHeader>
            <ItemLabel>Painel {index + 1}</ItemLabel>
            <SmallButton
              type="button"
              $variant="danger"
              disabled={locked}
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              Remover painel
            </SmallButton>
          </ItemCardHeader>

          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Equipamento</Label>
            <Input value={painel.equipment} disabled={locked} onChange={(e) => updatePainel(index, { equipment: e.target.value })} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Nº Série</Label>
            <Input value={painel.metadata.serial} disabled={locked} onChange={(e) => updateMetadata(index, 'serial', e.target.value)} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Área instalação</Label>
            <Input value={painel.metadata.area} disabled={locked} onChange={(e) => updateMetadata(index, 'area', e.target.value)} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Fabricante</Label>
            <Input value={painel.metadata.manufacturer} disabled={locked} onChange={(e) => updateMetadata(index, 'manufacturer', e.target.value)} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Modelo</Label>
            <Input value={painel.metadata.model} disabled={locked} onChange={(e) => updateMetadata(index, 'model', e.target.value)} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Foto 1 (caminho)</Label>
            <Input value={painel.images.img1} disabled={locked} onChange={(e) => updateImages(index, 'img1', e.target.value)} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Foto 2 (caminho)</Label>
            <Input value={painel.images.img2} disabled={locked} onChange={(e) => updateImages(index, 'img2', e.target.value)} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
            <Label>Observações</Label>
            <Textarea rows={2} value={painel.observations} disabled={locked} onChange={(e) => updatePainel(index, { observations: e.target.value })} />
          </FieldRow>

          <ItemLabel style={{ display: 'block', margin: '14px 0 8px' }}>Medições</ItemLabel>
          {painel.measurements.map((m, mIndex) => (
            <ItemCard key={mIndex} style={{ background: '#ffffff' }}>
              <ItemCardHeader>
                <ItemLabel>Medição {mIndex + 1}</ItemLabel>
                <SmallButton
                  type="button"
                  $variant="danger"
                  disabled={locked}
                  onClick={() => removeMeasurement(index, mIndex)}
                >
                  Remover
                </SmallButton>
              </ItemCardHeader>
              <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
                <Label>Descrição</Label>
                <Input value={m.description} disabled={locked} onChange={(e) => updateMeasurement(index, mIndex, { description: e.target.value })} />
              </FieldRow>
              <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
                <Label>Medição atual</Label>
                <Input value={m.current} disabled={locked} onChange={(e) => updateMeasurement(index, mIndex, { current: e.target.value })} />
              </FieldRow>
              <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
                <Label>Valor referência</Label>
                <Input value={m.reference} disabled={locked} onChange={(e) => updateMeasurement(index, mIndex, { reference: e.target.value })} />
              </FieldRow>
              <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
                <Label>Status</Label>
                <Input value={m.status} disabled={locked} onChange={(e) => updateMeasurement(index, mIndex, { status: e.target.value })} />
              </FieldRow>
            </ItemCard>
          ))}
          <AddButton type="button" disabled={locked} onClick={() => addMeasurement(index)}>
            + Adicionar medição
          </AddButton>
        </ItemCard>
      ))}

      <AddButton type="button" disabled={locked} onClick={() => onChange([...items, emptyPainel()])}>
        + Adicionar painel
      </AddButton>
    </SubSection>
  );
};
