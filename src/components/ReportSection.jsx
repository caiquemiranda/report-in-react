import styled from 'styled-components';

const SectionWrapper = styled.section`
  margin-bottom: 25px;
  page-break-inside: avoid;
`;

const SectionTitle = styled.h4`
  background-color: #333;
  color: white;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 12px;
  text-transform: uppercase;
`;

export const ReportSection = ({ title, children }) => (
  <SectionWrapper>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </SectionWrapper>
);