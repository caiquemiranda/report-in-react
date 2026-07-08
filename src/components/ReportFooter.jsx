import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: auto; 
  display: flex;
  justify-content: flex-end; 
  align-items: center; 
  font-size: 13px;
  padding-bottom: 5px;
  font-family: 'Arial', sans-serif;
  color: #64748b; 
`;

// Recebe a prop 'page' que enviamos do map()
export const ReportFooter = ({ page }) => (
  <FooterContainer>
    <div>{page}</div>
  </FooterContainer>
);