import styled from "styled-components";


export const AsideStyled = styled.div `
    width: 25vw;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    background-color: #F9FAFB;   
`
export const AsideHeader = styled.div `
    min-height: 20vh;
    display: flex;
    align-items: center;
    padding-left: 60px  
`
export const MenuItemsContainer = styled.div`
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 60px;
`
export const MenuTitleStyled = {
    color: "text.secondary"
}
export const LogoutButtonContainer = styled.div`
    margin-top: 120px;
`