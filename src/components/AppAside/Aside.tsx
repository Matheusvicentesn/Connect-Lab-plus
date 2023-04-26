import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  AsideHeader,
  AsideStyled,
  LogoutButtonContainer,
  MenuItemsContainer,
  MenuTitleStyled,
} from "./aside.styles";
import { useCompany } from "../../contexts/Company/UseCompany";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Aside = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const {
    handleCompanyLocals,
    handleGetAllCompanyDevices,
    currentLocal,
    handleProfile,
    profileData,
  } = useCompany();

  useEffect(() => {}, [profileData]);

  const handleLocalPage = () => {
    handleCompanyLocals();
    navigate("/locals");
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/signin");
  };

  const handleOverview = async () => {
    await handleCompanyLocals();
    navigate("/overview");
  };

  const handleConfig = async () => {
    await handleProfile();
    navigate("/profile");
  };
  const handleSensors = async () => {
    if (currentLocal > 0) {
      await handleGetAllCompanyDevices(currentLocal);
      return;
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alerta"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#313131" }}
          >
            Selecione um local no menu acima
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <AsideStyled>
        <AsideHeader>
          <Typography variant="h2" fontWeight={600} fontSize={22}>
            {profileData.name}
          </Typography>
        </AsideHeader>
        <MenuItemsContainer>
          <Typography variant="subtitle1" marginLeft={-3} sx={MenuTitleStyled}>
            Menu
          </Typography>

          <Button onClick={() => handleOverview()}>Overview</Button>
          <Button onClick={() => handleSensors()}>Sensores</Button>
          <Button onClick={() => handleLocalPage()}>Locais</Button>
          <Button onClick={() => handleConfig()}>Configurações</Button>

          <LogoutButtonContainer>
            <Button
              onClick={() => handleLogout()}
              variant="contained"
              color="secondary"
              sx={{ color: "#FFFFFF" }}
            >
              Logout
            </Button>
          </LogoutButtonContainer>
        </MenuItemsContainer>
      </AsideStyled>
    </>
  );
};
