import * as yup from "yup";
import { CompanyLocalData } from "./validation.interfaces";

export const createCompanyLocalSchema: yup.Schema<CompanyLocalData> =
  yup.object({
    name: yup.string().required("Obrigatório informar o nome do local"),
    latitude: yup
      .number()
      .required("Obrigatório informar a latitude")
      .test(
        "A latitude deve estar entre -90 e 90 graus",
        (value) => value >= -90 && value <= 90
      ),
    longitude: yup
      .number()
      .required("Obrigatório informar a longitude")
      .test(
        "A longitude deve estar entre -180 e 180 graus",
        (value) => value >= -180 && value <= 180
      ),
  });
