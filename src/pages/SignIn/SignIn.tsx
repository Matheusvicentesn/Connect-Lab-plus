import { useFormik } from "formik";
import { signInSchema } from "../../validations/signInValidation";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import {
  AnchorStyled,
  BoxStyled,
  BoxTitleStyled,
  ButtonStyled,
  FormStyled,
  InfoStyled,
  TextFieldStyled,
  TitleStyled,
} from "./signIn.styles";
import { useAuthentication } from "../../contexts/Authentication/UseAuthentication";
import { Link } from "react-router-dom";

export const SignIn = () => {
  const { handleLogin, error, handleError } = useAuthentication();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onReset: () => {},
    onSubmit: (body) => {
      handleLogin(body);
    },
  });
  return (
    <>
      <Box sx={BoxStyled}>
        <Box sx={BoxTitleStyled}>
          <Typography sx={TitleStyled} variant="h2" component="div">
            Sign In
          </Typography>
        </Box>
        <Typography sx={InfoStyled} component="div">
          Insira suas credenciais para acessar sua conta
        </Typography>

        <FormStyled onSubmit={formik.handleSubmit}>
          <TextField
            sx={TextFieldStyled}
            fullWidth
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
            fullWidth
            id="password"
            name="password"
            label="Senha"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onClick={() => handleError()}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button sx={ButtonStyled} variant="contained" type="submit">
            Entrar
          </Button>
        </FormStyled>
        <Typography component="p">
          Esqueceu sua senha? 
          <Link to={"/forgotpassword"} style={AnchorStyled}> Redefinir Senha</Link>
        </Typography>
        <Typography component="p">
          Ainda não tem uma conta?
          <Link to={"/signup"} style={AnchorStyled}> Cadastre-se</Link>
        </Typography>
      </Box>
      {error ? (
        <Alert severity="error">
          Login ou senha inválidos, tente novamente!
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};
