import styled from "styled-components";

export const BoxContainerStyled = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  gap: "50px",
};

export const BoxHeaderStyled = styled.div`
  padding: 60 0 60 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 300px;
  align-items: center;
`;

export const TitleStyled = {
  fontSize: "22px",
  color: "text.primary",
  marginBottom: "8px",
};

export const InfoStyled = {
  fontSize: "16px",
  color: "text.secondary",
  marginBottom: "40px",
};

export const FormStyled = styled.form`
  background-color: "yellow";
`;

export const TextFieldStyled = {
  width: "499px",
  fontSize: "16px",
  marginBottom: "35px",
};

export const ButtonStyled = (color: string) => {
  return {
    width: "245px",
    height: "51px",
    backgroundColor: color,
    color: "#FFFFFF"
  };
};

export const BoxButtonstyled = {
  display: "flex",
  justifyContent: "space-between",
  width: "499px",
};

export const RowButtonStyled = {
  backgroundColor: "background.transparent",
  color: "yellow",
};

export const GridIconStyled = (color: string) => {
  return {
    color: color,
  };
};

export const LocalTitleStyle = {
  fontSize: "20px",
  margin: "23px",
};

export const SearchStyle = {
  width: "214px",
  heigh: "19px",
  fontSize: "16px",
  padding: "0",
  paddingLeft: "5px",  
};

export const SearchBarContainer = styled.div`
  margin-left: 23px
`

export const NewLocalButtonStyle = {
  width: "166px",
  heigh: "41px",
  color: "background.default",
  marginRight: "60px",
};


