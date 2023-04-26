import styled from "styled-components";

export const BoxContainerStyled = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
}

export const PageStyled = styled.div`
  background-color: #F0F0F0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BoxStyled = {
  width: "480px",
  minHeight: "70vh",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "10px",
  paddingBottom:"10px",
  backgroundColor: "#FFFFFF",
  position: "relative"
};

export const BoxTitleStyled = {
  display: "flex",
  flexDirection:"column",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
  mt: 1,
};

export const TitleStyled = {
  fontSize: "24px",
  color: "text.primary",
  fontWeight: "bold",
};

export const InfoStyled = {
  fontSize: "16px",
  color: "text.secondary",
  marginTop: "12px",
  marginBottom: "12px",
  textAlign: "center",
  padding: "8px"
};

export const ArrowBackStyled = {
  color: "text.primary",
  marginLeft: "-320px",
};

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 352px;
  height: 100%;
  gap: 35px;
  overflow: hidden;
  padding-top: 6px;
`;

export const ColumnFormStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;

`;

export const TextFieldStyled = {
  width: "100%",
  height: "43px",
  borderRadius:"6px",
};

export const TextFielColumndStyled = {
  width: "170px",
  height: "43px",
  marginBottom: "20px",

};

export const ButtonStyled = {
  width: "352px",
  height: "43px",
  marginBottom: "10px",
  color: "#FFFFFF"
};

export const BottomBoxStyled = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
  mt: 1,
};