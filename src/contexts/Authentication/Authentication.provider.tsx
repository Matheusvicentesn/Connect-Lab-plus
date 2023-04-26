import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "./Authentication.context";
import { forgotPassword, signIn, signUp } from "../../services/api/api";
import {
  AuthenticationProviderProps,
  AuthenticationType,
} from "./Authentication.interfaces";
import {
  ForgotPasswordData,
  SignInData,
  SignUpData,
} from "../../validations/validation.interfaces";

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentEmail, setSentEmail] = useState<boolean>(false);

  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const usr = localStorage.getItem("TOKEN");
    if (usr) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);

  const navigate = useNavigate();

  const handleRegister = async (body: SignUpData) => {
    await signUp(body, headerConfig)
      .then((response) => {
        alert(response.data.message)
        setError(false);
        setIsLoading(false);
        navigate("/signin");
      })
      .catch(() => {
        alert("Ocorreu um erro ao atualizar o cadastro. Verifique se os campos e-mail e CNPJ estão corretos e tente novamente.")
        setIsAuthenticated(false);
        setError(true);
      });
  };

  const handleLogin = async (body: SignInData) => {
    await signIn(body, headerConfig)
      .then((response) => {        
        localStorage.setItem("TOKEN", response.data.token);
        setError(false);
        setIsAuthenticated(true);
        setIsLoading(true);
        navigate("/home");
      })
      .catch(() => {        
        setIsAuthenticated(false);
        setError(true);
      });
  };

  const handleForgotPassword = async (body: ForgotPasswordData) => {
    await forgotPassword(body, headerConfig)
      .then(() => {        
        setIsLoading(false);
        setIsAuthenticated(false);
        setError(false);
        setSentEmail(true);
      })
      .catch(() => {
        alert("Verifique se o e-mail está correto e tente novamente.")
        setSentEmail(false);
        setError(true);
      });
  };

  const handleError = () => {
    setError(false);
  };

  const handleSentEmail = () => {
    setSentEmail(false);
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const authenticationContextValue: AuthenticationType = {
    isAuthenticated,
    error,
    isLoading,
    handleRegister,
    handleLogin,
    handleError,
    handleLogout,
    handleForgotPassword,
    sentEmail,
    handleSentEmail,
  };

  return (
    <AuthenticationContext.Provider value={authenticationContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.node,
};
