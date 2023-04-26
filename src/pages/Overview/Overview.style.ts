import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  justify-content: center;
  height: 90vh;
  padding-left: 50px;
  gap: 30px;
  overflow-y: auto;

  @media screen and (max-width: 960px) {
    height: auto;
    padding: 0;
  }
`;

export const ContainerMapStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 90vh;
  padding-left: 50px;
  gap: 30px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`;

export const BoxesRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex-grow: 1;
    margin-right: 16px;
    margin-bottom: 16px;
    max-width: calc(50% - 16px);
  }

  & > *:nth-child(even) {
    margin-right: 0;
  }

  @media screen and (max-width: 600px) {
    & > * {
      flex-basis: 100%;
      margin-right: 0;
      max-width: 100%;
    }
  }
`;

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 250px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  padding: 16px;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

export const BoxValueContainer = {
  display: "flex",
  gap: "10px",
};

export const BoxValueChildren = {
  display: "flex",
  flexDirection: "column",
};

export const TempStyle = {
  fontSize: "10px",
};

export const ContainerMiddle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "20px",
  paddingTop: "30px",

  "@media screen and (max-width: 960px)": {
    gridTemplateColumns: "1fr",
    gap: 0,
    padding: 0,
  },
};

export const ImgStyle = {
  width: "50px",
  height: "50px",
};
