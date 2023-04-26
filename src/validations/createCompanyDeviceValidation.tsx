import * as yup from "yup";
import { CompanyDeviceData } from "./validation.interfaces";

export const createCompanyDeviceSchema: yup.Schema<CompanyDeviceData> =
  yup.object({
    macAddress: yup.string().required("Obrigatório informar o endereço mac"),
    deviceId: yup.number().required("Obrigatório informar o id do dispositivo"),
    status: yup
      .boolean()
      .required("Obrigatório informar o status do dispositivo"),
    nickname: yup.string().required("Obrigatório informar o apelido do sensor"),
  });
