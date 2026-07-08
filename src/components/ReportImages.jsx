import styled from 'styled-components';

const ImagesContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  height: 280px; /* Altura fixa para manter as proporções */
`;

const ImageBox = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  background-image: url(${(props) => props.$bg});
  background-size: cover;
  background-position: center;
`;

export const ReportImages = ({ img1, img2 }) => (
  <ImagesContainer>
    {/* Se não passar URL, fica o fundo cinza claro para testes */}
    <ImageBox $bg={img1} />
    <ImageBox $bg={img2} />
  </ImagesContainer>
);