import styled from 'styled-components';

export const FormPage = styled.div`
  width: 100%;
  max-width: 780px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 30px 40px 50px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  color: #0f172a;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
`;

export const FormTitle = styled.h1`
  font-size: 20px;
  margin: 0 0 4px 0;
`;

export const FormHint = styled.p`
  font-size: 12px;
  color: #64748b;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

export const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  gap: 12px;
  align-items: end;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e2e8f0;
`;

export const Section = styled.section`
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const SubSection = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #2bb5a3;
  margin: 0 0 16px 0;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr 140px;
  gap: 12px;
  align-items: start;
  margin-bottom: 14px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #334155;
  padding-top: 8px;
`;

const inputBase = `
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  font-size: 13px;
  font-family: 'Arial', sans-serif;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  color: #0f172a;
  background: #ffffff;

  &:disabled {
    background: #f1f5f9;
    color: #64748b;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`${inputBase}`;

export const Textarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: ${(props) => props.$rows === 'small' ? '38px' : '80px'};
`;

export const LockSelect = styled.select`
  ${inputBase}
  cursor: pointer;
  font-size: 12px;
`;

export const ItemCard = styled.div`
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 12px;
  background: #f8fafc;
`;

export const ItemCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ItemLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #64748b;
  text-transform: uppercase;
`;

export const SmallButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => (props.$variant === 'danger' ? '#fee2e2' : '#e0f7f5')};
  color: ${(props) => (props.$variant === 'danger' ? '#dc2626' : '#0f766e')};

  &:disabled {
    background: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const AddButton = styled(SmallButton)`
  margin-top: 4px;
`;

export const GenerateButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(90deg, #17d3d6 0%, #2bb5a3 100%);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SuccessMessage = styled.p`
  font-size: 12px;
  color: #0f766e;
  background: #e0f7f5;
  padding: 10px 14px;
  border-radius: 4px;
  margin-top: 14px;
`;
