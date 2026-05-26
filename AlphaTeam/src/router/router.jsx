import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/Auth";

const router = createBrowserRouter([
  { path: "/Auth", element: <AuthPage/> },
]);

export default router;
