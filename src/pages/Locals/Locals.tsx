import { SetStateAction, useEffect, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useCompany } from "../../contexts/Company/UseCompany";
import { CustomDataGrid } from "../../components/DataGrid/DataGrid";
import { CustomModal } from "../../components/Modal/Modal";
import { useFormik } from "formik";
import {
  BoxButtonstyled,
  BoxContainerStyled,
  BoxHeaderStyled,
  ButtonStyled,
  FormStyled,
  InfoStyled,
  TextFieldStyled,
  TitleStyled,
  RowButtonStyled,
  GridIconStyled,
  LocalTitleStyle,
  SearchStyle,
  NewLocalButtonStyle,
  SearchBarContainer,
} from "./Locals.style";
import { createCompanyLocalSchema } from "../../validations/createCompanyLocalValidation";
import { GridDeleteIcon } from "@mui/x-data-grid";
import {
  CompanyLocalData,
  UpdateCompanyLocal,
} from "../../validations/validation.interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from '@mui/icons-material/Search';

export const Locals = () => {
  const {
    companyLocals,
    error,
    handleError,
    handleCreateCompanyLocal,
    handleCompanyLocals,
    handleUpdateCompanyLocal,
    handleDeleteCompanyLocal,
  } = useCompany();
  const [search, setSearch] = useState("");
  const [newLocal, setNewLocal] = useState<boolean>(false);
  const [localSelected, setLocalSelected] = useState<number>(0);
  const [local, setLocal] = useState<string>("");

  const [formValues, setFormValues] = useState<CompanyLocalData>({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleOpenInfo = () => {
    setFormValues({
      name: "",
      latitude: 0,
      longitude: 0,
    });
    setNewLocal(true);
    if (!openInfo) {
      setOpenInfo(true);
    }
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleDeleteForever = async () => {
    await handleDeleteCompanyLocal(localSelected);
    await handleCompanyLocals();
    setDialogOpen(false);
  };

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const filteredLocals = companyLocals.filter((local) =>
    local.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {}, [companyLocals.length]);
  useEffect(() => {
    formik.setValues({
      name: formValues.name,
      latitude: formValues.latitude,
      longitude: formValues.longitude,
    });
  }, [formValues]);

  const handleDelete = (id: number) => {
    setDialogOpen(true);
    setLocalSelected(id);
  };

  const handleEdit = (id: number) => {
    setLocalSelected(id);
    setOpenInfo(true);
    setNewLocal(false);
    const local = companyLocals.find((local) => local.id === id);
    if (local) {
      setLocal(local.name);
    }

    setFormValues(
      local
        ? {
            name: local.name,
            latitude: local.latitude,
            longitude: local.longitude,
          }
        : {
            name: "",
            latitude: 0,
            longitude: 0,
          }
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nome", width: 250, editable: false },
    {
      field: "latitude",
      headerName: "Latitude",
      type: "number",
      width: 150,
      editable: false,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "sensors",
      headerName: "Sensores",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params: any) => (
        <Button
          sx={{
            RowButtonStyled,
          }}
          onClick={() => handleEdit(params.row.id)}
        >
          <UpgradeIcon sx={GridIconStyled("primary.warn")} />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 90,
      renderCell: (params: any) => (
        <Button
          sx={{
            RowButtonStyled,
          }}
          startIcon={<GridDeleteIcon sx={GridIconStyled("primary.error")} />}
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: formValues.name,
      latitude: formValues.latitude,
      longitude: formValues.longitude,
    },
    validationSchema: createCompanyLocalSchema,
    onReset: () => {
      handleCloseInfo();
    },
    onSubmit: async (body: UpdateCompanyLocal | CompanyLocalData) => {
      if (newLocal) {
        await handleCreateCompanyLocal(body);
        setNewLocal(false);
      } else {
        let newBody: UpdateCompanyLocal = {};
        if (body.name === local) {
          newBody.latitude = body.latitude;
          newBody.longitude = body.longitude;
        }else{
          newBody = body;
        }       
        await handleUpdateCompanyLocal(newBody, localSelected);
      }

      await handleCompanyLocals();
      if (!error) {
        handleCloseInfo();
      }
    },
  });

  return (
    <Box>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Alerta
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: "#313131"}}>
            Deseja realmente excluir o Local?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Não
          </Button>
          <Button onClick={handleDeleteForever}>Sim</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h3" gutterBottom sx={LocalTitleStyle}>
        Locais
      </Typography>
      <BoxHeaderStyled>

        <SearchBarContainer>
        <SearchIcon />
         <TextField
           variant="standard"
           inputProps={{ style: SearchStyle }}
           onChange={handleSearch}
           placeholder="Digite a palavra chave..."
         />
        </SearchBarContainer>

        <Button
          onClick={handleOpenInfo}
          variant="contained"
          color="primary"
          sx={NewLocalButtonStyle}
        >
          Novo Local
        </Button>
      </BoxHeaderStyled>
      <CustomDataGrid rows={filteredLocals} columns={columns} />
      <CustomModal
        open={openInfo}
        close={handleCloseInfo}
        height={505}
        width={563}
      >
        <>
          {error ? (
            <Alert severity="error">
              Erro ao criar o local. Tente novamente!
            </Alert>
          ) : (
            ""
          )}
          <Box>
            <Box sx={BoxContainerStyled}>
              <Typography sx={TitleStyled} variant="h2" component="div">
                {newLocal ? "Criar Local" : "Editar Local"}
              </Typography>
            </Box>
            <Typography sx={InfoStyled} component="div">
              {newLocal
                ? "Adicionar um local a uma empresa"
                : "Editar local da empresa"}
            </Typography>

            <FormStyled onSubmit={formik.handleSubmit}>
              <TextField
                sx={TextFieldStyled}
                fullWidth
                id="name"
                name="name"
                label="Nome"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onClick={() => handleError()}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                sx={TextFieldStyled}
                fullWidth
                id="latitude"
                name="latitude"
                label="Latitude"
                type="number"
                inputProps={{ step: 0.0001 }}
                value={formik.values.latitude}
                onChange={(e) => {
                  formik.setFieldValue("latitude", Number(e.target.value));
                }}
                onClick={() => handleError()}
                error={
                  formik.touched.latitude && Boolean(formik.errors.latitude)
                }
                helperText={formik.touched.latitude && formik.errors.latitude}
              />
              <TextField
                sx={TextFieldStyled}
                fullWidth
                id="longitude"
                name="longitude"
                label="Longitude"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 0.000001,
                  min: -90,
                  max: 90,
                  pattern: "^[-+]?([0-9]|[1-8][0-9])(\\.\\d{1,6})?$",
                }}
                value={formik.values.longitude}
                onChange={(e) => {
                  formik.setFieldValue("longitude", Number(e.target.value));
                }}
                onClick={() => handleError()}
                error={
                  formik.touched.longitude && Boolean(formik.errors.longitude)
                }
                helperText={formik.touched.longitude && formik.errors.longitude}
              />
              <Box sx={BoxButtonstyled}>
                <Button
                  onClick={() => handleCloseInfo()}
                  sx={ButtonStyled("primary.warn")}
                  variant="contained"
                  type="reset"
                >
                  Cancelar
                </Button>
                <Button
                  sx={ButtonStyled("primary.main")}
                  variant="contained"
                  type="submit"
                >
                  Salvar
                </Button>
              </Box>
            </FormStyled>
          </Box>
        </>
      </CustomModal>
    </Box>
  );
};
