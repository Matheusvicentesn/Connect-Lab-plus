import { SetStateAction, useEffect, useState } from "react";
import { CustomDataGrid } from "../../components/DataGrid/DataGrid";
import { useCompany } from "../../contexts/Company/UseCompany";
import { GridColDef } from "@mui/x-data-grid";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { GridDeleteIcon } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomModal } from "../../components/Modal/Modal";
import {
  BoxButtonstyled,
  BoxContainerStyled,
  ButtonStyled,
  FormStyled,
  GridIconStyled,
  InfoStyled,
  SelectStyled,
  TextFieldStyled,
  TitleStyled,
  RowButtonStyled,
  SearchStyle,
  NewSensorButtonStyle,
  BoxHeaderStyled,
} from "./Sensors.style";
import { useFormik } from "formik";
import { createCompanyDeviceSchema } from "../../validations/createCompanyDeviceValidation";
import { CompanyDeviceData } from "../../validations/validation.interfaces";
import { UpdateBody } from "../../services/api/api.interface";
import { UpdateQueryParams } from "../../services/api/api.interface";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteCompanyDevice } from "../../contexts/Company/Company.interfaces";

import { SearchBarContainer } from "../Sensors/Sensors.style";
import SearchIcon from '@mui/icons-material/Search';



import { LocalTitleStyle } from "../Locals/Locals.style";

export const Sensors = () => {
  const {
    companyDevices,
    error,
    devicesAvailable,
    handleError,
    handleAddDeviceToCompany,
    currentLocal,
    handleGetAllCompanyDevices,
    handleDevicesAvailable,
    handleUpdateCompanyDevice,
    handleDeleteCompanyDevice,
  } = useCompany();

  const [search, setSearch] = useState<string>("");
  const [deviceId, setDeviceId] = useState<number>(0);
  const [openInfo, setOpenInfo] = useState(false);
  const [status, setStatus] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deviceSelected, setDeviceSelected] = useState<any>(0);
  const [newDevice, setNewDevice] = useState<boolean>(false);
  const [chosenDevice, setChosenDevice] = useState<number>(0);
  const [formValues, setFormValues] = useState<CompanyDeviceData>({
    macAddress: "",
    deviceId: 0,
    status: true,
    nickname: "",
  });
  const [body, setBody] = useState<DeleteCompanyDevice>({
    companyLocalId: 0,
    deviceId: 0,
  });

  useEffect(() => {
    handleDevicesAvailable();
    handleGetAllCompanyDevices(currentLocal);
  }, [companyDevices.length, devicesAvailable.length]);

  useEffect(() => {
    formik.setValues({
      deviceId: formValues.deviceId,
      macAddress: formValues.macAddress,
      nickname: formValues.nickname,
      status: formValues.status,
    });
  }, [formValues]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteForever = async () => {
    await handleDeleteCompanyDevice(body);
    await handleGetAllCompanyDevices(currentLocal);
    await handleDevicesAvailable();
    setDialogOpen(false);
  };

  const handleOpenInfo = () => {
    setFormValues({
      macAddress: "",
      deviceId: 0,
      status: true,
      nickname: "",
    });
    setNewDevice(true);
    if (!openInfo) {
      setOpenInfo(true);
    }
    setChosenDevice(0);
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const filteredLocals = companyDevices.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeviceId = (event: any) => {
    setDeviceId(event.target.value);
  };

  const handleStatus = (event: any) => {
    setStatus(event.target.value);
  };

  const handleDevice = (name: any) => {
    if (typeof name === "string") {
      const device = devicesAvailable.find(
        (device) => device.name.toUpperCase() === name.toUpperCase()
      );
      const cmpDevice = companyDevices.find(
        (device) => device.name.toUpperCase() === name.toUpperCase()
      );

      if (device && cmpDevice) {
        setFormValues({
          deviceId: device.id,
          macAddress: cmpDevice.macAddress,
          nickname: cmpDevice.nickname,
          status: cmpDevice.status,
        });
        return device.id;
      }
    }
    return 0;
  };

  const handleDelete = (id: number) => {
    setDialogOpen(true);
    setDeviceSelected(id);
    setBody({
      companyLocalId: currentLocal,
      deviceId: id,
    });
  };

  const handleEdit = (id: number) => {
    setOpenInfo(true);
    setNewDevice(false);
    const device = companyDevices.find((device) => device.id === id);
    setFormValues(
      device
        ? {
            deviceId: device.id,
            macAddress: device.macAddress,
            nickname: device.nickname,
            status: device.status ? true : false,
          }
        : {
            macAddress: "",
            deviceId: 0,
            status: true,
            nickname: "",
          }
    );
    if (typeof device?.name === "string") {
      setDeviceSelected(handleDevice(device.name));
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nome",
      width: 250,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Data da vinculação",
      width: 150,
      editable: true,
    },
    {
      field: "macAddress",
      headerName: "Endereço MAC",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Estado",
      type: "boolean",
      width: 110,
      editable: true,
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
      macAddress: formValues.macAddress,
      deviceId: formValues.deviceId,
      status: formValues.status,
      nickname: formValues.nickname,
    },
    validationSchema: createCompanyDeviceSchema,
    onReset: () => {
      handleCloseInfo();
    },
    onSubmit: async (body: any) => {
      if (newDevice) {
        body.deviceId = deviceId;
        body.status = status ? true : false;
        await handleAddDeviceToCompany(body, currentLocal);
      } else {
        const newBody: UpdateBody = { status: true, nickname: "" };
        newBody.status = body.status = status ? true : false;
        newBody.nickname = body.nickname;

        const dvc = devicesAvailable.find(
          (device) => device.id === deviceSelected
        );
        const id = companyDevices.find(
          (device) => dvc && device.name.toUpperCase() === dvc.name.toUpperCase()
        );

        if (id) {
          const query: UpdateQueryParams = {
            deviceID: id.id,
            localID: currentLocal,
          };

          await handleUpdateCompanyDevice(newBody, query);
        }
      }
      await handleDevicesAvailable();
      await handleGetAllCompanyDevices(currentLocal);
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
            Deseja realmente excluir o sensor?
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
        Sensores
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
          sx={NewSensorButtonStyle}
        >
          Novo Sensor
        </Button>
      </BoxHeaderStyled>    

      <CustomDataGrid rows={filteredLocals} columns={columns} />
      <CustomModal
        open={openInfo}
        close={handleCloseInfo}
        height={648}
        width={563}
      >
        <>
          {error ? (
            <Alert severity="error">
              Erro ao criar o sensor. Tente novamente!
            </Alert>
          ) : (
            ""
          )}
          <Box>
            <Box sx={BoxContainerStyled}>
              <Typography sx={TitleStyled} variant="h2" component="div">
                {newDevice ? "Vincular Sensor" : "Editar Sensor"}
              </Typography>
            </Box>
            <Typography sx={InfoStyled} component="div">
              {newDevice
                ? "Vincular um novo sensor ao local"
                : "Editar o sensor de um local"}
            </Typography>

            <FormStyled onSubmit={formik.handleSubmit}>
              <InputLabel id="device">Dispositivo</InputLabel>
              <Select
                sx={SelectStyled}
                labelId="device"
                id="device"
                value={newDevice ? chosenDevice : deviceSelected}
                disabled={newDevice ? false : true}
                onChange={(e) => handleDeviceId(e)}
              >
                {devicesAvailable.map((device) => {
                  return (
                    <MenuItem
                      onClick={() => setChosenDevice(device.id)}
                      key={device.id}
                      value={device.id}
                    >
                      {device.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                sx={TextFieldStyled}
                fullWidth
                id="nickname"
                name="nickname"
                label="Nome"
                type="text"
                value={formik.values.nickname}
                onChange={formik.handleChange}
                onClick={() => handleError()}
                error={
                  formik.touched.nickname && Boolean(formik.errors.nickname)
                }
                helperText={formik.touched.nickname && formik.errors.nickname}
              />
              <TextField
                sx={TextFieldStyled}
                fullWidth
                id="macAddress"
                name="macAddress"
                label="Endereço MAC"
                type="text"
                disabled={newDevice ? false : true}
                value={formik.values.macAddress}
                onChange={formik.handleChange}
                onClick={() => handleError()}
                error={
                  formik.touched.macAddress && Boolean(formik.errors.macAddress)
                }
                helperText={
                  formik.touched.macAddress && formik.errors.macAddress
                }
              />
              <InputLabel id="status">Status</InputLabel>
              <Select
                sx={SelectStyled}
                labelId="status"
                id="status"
                label="Status"
                value={status ? 1 : 0}
                onChange={handleStatus}
              >
                <MenuItem value={1}>Ativo</MenuItem>
                <MenuItem value={0}>Inativo</MenuItem>
              </Select>
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
