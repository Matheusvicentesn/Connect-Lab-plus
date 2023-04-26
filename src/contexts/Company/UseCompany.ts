import { useContext } from "react";
import { CompanyContext } from "./Company.context";

export const useCompany = () => {
  const context = useContext(CompanyContext);
  return context;
};