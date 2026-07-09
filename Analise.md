# Análise do Projeto — report-in-react

> Auditoria de arquitetura, pastas, componentes e dados. Este documento é só diagnóstico — nenhuma mudança de código foi feita a partir dele (as mudanças feitas nesta sessão foram para a feature de seleção de mês, pedida separadamente, e estão descritas na seção final).

## 1. O que o projeto é hoje

Uma SPA (Vite + React 19 + styled-components + recharts) que renderiza um **relatório mensal de manutenção** (sistema de detecção e alarme de incêndio, cliente Bridgestone/IBSystems) como uma sequência de páginas A4, pensada para ser impressa/exportada em PDF pelo `Ctrl+P` do navegador (há CSS de `@media print` dedicado em [App.jsx](src/App.jsx)).

Não há rotas, não há build de múltiplas telas, não há chamada de API: é essencialmente um **template de documento** onde o conteúdo vem de um arquivo JSON estático importado em tempo de build.

### Stack
- **Vite 8** + **React 19**
- **styled-components 6** para toda a estilização (nenhum CSS externo é usado de fato — ver achado 6)
- **recharts** para os 2 gráficos de disponibilidade
- Sem TypeScript, sem testes, sem roteador, sem gerenciador de estado

### Fluxo de dados atual
```
src/data/relatorio-02-2025.json  →  import estático em ReportPage.jsx  →  JSX
```
Um único arquivo JSON, importado no topo do módulo, cujos campos são espalhados por ~15 componentes de apresentação.

## 2. Mapa de pastas

```
src/
  App.jsx                 wrapper + estilos globais de impressão
  main.jsx                bootstrap do React
  App.css                 vazio (0 bytes) e não importado por ninguém
  index.css               vazio (0 bytes), importado por main.jsx
  assets/                 logo.png (usado) + hero.png, react.svg, vite.svg (não usados)
  data/
    relatorio-02-2025.json   único relatório existente hoje
  pages/
    ReportPage.jsx          ~310 linhas — monta a sequência inteira de páginas do relatório
  components/              16 arquivos, todos "folha única" (sem subpastas)
public/
  favicon.svg, icons.svg (não usado)
  imgs/panels/..., imgs/occurrence/...   fotos referenciadas pelo JSON
```

Não há aninhamento em `components/` (ex.: `report/`, `charts/`, `shared/`) — tudo fica num único nível, o que hoje ainda é gerenciável (16 arquivos) mas não escala bem se o relatório ganhar mais seções.

## 3. Achados críticos (afetam corretude/manutenção)

### 3.1 Dado estático acoplado ao módulo — bloqueava qualquer seleção dinâmica
`ReportPage.jsx` fazia `import reportData from '../data/relatorio-02-2025.json'` no topo do arquivo. Isso amarra o relatório exibido ao arquivo importado em **build time**: não existia nenhum jeito de trocar de mês em runtime sem editar código e recompilar. Essa foi a causa raiz que impedia a feature de seleção de mês pedida — **corrigido nesta sessão** (ver seção 6), mas registro aqui porque é o tipo de acoplamento que vale evitar em qualquer nova tela do projeto.

### 3.2 Destructure duplicado do mesmo objeto (duas fontes de verdade)
O arquivo desestruturava `reportData` **duas vezes**: uma vez no escopo do módulo (linhas 22–30) e de novo dentro do componente (linha 83) — só que com listas de campos diferentes. `consideracoesGerais` e `graficos` só existiam na desestruturação de módulo; todo o resto vinha da desestruturação local. Ou seja, remover "a desestruturação que parecia não usada" quebraria silenciosamente as duas últimas páginas do relatório. Isso já foi eliminado no refactor da seção 6 (agora há uma única fonte: a prop `data`).

### 3.3 Conteúdo fixo no código, não no JSON (quebrava a promessa de "relatório por mês")
Diferente do resto do relatório (100% orientado a dados), três blocos vinham **hardcoded em JSX**:
- Os dois parágrafos de "Considerações Gerais" (texto sobre 41 troubles no início do mês / 12 no final);
- Os 5 cards de "Observações Importantes" (Disponibilidade, TSW, Silos, Base 4:M1-116, Cronograma de visitas — com datas específicas de fevereiro: "04, 05, 06, 17, 18, 24, 25 e 26/02");
- O bloco de assinatura final ("IGOR ANDRADE CASTRO / RESPONSÁVEL TÉCNICO").

Como esse texto é específico de fevereiro/2025 mas estava fixo no componente, **selecionar outro mês não mudaria essas duas páginas** — o relatório ficaria parcialmente "preso" em fevereiro. Migrado para o JSON nesta sessão (seção 6) para a feature funcionar de ponta a ponta.

## 4. Achados importantes (dívida técnica, não bloqueiam nada hoje)

### 4.1 Componente duplicado / código morto
[`OccurrenceCard.jsx`](src/components/OccurrenceCard.jsx) é uma cópia completa e **nunca importada** — `ReportPage.jsx` usa o `OccurrenceCard` exportado por [`OccurrenceSection.jsx`](src/components/OccurrenceSection.jsx), que tem sua própria versão (com paginação de fotos e `DraggableImage`, mais completa). O arquivo solto é órfão e pode ser removido com segurança.

### 4.2 Dependência fantasma no `package.json`
Existe `"reacharts": "^0.4.5"` nas dependências — um pacote diferente de `recharts` (que é o realmente usado em todo o código). Não há nenhum `import` de `reacharts` em `src/`. Parece resíduo de um typo que nunca foi removido.

### 4.3 Arquivos não referenciados
- `src/App.css` — 0 bytes, e nem é importado em `App.jsx`.
- `src/index.css` — 0 bytes, importado por `main.jsx` mas sem efeito (arquivo vazio).
- `src/assets/hero.png`, `react.svg`, `vite.svg` — não aparecem em nenhum `import`.
- `public/icons.svg` — não referenciado por nenhum componente.

### 4.4 Duplicação pesada de estilos entre componentes
O padrão `TitleBox` / `TitleText` (borda 3px `#2bb5a3`, texto uppercase 16px bold) é **redefinido, quase byte-a-byte, em 6 arquivos diferentes**: `IntroductionSection`, `ScheduledServices`, `TeamSection`, `ServicesSection`, `GeneralConsiderations`, `OccurrenceSection`. O mesmo vale para o gradiente de marca `linear-gradient(90deg, #17d3d6 0%, #2bb5a3 100%)` usado em cabeçalhos de tabela (`EquipmentTable`, `DevicesTable`, `ServicesSection`) e para a cor `#2bb5a3`/`#17d3d6`/`#cbd5e1` espalhada como string mágica em praticamente todo componente.

Uma melhoria de baixo risco e alto retorno seria centralizar isso em:
- um pequeno `src/styles/theme.js` (cores/gradiente da marca como constantes), e
- um `src/components/shared/SectionTitle.jsx` reaproveitável para o padrão `TitleBox`+`TitleText`.

Isso reduziria ~6 blocos de CSS idênticos para 1, sem alterar nenhum pixel do resultado visual.

### 4.5 `OccurrenceSection.jsx` concentra responsabilidades demais
O arquivo define, num único lugar: o título da seção, o card de ocorrência, **e** um componente de imagem arrastável com estado próprio (`DraggableImage`, com handlers de mouse para pan de imagem). É o único componente do projeto com lógica interativa real (`useState`, eventos de mouse) — vale a pena estar em `DraggableImage.jsx` próprio, para não ficar escondido dentro de um arquivo cujo nome sugere só "seção de ocorrências".

### 4.6 Lógica de paginação vive dentro do componente de página
As duas funções de paginação em `ReportPage.jsx` — o corte da tabela de dispositivos em `FIRST_PAGE_LIMIT`/`NEXT_PAGES_LIMIT` e `paginateOccurrences` (corte de fotos de 6 em 6) — são funções puras, sem nenhuma dependência de React. Hoje vivem misturadas no corpo do componente de página. Extrair para `src/utils/pagination.js` deixaria `ReportPage.jsx` mais enxuto e essa lógica testável isoladamente (hoje não há nenhum teste no projeto).

## 5. Achados menores / observações sobre os dados

- `servicosProgramados.titulo` e o item de índice correspondente dizem **"FEVEREIRO 2024"**, enquanto o resto do relatório (introdução, ocorrências) é claramente sobre **fevereiro de 2025** — provável erro de digitação copiado de um relatório anterior.
- Os campos `id` (`"relatorio-12345"`) e `dataEmissao` (`"12/06/2020"`) existem no JSON mas **não são consumidos por nenhum componente** — campos mortos no schema.
- A tabela `servicos.dispositivosTestados` tem ~20 linhas com `point`/`node`/`local` idênticos (`2:M1-118-0`, node `2`, `DT09`) — parecem dados de preenchimento/placeholder, não dados reais; vale conferir antes de considerar este JSON como modelo definitivo para os próximos meses.
- O terceiro painel (`SIMPLEX 4010ES / PN-06`) tem `metadata.serial: "PN-05"` — mesmo serial do painel anterior. Como `ReportPage.jsx` usa `painel.metadata.serial` como `key` no `.map()`, isso gera o aviso `Encountered two children with the same key` no console do React (confirmado ao rodar o app). Provável copy-paste esquecido ao criar o painel PN-06; vale corrigir o serial no JSON.
- Os caminhos de imagem em `public/imgs/panels/...` e `public/imgs/occurrence/...` **não são namespaced por mês** (ex.: `pn-04`, `oc-226` são globais). Com múltiplos meses reutilizando os mesmos `id`s de painel/ocorrência mas fotos diferentes, os caminhos colidiriam. Ver recomendação na seção 6.
- `docker-compose.yml` roda `npm install && npm run dev` toda vez que o container sobe — funciona, mas reinstala dependências a cada `docker-compose up`; um volume nomeado para `node_modules` (ou build de imagem) evitaria isso, é só um ganho de velocidade de iteração.

## 6. O que foi implementado nesta sessão (feature pedida: seleção de mês)

Para viabilizar a sidebar com select de mês, os achados 3.1–3.3 tiveram que deixar de ser só "achados" e virar mudanças reais, porque sem elas a feature não funcionaria de ponta a ponta:

1. **`ReportPage` passou a receber `data` via prop** em vez de importar o JSON diretamente — elimina o acoplamento do achado 3.1 e a duplicidade do achado 3.2.
2. **Textos fixos migrados para o JSON**: `consideracoesGerais.textoInicial/textoFinal`, novo array `observacoesImportantes[]` e novo objeto `responsavelTecnico` — com o texto idêntico ao que já existia, então fevereiro/2025 continua igual visualmente. Isso resolve o achado 3.3: qualquer mês novo pode ter seu próprio texto.
3. **Descoberta automática de relatórios** via `import.meta.glob` sobre `src/data/relatorio-*.json` — adicionar um novo mês é só soltar um novo arquivo `relatorio-MM-YYYY.json` na pasta, sem tocar em código.
4. **Sidebar nova** com `<select>` dos meses disponíveis, oculta em `@media print` (não aparece no PDF exportado).

### O que **não** foi alterado (fica registrado como dívida, não decisão)
Os achados 4.x e 5.x (código morto, dependência `reacharts`, estilos duplicados, `DraggableImage` dentro de `OccurrenceSection`, namespacing de imagens por mês, ano errado em "FEVEREIRO 2024") seguem exatamente como estavam — não foram tocados por não fazerem parte do pedido de seleção de mês. Ficam como próximos passos recomendados, em ordem de custo/benefício:

1. Remover `OccurrenceCard.jsx`, `App.css`, assets não usados e a dependência `reacharts` (risco zero, benefício imediato de clareza).
2. Corrigir "FEVEREIRO 2024" → "FEVEREIRO 2025" no JSON.
3. Decidir uma convenção de pastas de imagem por mês (ex.: `public/imgs/2025-02/panels/...`) antes de criar o segundo mês de dados, para evitar colisão de fotos entre relatórios.
4. Extrair `SectionTitle` compartilhado e `theme.js` para eliminar a duplicação de estilos do achado 4.4.
5. Mover `DraggableImage` para seu próprio arquivo e extrair as funções de paginação para `src/utils/`.
