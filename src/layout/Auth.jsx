import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import ThemeSwitcher from "../components/theme/ThemeSwitcher";

const AuthLayout = () => {
  return (
    <div className="relative max-w-6xl h-screen mx-auto flex font-sans">
      <motion.div
        className="w-full h-full flex"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Outlet />

        <div className="absolute top-7 left-3">
          <ThemeSwitcher />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;