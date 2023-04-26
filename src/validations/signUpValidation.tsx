import * as yup from "yup";
import { SignUpData } from "./validation.interfaces";

export const signUpSchema: yup.Schema<SignUpData> = yup.object({
  name: yup.string().required("O campo nome é obrigatório"),
  cnpj: yup
    .string()
    .matches(
      /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/,
      "O CNPJ informado não é válido"
    )
    .required("O campo CNPJ é obrigatório"),
  owner: yup.string().required("O campo proprietário é obrigatório"),
  email: yup
    .string()
    .email("O e-mail informado não é válido")
    .required("Campo e-mail é obrigatório"),
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

