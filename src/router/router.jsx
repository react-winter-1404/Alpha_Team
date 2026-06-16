import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing";
import AuthLayout from "../layout/Auth";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPasswordPage from "../pages/ForgotPassword";
import NotFound404Page from "../pages/NotFound404";
import ContactUsPage from "../pages/ContactUs";
import AboutUsPage from "../pages/AboutUs";
import Panel from "../layout/Panel";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/panel", element: <Panel /> },
  {
    path: "/Auth",
    element: <AuthLayout />,
    children: [
      { path: "/Auth/Login", element: <LoginPage /> },
      { path: "/Auth/Register", element: <RegisterPage /> },
      { path: "/Auth/ForgotPassword", element: <ForgotPasswordPage /> },
    ],
  },
  { path: "/About_Us", element: <AboutUsPage/> },
  { path: "/Contact_Us", element: <ContactUsPage/> },
  { path: "*", element: <NotFound404Page/> },
]);

export default router;
