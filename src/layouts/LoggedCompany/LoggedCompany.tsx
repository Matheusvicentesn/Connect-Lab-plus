import { Outlet } from "react-router-dom";
import { Aside } from "../../components/AppAside/Aside";
import { Header } from "../../components/AppHeader/Header";
import { useCompany } from "../../contexts/Company/UseCompany";
import { Home } from "../../pages/Home/Home";
import { DivStyled, MainStyled } from "./LoggedCompany.style";

const LoggedCompany = () => {
  const { currentLocal } = useCompany();

  return (
    <>
      <Header />
      <DivStyled >
        <Aside />
        <MainStyled>{currentLocal === 0 ? <Home /> : <Outlet />}</MainStyled>
      </DivStyled>
    </>
  );
};

export default LoggedCompany;
