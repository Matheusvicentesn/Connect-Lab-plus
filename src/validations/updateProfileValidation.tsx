import * as yup from "yup";
import { UpdateProfileData } from "./validation.interfaces";

export const updateProfileSchema: yup.Schema<UpdateProfileData> = yup.object({
  phone: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
      "O telefone informado não é válido"
    )
    .required("Campo telefone é obrigatório"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    )
    .required("Campo senha é obrigatório"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas devem ser iguais")
    .required("Campo confirmação de senha é obrigatório"),
});

