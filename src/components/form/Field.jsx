import { useState } from 'react';
import { FieldRow, Label, Input, Textarea, LockSelect } from './formStyles';

// Campo simples de texto. O select ao lado trava o campo em "Valor padrão"
// (reaproveita o valor herdado do mês de referência) até o usuário marcar
// "Novo valor" — sinalizando que esse campo muda neste mês.
export const Field = ({ label, value, onChange, multiline }) => {
  const [locked, setLocked] = useState(true);
  const InputComponent = multiline ? Textarea : Input;

  return (
    <FieldRow>
      <Label>{label}</Label>
      <InputComponent
        value={value}
        disabled={locked}
        onChange={(e) => onChange(e.target.value)}
        rows={multiline ? 3 : undefined}
      />
      <LockSelect
        value={locked ? 'padrao' : 'novo'}
        onChange={(e) => setLocked(e.target.value === 'padrao')}
      >
        <option value="padrao">Valor padrão</option>
        <option value="novo">Novo valor</option>
      </LockSelect>
    </FieldRow>
  );
};
