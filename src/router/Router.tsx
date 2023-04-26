import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn/SignIn";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { SignUp } from "../pages/SignUp/SignUp";
import { useAuthentication } from "../contexts/Authentication/UseAuthentication";
import { Home } from "../pages/Home/Home";
import LoggedCompany from "../layouts/LoggedCompany/LoggedCompany";
import { Locals } from "../pages/Locals/Locals";
import { Sensors } from "../pages/Sensors/Sensors";
import { Profile } from "../pages/Profile/Profile";
import { Overview } from "../pages/Overview/Overview";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoggedCompany />}>
        <Route path="/home" element={<Home />} />
        <Route path="/locals" element={<Locals />} />
        <Route path="/devices" element={<Sensors />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/overview" element={<Overview />} />
      </Route>

      <Route path="*" element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
