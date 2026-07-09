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

// Editor genérico de lista: tanto listas de strings simples (itemFields
// indefinido) quanto listas de objetos planos (itemFields define os campos
// de cada item). O select trava a seção inteira em "Valor padrão" (a lista
// inteira continua igual ao mês de referência) até marcar "Novo valor".
export const ListEditor = ({ label, items, onChange, itemFields, itemMultiline, emptyItem }) => {
  const [locked, setLocked] = useState(true);

  const updateItem = (index, newItem) => {
    const next = [...items];
    next[index] = newItem;
    onChange(next);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    const blank = itemFields
      ? Object.fromEntries(itemFields.map((f) => [f.key, '']))
      : '';
    onChange([...items, emptyItem ? emptyItem() : blank]);
  };

  return (
    <SubSection>
      <FieldRow style={{ gridTemplateColumns: '180px 1fr 140px', marginBottom: '10px' }}>
        <Label>{label}</Label>
        <div />
        <LockSelect
          value={locked ? 'padrao' : 'novo'}
          onChange={(e) => setLocked(e.target.value === 'padrao')}
        >
          <option value="padrao">Valor padrão</option>
          <option value="novo">Novo valor</option>
        </LockSelect>
      </FieldRow>

      {items.map((item, index) => (
        <ItemCard key={index}>
          <ItemCardHeader>
            <ItemLabel>Item {index + 1}</ItemLabel>
            <SmallButton
              type="button"
              $variant="danger"
              disabled={locked}
              onClick={() => removeItem(index)}
            >
              Remover
            </SmallButton>
          </ItemCardHeader>

          {itemFields ? (
            itemFields.map((f) => {
              const FieldInput = f.type === 'textarea' ? Textarea : f.type === 'select' ? LockSelect : Input;
              return (
                <FieldRow key={f.key} style={{ gridTemplateColumns: '140px 1fr', marginBottom: '8px' }}>
                  <Label>{f.label}</Label>
                  {f.type === 'select' ? (
                    <FieldInput
                      value={item[f.key] ?? ''}
                      disabled={locked}
                      onChange={(e) => updateItem(index, { ...item, [f.key]: e.target.value })}
                    >
                      {f.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </FieldInput>
                  ) : (
                    <FieldInput
                      value={item[f.key] ?? ''}
                      disabled={locked}
                      rows={f.type === 'textarea' ? 2 : undefined}
                      onChange={(e) => updateItem(index, { ...item, [f.key]: e.target.value })}
                    />
                  )}
                </FieldRow>
              );
            })
          ) : itemMultiline ? (
            <Textarea
              value={item}
              disabled={locked}
              rows={2}
              onChange={(e) => updateItem(index, e.target.value)}
            />
          ) : (
            <Input
              value={item}
              disabled={locked}
              onChange={(e) => updateItem(index, e.target.value)}
            />
          )}
        </ItemCard>
      ))}

      <AddButton type="button" disabled={locked} onClick={addItem}>
        + Adicionar item
      </AddButton>
    </SubSection>
  );
};
