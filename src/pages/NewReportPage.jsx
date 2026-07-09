import { useState } from 'react';
import { Field } from '../components/form/Field';
import { ListEditor } from '../components/form/ListEditor';
import { PaineisField } from '../components/form/PaineisField';
import { OcorrenciasField } from '../components/form/OcorrenciasField';
import {
  FormPage,
  FormHeader,
  FormTitle,
  FormHint,
  TopBar,
  Section,
  SectionTitle,
  Label,
  Input,
  LockSelect,
  GenerateButton,
  SuccessMessage,
  SmallButton,
} from '../components/form/formStyles';

const toNum = (value) => {
  const n = Number(value);
  return Number.isNaN(n) ? value : n;
};

const buildOutput = (state) => ({
  id: state.id,
  dataEmissao: state.dataEmissao,
  equipe: {
    gerentes: state.gerentes,
    escopo: state.escopo,
    dataRenovacao: state.dataRenovacao,
    equipeTecnica: state.equipeTecnica,
    contatos: state.contatos,
  },
  introducao: { paragrafos: state.paragrafos },
  indice: state.indice.map((i) => ({ titulo: i.titulo, pagina: toNum(i.pagina), level: toNum(i.level) })),
  paineis: state.paineis,
  servicos: {
    introducao: state.servicosIntroducao,
    preventiva: state.preventiva,
    corretiva: state.corretiva,
    chamadaTabela: state.chamadaTabela,
    dispositivosTestados: state.dispositivosTestados.map((d) => ({ ...d, numero: toNum(d.numero), node: toNum(d.node) })),
  },
  servicosProgramados: { titulo: state.spTitulo, introducao: state.spIntroducao, itens: state.spItens },
  ocorrencias: { introducao: state.ocIntroducao, atendimentos: state.atendimentos },
  consideracoesGerais: {
    textoInicial: state.textoInicial,
    textoFinal: state.textoFinal,
    tabelaInicial: state.tabelaInicial.map((t) => ({ ...t, id: toNum(t.id), node: toNum(t.node) })),
    tabelaFinal: state.tabelaFinal.map((t) => ({ ...t, id: toNum(t.id), node: toNum(t.node) })),
  },
  observacoesImportantes: state.observacoesImportantes.map((o) =>
    o.type ? { type: o.type, title: o.title, text: o.text } : { title: o.title, text: o.text }
  ),
  responsavelTecnico: { nome: state.respNome, cargo: state.respCargo, empresa: state.respEmpresa },
  graficos: {
    disponibilidadePainel: state.disponibilidadePainel.map((g) => ({ ...g, valor: toNum(g.valor) })),
    disponibilidadeGeral: state.disponibilidadeGeral.map((g) => ({ ...g, valor: toNum(g.valor) })),
  },
});

const downloadJson = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Formulário de criação de um novo mês. Recebe os dados de um mês de
// referência (baseData) para pré-preencher todos os campos. Cada campo/lista
// tem um select "Valor padrão" / "Novo valor" ao lado: em "Valor padrão" o
// campo fica travado (herda o valor do mês de referência sem risco de erro
// de digitação); em "Novo valor" ele libera edição para o mês atual.
const ReportForm = ({ baseData, targetMonth, targetYear, onGenerated }) => {
  const [id, setId] = useState(baseData.id ?? '');
  const [dataEmissao, setDataEmissao] = useState(baseData.dataEmissao ?? '');

  const [gerentes, setGerentes] = useState(baseData.equipe?.gerentes ?? []);
  const [escopo, setEscopo] = useState(baseData.equipe?.escopo ?? '');
  const [dataRenovacao, setDataRenovacao] = useState(baseData.equipe?.dataRenovacao ?? '');
  const [equipeTecnica, setEquipeTecnica] = useState(baseData.equipe?.equipeTecnica ?? []);
  const [contatos, setContatos] = useState(baseData.equipe?.contatos ?? []);

  const [paragrafos, setParagrafos] = useState(baseData.introducao?.paragrafos ?? []);

  const [indice, setIndice] = useState(baseData.indice ?? []);

  const [paineis, setPaineis] = useState(baseData.paineis ?? []);

  const [servicosIntroducao, setServicosIntroducao] = useState(baseData.servicos?.introducao ?? '');
  const [preventiva, setPreventiva] = useState(baseData.servicos?.preventiva ?? '');
  const [corretiva, setCorretiva] = useState(baseData.servicos?.corretiva ?? '');
  const [chamadaTabela, setChamadaTabela] = useState(baseData.servicos?.chamadaTabela ?? '');
  const [dispositivosTestados, setDispositivosTestados] = useState(baseData.servicos?.dispositivosTestados ?? []);

  const [spTitulo, setSpTitulo] = useState(baseData.servicosProgramados?.titulo ?? '');
  const [spIntroducao, setSpIntroducao] = useState(baseData.servicosProgramados?.introducao ?? '');
  const [spItens, setSpItens] = useState(baseData.servicosProgramados?.itens ?? []);

  const [ocIntroducao, setOcIntroducao] = useState(baseData.ocorrencias?.introducao ?? '');
  const [atendimentos, setAtendimentos] = useState(baseData.ocorrencias?.atendimentos ?? []);

  const [textoInicial, setTextoInicial] = useState(baseData.consideracoesGerais?.textoInicial ?? '');
  const [textoFinal, setTextoFinal] = useState(baseData.consideracoesGerais?.textoFinal ?? '');
  const [tabelaInicial, setTabelaInicial] = useState(baseData.consideracoesGerais?.tabelaInicial ?? []);
  const [tabelaFinal, setTabelaFinal] = useState(baseData.consideracoesGerais?.tabelaFinal ?? []);

  const [observacoesImportantes, setObservacoesImportantes] = useState(baseData.observacoesImportantes ?? []);

  const [respNome, setRespNome] = useState(baseData.responsavelTecnico?.nome ?? '');
  const [respCargo, setRespCargo] = useState(baseData.responsavelTecnico?.cargo ?? '');
  const [respEmpresa, setRespEmpresa] = useState(baseData.responsavelTecnico?.empresa ?? '');

  const [disponibilidadePainel, setDisponibilidadePainel] = useState(baseData.graficos?.disponibilidadePainel ?? []);
  const [disponibilidadeGeral, setDisponibilidadeGeral] = useState(baseData.graficos?.disponibilidadeGeral ?? []);

  const handleGenerate = () => {
    const output = buildOutput({
      id, dataEmissao, gerentes, escopo, dataRenovacao, equipeTecnica, contatos,
      paragrafos, indice, paineis,
      servicosIntroducao, preventiva, corretiva, chamadaTabela, dispositivosTestados,
      spTitulo, spIntroducao, spItens,
      ocIntroducao, atendimentos,
      textoInicial, textoFinal, tabelaInicial, tabelaFinal,
      observacoesImportantes,
      respNome, respCargo, respEmpresa,
      disponibilidadePainel, disponibilidadeGeral,
    });
    const mm = String(targetMonth).padStart(2, '0');
    const filename = `relatorio-${mm}-${targetYear}.json`;
    downloadJson(output, filename);
    onGenerated(filename);
  };

  const canGenerate = /^\d{1,2}$/.test(String(targetMonth)) && /^\d{4}$/.test(String(targetYear));

  return (
    <>
      <Section>
        <SectionTitle>Identificação</SectionTitle>
        <Field label="ID do relatório" value={id} onChange={setId} />
        <Field label="Data de emissão" value={dataEmissao} onChange={setDataEmissao} />
      </Section>

      <Section>
        <SectionTitle>Equipe envolvida</SectionTitle>
        <ListEditor label="Gerentes de serviços" items={gerentes} onChange={setGerentes} />
        <Field label="Escopo do contrato" value={escopo} onChange={setEscopo} multiline />
        <Field label="Data base p/ renovação" value={dataRenovacao} onChange={setDataRenovacao} />
        <ListEditor label="Equipe técnica" items={equipeTecnica} onChange={setEquipeTecnica} />
        <ListEditor
          label="Contatos"
          items={contatos}
          onChange={setContatos}
          itemFields={[
            { key: 'cargo', label: 'Cargo' },
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Introdução</SectionTitle>
        <ListEditor label="Parágrafos" items={paragrafos} onChange={setParagrafos} itemMultiline />
      </Section>

      <Section>
        <SectionTitle>Índice</SectionTitle>
        <ListEditor
          label="Itens do índice"
          items={indice}
          onChange={setIndice}
          itemFields={[
            { key: 'titulo', label: 'Título' },
            { key: 'pagina', label: 'Página' },
            { key: 'level', label: 'Nível (1 ou 2)' },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Painéis inspecionados</SectionTitle>
        <PaineisField items={paineis} onChange={setPaineis} />
      </Section>

      <Section>
        <SectionTitle>Serviços executados</SectionTitle>
        <Field label="Introdução" value={servicosIntroducao} onChange={setServicosIntroducao} multiline />
        <Field label="Texto preventiva" value={preventiva} onChange={setPreventiva} multiline />
        <Field label="Texto corretiva" value={corretiva} onChange={setCorretiva} multiline />
        <Field label="Chamada da tabela" value={chamadaTabela} onChange={setChamadaTabela} multiline />
        <ListEditor
          label="Dispositivos testados"
          items={dispositivosTestados}
          onChange={setDispositivosTestados}
          itemFields={[
            { key: 'numero', label: 'Nº' },
            { key: 'point', label: 'Point' },
            { key: 'node', label: 'Node' },
            { key: 'local', label: 'Local' },
            { key: 'vc', label: 'V/C' },
            { key: 'data', label: 'Data' },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Serviços programados</SectionTitle>
        <Field label="Título" value={spTitulo} onChange={setSpTitulo} />
        <Field label="Introdução" value={spIntroducao} onChange={setSpIntroducao} multiline />
        <ListEditor label="Itens programados" items={spItens} onChange={setSpItens} />
      </Section>

      <Section>
        <SectionTitle>Ocorrências</SectionTitle>
        <Field label="Introdução" value={ocIntroducao} onChange={setOcIntroducao} multiline />
        <OcorrenciasField items={atendimentos} onChange={setAtendimentos} />
      </Section>

      <Section>
        <SectionTitle>Considerações gerais</SectionTitle>
        <Field label="Texto inicial" value={textoInicial} onChange={setTextoInicial} multiline />
        <Field label="Texto final" value={textoFinal} onChange={setTextoFinal} multiline />
        <ListEditor
          label="Tabela inicial (troubles)"
          items={tabelaInicial}
          onChange={setTabelaInicial}
          itemFields={[
            { key: 'id', label: 'Nº' },
            { key: 'point', label: 'Point' },
            { key: 'node', label: 'Node' },
            { key: 'event', label: 'Event' },
            { key: 'status', label: 'Status' },
          ]}
        />
        <ListEditor
          label="Tabela final (troubles)"
          items={tabelaFinal}
          onChange={setTabelaFinal}
          itemFields={[
            { key: 'id', label: 'Nº' },
            { key: 'point', label: 'Point' },
            { key: 'node', label: 'Node' },
            { key: 'event', label: 'Event' },
            { key: 'status', label: 'Status' },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Observações importantes</SectionTitle>
        <ListEditor
          label="Cards de observação"
          items={observacoesImportantes}
          onChange={setObservacoesImportantes}
          itemFields={[
            { key: 'type', label: 'Tipo', type: 'select', options: [{ value: '', label: 'Informativo' }, { value: 'alert', label: 'Alerta' }] },
            { key: 'title', label: 'Título' },
            { key: 'text', label: 'Texto', type: 'textarea' },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Responsável técnico</SectionTitle>
        <Field label="Nome" value={respNome} onChange={setRespNome} />
        <Field label="Cargo" value={respCargo} onChange={setRespCargo} />
        <Field label="Empresa" value={respEmpresa} onChange={setRespEmpresa} />
      </Section>

      <Section>
        <SectionTitle>Gráficos de disponibilidade</SectionTitle>
        <ListEditor
          label="Disponibilidade por painel"
          items={disponibilidadePainel}
          onChange={setDisponibilidadePainel}
          itemFields={[{ key: 'nome', label: 'Painel' }, { key: 'valor', label: 'Valor (%)' }]}
        />
        <ListEditor
          label="Disponibilidade geral"
          items={disponibilidadeGeral}
          onChange={setDisponibilidadeGeral}
          itemFields={[{ key: 'mes', label: 'Mês' }, { key: 'valor', label: 'Valor (%)' }]}
        />
      </Section>

      <GenerateButton type="button" disabled={!canGenerate} onClick={handleGenerate}>
        Gerar relatório (baixar JSON)
      </GenerateButton>
    </>
  );
};

export const NewReportPage = ({ reports, onCancel }) => {
  const [referenceKey, setReferenceKey] = useState(reports[0]?.key);
  const [targetMonth, setTargetMonth] = useState('');
  const [targetYear, setTargetYear] = useState('');
  const [generatedFilename, setGeneratedFilename] = useState(null);

  const referenceReport = reports.find((r) => r.key === referenceKey) ?? reports[0];

  return (
    <FormPage>
      <FormHeader>
        <div>
          <FormTitle>Criar novo relatório mensal</FormTitle>
        </div>
        <SmallButton type="button" onClick={onCancel}>Voltar ao relatório</SmallButton>
      </FormHeader>
      <FormHint>
        Todos os campos já vêm preenchidos com os dados do mês de referência escolhido abaixo.
        Deixe "Valor padrão" nos campos que não mudam de um mês para o outro — eles ficam travados
        para evitar edição sem querer. Marque "Novo valor" só nos campos que precisam ser atualizados
        neste mês. Ao final, clique em "Gerar relatório" para baixar o arquivo JSON e salvá-lo em
        <code> src/data/</code>.
      </FormHint>

      <TopBar>
        <div>
          <Label>Baseado no mês de</Label>
          <LockSelect value={referenceKey} onChange={(e) => setReferenceKey(e.target.value)}>
            {reports.map((r) => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </LockSelect>
        </div>
        <div>
          <Label>Mês (1-12)</Label>
          <Input type="number" min="1" max="12" value={targetMonth} onChange={(e) => setTargetMonth(e.target.value)} />
        </div>
        <div>
          <Label>Ano</Label>
          <Input type="number" min="2000" max="2100" value={targetYear} onChange={(e) => setTargetYear(e.target.value)} />
        </div>
      </TopBar>

      {referenceReport && (
        <ReportForm
          key={referenceReport.key}
          baseData={referenceReport.data}
          targetMonth={targetMonth}
          targetYear={targetYear}
          onGenerated={setGeneratedFilename}
        />
      )}

      {generatedFilename && (
        <SuccessMessage>
          Arquivo "{generatedFilename}" baixado. Mova-o para src/data/ e recarregue o app para vê-lo no seletor de mês.
        </SuccessMessage>
      )}
    </FormPage>
  );
};
