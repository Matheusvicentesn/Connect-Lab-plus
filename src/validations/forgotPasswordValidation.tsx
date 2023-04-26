import * as yup from "yup";
import { ForgotPasswordData } from "./validation.interfaces";

export const forgotPasswordSchema: yup.Schema<ForgotPasswordData> = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Obrigatório informar o e-mail cadastrado"),
});

