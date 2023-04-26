import {
  ForgotPasswordData,
  SignInData,
  SignUpData,
} from "../../validations/validation.interfaces";

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export interface AuthenticationType {
  isAuthenticated: boolean;
  error: boolean;
  isLoading: boolean;
  handleRegister: (body: SignUpData) => Promise<void>;
  handleLogin: (body: SignInData) => Promise<void>;
  handleForgotPassword: (body: ForgotPasswordData) => Promise<void>;
  handleError: () => void;
  handleLogout: () => void;
  sentEmail: boolean;
  handleSentEmail: () => void;
}
