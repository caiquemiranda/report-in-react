# report-in-react

Gerador de **relatório mensal de manutenção** (sistema de detecção e alarme de incêndio) em React, pensado para ser impresso/exportado em PDF direto do navegador. Cada mês vira um arquivo JSON de dados; o app monta as páginas A4 do relatório a partir dele.

## Stack

- [Vite](https://vite.dev/) + React 19
- [styled-components](https://styled-components.com/) para toda a estilização
- [recharts](https://recharts.org/) para os gráficos de disponibilidade

## Como rodar

### Local
```bash
npm install
npm run dev
```
Abre em `http://localhost:5173`.

### Docker
```bash
docker-compose up
```
Sobe o mesmo `npm run dev` dentro de um container Node 22, expondo a porta `5173`.

### Outros scripts
```bash
npm run build     # build de produção (pasta dist/)
npm run preview   # serve o build de produção localmente
npm run lint      # ESLint
```

## Como funciona

A tela principal (`src/App.jsx`) mostra uma **sidebar** com um seletor de mês e, ao lado, o relatório (`src/pages/ReportPage.jsx`) renderizado como uma sequência de folhas A4 (capa, índice, introdução, equipe, serviços executados, painéis inspecionados, serviços programados, ocorrências, considerações gerais, observações importantes e anexo de gráficos).

Cada mês de relatório é um arquivo JSON independente. O app descobre automaticamente todos os arquivos que seguem o padrão:

```
src/data/relatorio-MM-YYYY.json
```

e os lista no seletor da sidebar, ordenados do mais recente para o mais antigo. Trocar o mês no seletor troca os dados exibidos — nenhuma outra ação é necessária.

### Adicionando um novo mês

Duas formas, dá pra usar qualquer uma:

**A. Pelo formulário "Criar novo relatório" (recomendado)**

1. Na sidebar, clique em **"+ Criar novo relatório"**.
2. Escolha o mês de referência (o formulário pré-preenche todos os campos com os dados desse mês) e informe o mês/ano do novo relatório.
3. Cada campo tem um select ao lado: **"Valor padrão"** mantém o campo travado com o valor herdado (bom para o que não muda mês a mês — equipe, contatos, escopo etc.); **"Novo valor"** libera a edição para o que precisa ser atualizado neste mês (introdução, ocorrências, painéis, tabelas...). Listas (painéis, ocorrências, tabelas) têm "+ Adicionar item" / "Remover" quando destravadas.
4. Clique em **"Gerar relatório (baixar JSON)"** — o navegador baixa `relatorio-MM-YYYY.json`.
5. Mova o arquivo baixado para `src/data/` e recarregue o app — o novo mês já aparece no seletor da sidebar.

**B. Editando o JSON manualmente**

1. Duplique `src/data/relatorio-02-2025.json` com o nome `relatorio-MM-YYYY.json` do mês desejado (ex.: `relatorio-03-2025.json`).
2. Preencha todos os campos com os dados do mês (veja a estrutura abaixo).
3. Coloque as fotos referenciadas em `public/imgs/...` nos caminhos usados pelo JSON.
4. Rode `npm run dev` — o novo mês já aparece no seletor da sidebar, sem precisar editar nenhum componente.

> O app roda inteiramente no navegador (sem backend), por isso o formulário baixa o JSON em vez de gravar o arquivo direto em `src/data/` — o passo de mover o arquivo é manual.

### Estrutura de um JSON de relatório

| Campo | Descrição |
|---|---|
| `equipe` | Gerentes, escopo do contrato, equipe técnica e contatos |
| `introducao` | Parágrafos da página de introdução |
| `indice` | Itens do índice (título, página, nível de recuo) |
| `paineis[]` | Um item por painel inspecionado: equipamento, medições, fotos, observações |
| `servicos` | Texto de serviços executados + tabela de dispositivos testados |
| `servicosProgramados` | Título, texto e lista de manutenções programadas para o mês seguinte |
| `ocorrencias` | Introdução + lista de atendimentos corretivos (com fotos) |
| `consideracoesGerais` | Textos e tabelas de troubles (inicial/final do mês) |
| `observacoesImportantes[]` | Cards de observações importantes (`type: "alert"` para destaque em vermelho) |
| `responsavelTecnico` | Nome/cargo/empresa exibidos na assinatura final |
| `graficos` | Dados dos gráficos de disponibilidade (por painel e geral) |

### Exportando para PDF

Abra o relatório desejado no seletor da sidebar e use `Ctrl+P` (ou `Cmd+P`) → "Salvar como PDF". O app já tem CSS de `@media print` dedicado que remove a sidebar, ajusta margens para A4 e força quebra de página entre as folhas.

## Estrutura de pastas

```
src/
  App.jsx              layout raiz (sidebar + relatório) e estilos globais de impressão
  main.jsx              bootstrap do React
  data/                 um relatorio-MM-YYYY.json por mês
  pages/
    ReportPage.jsx       monta a sequência de páginas A4 a partir dos dados recebidos por prop
  components/           componentes de apresentação de cada seção do relatório (tabelas, cards, gráficos, sidebar)
public/
  imgs/                  fotos referenciadas pelos JSONs de relatório
```

## Análise técnica

Uma auditoria de arquitetura, achados e recomendações de melhoria está em [Analise.md](Analise.md).
