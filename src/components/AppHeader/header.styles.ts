import styled from "styled-components";

export const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10vh;
  gap: 141px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  background-color: #fefefe;
  position: relative;
  transform: translateZ(0);

  @media screen and (max-width: 768px) {
    gap: 20px;
    justify-content: space-between;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    height: auto;

    & > * {
      margin-bottom: 10px;
    }
  }
`;

export const TitleStyled = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "text.primary",
  paddingLeft: "60px",
};

export const KeyboardArrowDownIconStyled = {
  marginLeft: "22px",
};
