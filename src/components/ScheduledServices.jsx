import styled from 'styled-components';

const SectionWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  color: #000;
  padding: 10px 20px;
`;

const TitleBox = styled.div`
  border: 3px solid #2bb5a3; /* Cor da identidade visual IBSystems */
  padding: 8px;
  text-align: center;
  margin-bottom: 30px;
`;

const TitleText = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
`;

const IntroText = styled.p`
  font-size: 13px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 13px;
  margin-bottom: 10px;
  &::before {
    content: "- ";
  }
`;

export const ScheduledServices = ({ data }) => {
  return (
    <SectionWrapper>
      <TitleBox>
        <TitleText>{data.titulo}</TitleText>
      </TitleBox>
      
      <IntroText>{data.introducao}</IntroText>
      
      <List>
        {data.itens.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </SectionWrapper>
  );
};