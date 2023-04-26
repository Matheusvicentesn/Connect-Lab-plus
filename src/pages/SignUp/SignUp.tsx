import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../../validations/signUpValidation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  BoxStyled,
  BoxTitleStyled,
  ButtonStyled,
  ColumnFormStyled,
  FormStyled,
  InfoStyled,
  PageStyled,
  TextFieldStyled,
  TextFielColumndStyled,
  TitleStyled,
  BoxContainerStyled,
  BottomBoxStyled,
} from "./signUp.styles";
import { useAuthentication } from "../../contexts/Authentication/UseAuthentication";

export const SignUp = () => {
  const navigate = useNavigate();
  const { handleRegister, handleError } = useAuthentication();

  const formik = useFormik({
    initialValues: {
      name: "",
      cnpj: "",
      owner: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: signUpSchema,
    onReset: () => {},
    onSubmit: (body) => {
      handleRegister(body);
    },
  });
  return (
    <Box sx={BoxContainerStyled}>     
      <PageStyled>
        <Box sx={BoxStyled}>
          <Box sx={BoxTitleStyled}>
            <Typography sx={TitleStyled} variant="h2" component="div">
              Sign Up
            </Typography>
            <Typography sx={InfoStyled} variant="body1" component="div">
              Insira seus dados para criar uma conta
            </Typography>
          </Box>
          <FormStyled onSubmit={formik.handleSubmit}>
            <TextField
              sx={TextFieldStyled}
              fullWidth
              id="name"
              name="name"
              label="Empresa"
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
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              type="text"
              value={formik.values.cnpj}
              onChange={formik.handleChange}
              onClick={() => handleError()}
              error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
              helperText={formik.touched.cnpj && formik.errors.cnpj}
            />
            <TextField
              sx={TextFieldStyled}
              fullWidth
              id="owner"
              name="owner"
              label="Responsável"
              type="text"
              value={formik.values.owner}
              onChange={formik.handleChange}
              onClick={() => handleError()}
              error={formik.touched.owner && Boolean(formik.errors.owner)}
              helperText={formik.touched.owner && formik.errors.owner}
            />
            <TextField
              sx={TextFieldStyled}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onClick={() => handleError()}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={TextFieldStyled}
              id="phone"
              name="phone"
              label="Telefone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onClick={() => handleError()}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <ColumnFormStyled>
              <TextField
                sx={TextFielColumndStyled}
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onClick={() => handleError()}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                sx={TextFielColumndStyled}
                id="passwordConfirmation"
                name="passwordConfirmation"
                label="Confirmar Senha"
                type="password"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onClick={() => handleError()}
                error={
                  formik.touched.passwordConfirmation &&
                  Boolean(formik.errors.passwordConfirmation)
                }
                helperText={
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                }
              />
            </ColumnFormStyled>
            <Button sx={ButtonStyled} variant="contained" type="submit">
              Criar Conta
            </Button>
          </FormStyled>
        </Box>
        <Box sx={BottomBoxStyled}>
          <p>Já possui uma uma conta?</p>
          <Tooltip title="Redirecionar para a página de Login" arrow>
            <Button onClick={() => navigate("/login")}>
              <Typography variant="body1" component="div">
                Realize seu login
              </Typography>
            </Button>
          </Tooltip>
        </Box>
      </PageStyled>
    </Box>
  );
};
