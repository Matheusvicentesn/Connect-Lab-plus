import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { forgotPasswordSchema } from "../../validations/forgotPasswordValidation";
import {
  ArrowBackStyled,
  BoxStyled,
  BoxTitleStyled,
  ButtonStyled,
  FormStyled,
  InfoStyled,
  TextFieldStyled,
  TitleStyled,
} from "./forgotPassword.styles";
import { ArrowBack } from "@mui/icons-material";
import { useAuthentication } from "../../contexts/Authentication/UseAuthentication";
import { useState } from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const {
    handleForgotPassword,
    error,
    handleError,
    sentEmail,
    handleSentEmail,
  } = useAuthentication();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onReset: () => {},
    onSubmit: (body) => {
      setEmail(body.email);
      handleForgotPassword(body);
    },
  });

  return (
    <>
      {error ? (
        <Alert variant="filled" color="error" severity="error">
          Ocorreu um erro, tente novamente!
        </Alert>
      ) : (
        ""
      )}

      <Box sx={!sentEmail ? BoxStyled("0px") : BoxStyled("50px")}>
        <Box sx={BoxTitleStyled}>
          {!sentEmail ? (
            <Tooltip title="Voltar" arrow>
              <Button onClick={() => handleSentEmail()}>
                <ArrowBack sx={ArrowBackStyled} />
              </Button>
            </Tooltip>
          ) : (
            ""
          )}
          <Typography sx={TitleStyled} variant="h2" component="h2">
            Redefinir Senha
          </Typography>
        </Box>
        <Typography sx={InfoStyled} variant="body1" component="p">
          {!sentEmail
            ? "Digite o e-mail associado à sua conta e enviaremos instruções para redefinir sua senha."
            : `Um link para redefinição da senha foi enviado para o e-mail ${email}`}
        </Typography>

        {!sentEmail ? (
          <FormStyled onSubmit={formik.handleSubmit}>
            <TextField
              sx={TextFieldStyled}
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              onClick={() => handleError()}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button sx={ButtonStyled} variant="contained" type="submit">
              Enviar Recuperação
            </Button>
          </FormStyled>
        ) : (
          <Button
            onClick={() => handleSentEmail()}
            sx={ButtonStyled}
            variant="contained"
            type="submit"
          >
            Ir para Login
          </Button>
        )}
      </Box>
    </>
  );
};
