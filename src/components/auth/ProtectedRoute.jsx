import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const isLogin = localStorage.getItem("isLogin") === "true" || !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLogin) {
      toast.error("برای ورود به پنل ابتدا باید لاگین کنید!");
    }
  }, [isLogin]);

  return isLogin ? <Outlet /> : <Navigate to="/Auth/Login" replace />;
};

export default ProtectedRoute;