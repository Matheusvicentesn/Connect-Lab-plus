import { useFormik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  BoxStyled,
  BoxTitleStyled,
  ButtonStyled,
  ColumnFormStyled,
  FormStyled,
  PageStyled,
  TextFieldStyled,
  TextFielColumndStyled,
  TitleStyled,
  BoxContainer,
} from "./profile.styles";
import { useCompany } from "../../contexts/Company/UseCompany";
import { updateProfileSchema } from "../../validations/updateProfileValidation";

export const Profile = () => {
  const {
    handleUpdateProfile,
    profileData,
  } = useCompany();

  const profile = profileData;

  const formik = useFormik({
    initialValues: {
      name: profile.name,
      cnpj: profile.cnpj,
      owner: profile.owner,
      email: profile.email,
      phone: profile.phone,
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: updateProfileSchema,
    onReset: () => {},
    onSubmit: async (body) => {
      await handleUpdateProfile(body);
    },
  });
  return (
    <Box sx={BoxContainer}>
      <Box>
        <PageStyled>
          <Box sx={BoxStyled}>
            <Box sx={BoxTitleStyled}>
              <Typography sx={TitleStyled} variant="h2" component="div">
                Atualizar dados
              </Typography>
            </Box>
            <FormStyled onSubmit={formik.handleSubmit}>
              <TextField
                disabled={true}
                sx={TextFieldStyled}
                fullWidth
                id="name"
                name="name"
                label="Empresa"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                disabled={true}
                sx={TextFieldStyled}
                fullWidth
                id="cnpj"
                name="cnpj"
                label="CNPJ"
                type="text"
                value={formik.values.cnpj}
                onChange={formik.handleChange}
                error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                helperText={formik.touched.cnpj && formik.errors.cnpj}
              />
              <TextField
                disabled={true}
                sx={TextFieldStyled}
                fullWidth
                id="owner"
                name="owner"
                label="Responsável"
                type="text"
                value={formik.values.owner}
                onChange={formik.handleChange}
                error={formik.touched.owner && Boolean(formik.errors.owner)}
                helperText={formik.touched.owner && formik.errors.owner}
              />
              <TextField
                disabled={true}
                sx={TextFieldStyled}
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
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
                Atualizar dados
              </Button>
            </FormStyled>
          </Box>
        </PageStyled>
      </Box>
    </Box>
  );
};
