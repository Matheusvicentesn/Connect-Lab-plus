import { createContext } from "react";
import { AuthenticationType } from "./Authentication.interfaces";

export const AuthenticationContext = createContext<AuthenticationType>({
  isAuthenticated: false,
  error: false,
  isLoading: false,
  handleRegister: () => Promise.resolve(),
  handleLogin: () => Promise.resolve(),
  handleForgotPassword: () => Promise.resolve(),
  handleError: () => Promise.resolve(),
  handleLogout: () => Promise.resolve(),
  sentEmail: false,
  handleSentEmail: () => Promise.resolve(),
});
