import styled from 'styled-components';

const ImagesContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 0px; /* Zerado para ficar colado na margem da tabela */
  margin-bottom: 12px;
  height: 250px; /* Reduzi um pouco a altura para sobrar mais espaço na folha */
`;

const ImageBox = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-image: url(${(props) => props.$bg});
  background-size: cover;
  background-position: center;
`;

export const ReportImages = ({ img1, img2 }) => (
  <ImagesContainer>
    <ImageBox $bg={img1} />
    <ImageBox $bg={img2} />
  </ImagesContainer>
);