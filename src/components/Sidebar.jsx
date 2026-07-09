import styled from 'styled-components';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 240px;
  background: #0f172a;
  color: #ffffff;
  padding: 30px 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);

  @media print {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 4px 0;
  background: linear-gradient(90deg, #17d3d6 0%, #2bb5a3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  font-size: 11px;
  color: #94a3b8;
  margin: 0 0 30px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94a3b8;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: bold;
  color: #0f172a;
  background: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 25px;

  &:focus {
    outline: 2px solid #17d3d6;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #ffffff;
  background: transparent;
  border: 1px solid #2bb5a3;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(43, 181, 163, 0.15);
  }
`;

export const Sidebar = ({ reports, selectedKey, onChange, mode, onCreateNew, onBackToView }) => (
  <SidebarContainer>
    <Title>Relatórios</Title>
    <Subtitle>Manutenção SDAI</Subtitle>

    <Label htmlFor="month-select">Mês do relatório</Label>
    <Select
      id="month-select"
      value={selectedKey}
      onChange={(e) => onChange(e.target.value)}
    >
      {reports.map((report) => (
        <option key={report.key} value={report.key}>
          {report.label}
        </option>
      ))}
    </Select>

    {mode === 'create' ? (
      <CreateButton type="button" onClick={onBackToView}>
        Ver relatório
      </CreateButton>
    ) : (
      <CreateButton type="button" onClick={onCreateNew}>
        + Criar novo relatório
      </CreateButton>
    )}
  </SidebarContainer>
);
