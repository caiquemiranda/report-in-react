const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// Descobre automaticamente todo arquivo "relatorio-MM-YYYY.json" salvo em src/data.
// Basta adicionar um novo arquivo seguindo esse padrão para ele aparecer no seletor.
const modules = import.meta.glob('./relatorio-*.json', { eager: true, import: 'default' });

const FILENAME_PATTERN = /relatorio-(\d{2})-(\d{4})\.json$/;

export const reports = Object.entries(modules)
  .map(([path, data]) => {
    const match = path.match(FILENAME_PATTERN);
    if (!match) return null;

    const [, month, year] = match;
    const monthIndex = Number(month) - 1;

    return {
      key: `${month}-${year}`,
      sortKey: `${year}${month}`,
      label: `${MESES[monthIndex] ?? month} de ${year}`,
      data,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
