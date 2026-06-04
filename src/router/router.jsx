import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing";
import AuthLayout from "../layout/Auth";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPasswordPage from "../pages/ForgotPassword";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/Auth",
    element: <AuthLayout />,
    children: [
      { path: "/Auth/Login", element: <LoginPage /> },
      { path: "/Auth/Register", element: <RegisterPage /> },
      { path: "/Auth/ForgotPassword", element: <ForgotPasswordPage /> },
    ],
  },
]);

export default router;
