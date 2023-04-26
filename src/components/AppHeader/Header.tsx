import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Typography, Button, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  HeaderStyled,
  TitleStyled,
  KeyboardArrowDownIconStyled,
} from "./header.styles";
import { useCompany } from "../../contexts/Company/UseCompany";

export const Header = () => {
  const navigate = useNavigate();
  const [selectedLocal, setSelectedLocal] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    handleCompanyLocals,
    companyLocals,
    handleCurrentLocal,
    currentLocal,
  } = useCompany();

  useEffect(() => {
    handleCompanyLocals();
    navigate("/home");
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    localId: number
  ) => {
    setAnchorEl(event.currentTarget);
    handleCurrentLocal(localId);
    setSelectedLocal(localId);
    navigate('/overview');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <HeaderStyled>
      <Typography sx={TitleStyled} variant="h1" component="h1">
        CONNECT LAB
      </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e, currentLocal)}
      >
        {selectedLocal
          ? companyLocals.find((local) => local.id === selectedLocal)?.name
          : "Selecione um local"}
        <KeyboardArrowDownIcon sx={KeyboardArrowDownIconStyled} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {companyLocals.map((item, id) => {
          return (
            <MenuItem
              key={id}
              onClick={(e) => {
                handleClick(e, item.id);
                handleClose();
              }}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </HeaderStyled>
  );
};
