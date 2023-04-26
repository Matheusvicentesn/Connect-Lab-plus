import * as yup from "yup";
import { SignInData } from "./validation.interfaces";

export const signInSchema: yup.Schema<SignInData> = yup.object({
  email: yup
    .string()
    .email("O email deve ser válido")
    .required("Obrigatório informar o e-mail"),
  password: yup.string().required("Obrigatório informar senha para acesso"),
});
