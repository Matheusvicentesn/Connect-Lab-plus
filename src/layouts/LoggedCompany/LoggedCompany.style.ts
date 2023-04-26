import styled from "styled-components";

export const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainStyled = styled.main`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
