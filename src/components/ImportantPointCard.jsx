import styled from 'styled-components';

const Card = styled.div`
  background-color: #ffffff;
  border-left: 5px solid ${(props) => props.$type === 'alert' ? '#e53e3e' : '#2bb5a3'};
  border-right: 1px solid #e2e8f0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  page-break-inside: avoid;
`;

const CardTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.$type === 'alert' ? '#e53e3e' : '#2bb5a3'};
  text-transform: uppercase;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: #4a5568;
`;

export const ImportantPointCard = ({ title, text, type }) => (
  <Card $type={type}>
    {title && <CardTitle $type={type}>{title}</CardTitle>}
    <CardText>{text}</CardText>
  </Card>
);