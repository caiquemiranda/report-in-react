import styled from 'styled-components';

const ObsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-size: 13px;
  color: #000;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ArrowBullet = styled.span`
  font-size: 16px;
  line-height: 1.2;
`;

export const ReportObservations = ({ text }) => (
  <ObsContainer>
    <ArrowBullet>➤</ArrowBullet>
    <p style={{ margin: 0, lineHeight: '1.4' }}>{text}</p>
  </ObsContainer>
);