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

const emptyAtendimento = () => ({
  id: '',
  local: '',
  requisitante: '',
  tipo: 'Corretiva',
  descricao: '',
  imgs: [],
});

// Editor específico para ocorrencias.atendimentos[] — o campo imgs (lista de
// caminhos de foto) é editado como uma única textarea, uma linha por caminho,
// para não precisar de mais um nível de lista dinâmica aninhada.
export const OcorrenciasField = ({ items, onChange }) => {
  const [locked, setLocked] = useState(true);

  const updateAtendimento = (index, patch) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <SubSection>
      <FieldRow style={{ gridTemplateColumns: '180px 1fr 140px', marginBottom: '10px' }}>
        <Label>Atendimentos</Label>
        <div />
        <LockSelect
          value={locked ? 'padrao' : 'novo'}
          onChange={(e) => setLocked(e.target.value === 'padrao')}
        >
          <option value="padrao">Valor padrão</option>
          <option value="novo">Novo valor</option>
        </LockSelect>
      </FieldRow>

      {items.map((oc, index) => (
        <ItemCard key={index}>
          <ItemCardHeader>
            <ItemLabel>Atendimento {index + 1}</ItemLabel>
            <SmallButton
              type="button"
              $variant="danger"
              disabled={locked}
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              Remover
            </SmallButton>
          </ItemCardHeader>

          <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
            <Label>Nº</Label>
            <Input value={oc.id} disabled={locked} onChange={(e) => updateAtendimento(index, { id: e.target.value })} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
            <Label>Local</Label>
            <Input value={oc.local} disabled={locked} onChange={(e) => updateAtendimento(index, { local: e.target.value })} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
            <Label>Requisitante</Label>
            <Input value={oc.requisitante} disabled={locked} onChange={(e) => updateAtendimento(index, { requisitante: e.target.value })} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
            <Label>Tipo</Label>
            <LockSelect value={oc.tipo} disabled={locked} onChange={(e) => updateAtendimento(index, { tipo: e.target.value })}>
              <option value="Corretiva">Corretiva</option>
              <option value="Preventiva">Preventiva</option>
            </LockSelect>
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
            <Label>Descrição</Label>
            <Textarea rows={3} value={oc.descricao} disabled={locked} onChange={(e) => updateAtendimento(index, { descricao: e.target.value })} />
          </FieldRow>
          <FieldRow style={{ gridTemplateColumns: '120px 1fr', marginBottom: '6px' }}>
            <Label>Fotos (uma por linha)</Label>
            <Textarea
              rows={3}
              value={oc.imgs.join('\n')}
              disabled={locked}
              onChange={(e) => updateAtendimento(index, { imgs: e.target.value.split('\n') })}
            />
          </FieldRow>
        </ItemCard>
      ))}

      <AddButton type="button" disabled={locked} onClick={() => onChange([...items, emptyAtendimento()])}>
        + Adicionar atendimento
      </AddButton>
    </SubSection>
  );
};
