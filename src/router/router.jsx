import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing";
import AuthLayout from "../layout/Auth";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPasswordPage from "../pages/ForgotPassword";
import NotFound404Page from "../pages/NotFound404";
import ContactUsPage from "../pages/ContactUs";
import AboutUsPage from "../pages/AboutUs";
import ListingPage from "../pages/ListingPage";
import CourseDetailPage from "../pages/CourseDetail";

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
  { path: "/About_Us", element: <AboutUsPage /> },
  { path: "/Contact_Us", element: <ContactUsPage /> },
  { path: "*", element: <NotFound404Page /> },
  { path: "/courses", element: <ListingPage /> },
  { path: "/courses/:id", element: <CourseDetailPage/> }
]);

export default router;
