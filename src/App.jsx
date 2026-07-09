import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ThemeProvider from "./providers/ThemeProvider";




const App = () => {
  useEffect(() => {
    localStorage.getItem("token")
      ? localStorage.setItem("isLogin", true)
      : localStorage.setItem("isLogin", false);
  }, []);

  window.addEventListener("storage", () => {
    JSON.parse(localStorage.getItem("token"))
      ? localStorage.setItem("isLogin", true)
      : localStorage.setItem("isLogin", false);
  });

  return (
  <ThemeProvider>
    <RouterProvider router={router} />
    <Toaster />
  </ThemeProvider>
);
};

export default App;
