import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";




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
    <>
      <RouterProvider router={router} />
      <Toaster /> 
      
    </>
  );
};

export default App;
