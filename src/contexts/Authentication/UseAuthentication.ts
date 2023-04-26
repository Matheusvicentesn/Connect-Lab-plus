import { useContext } from "react";
import { AuthenticationContext } from "./Authentication.context";

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  return context;
};