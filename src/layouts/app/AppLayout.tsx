
import { Router } from "../../router/Router";
import { BrowserRouter } from "react-router-dom";

import { AuthenticationProvider } from "../../contexts/Authentication/Authentication.provider";
import { CompanyProvider } from "../../contexts/Company/Company.provider";

import { FC } from "react";

export const AppLayout: FC = () => {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <CompanyProvider>
          <Router />
        </CompanyProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
};
