import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/Auth";
import LandingPage from "../pages/Landing";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage/> },
  { path: "/Auth", element: <AuthPage/> },
]);

export default router;
