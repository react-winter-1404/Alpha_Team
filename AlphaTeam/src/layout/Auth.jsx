import { useTheme } from "@heroui/use-theme";
import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import ForgotPasswordPage from "../pages/ForgotPassword";


const AuthLayout = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="relative max-w-6xl h-screen mx-auto flex">
      <motion.div
        className="w-full h-full flex"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* <LoginPage /> */}
        {/* <RegisterPage /> */}
        <ForgotPasswordPage/>

        <Button
          className="absolute top-7 left-3 p-0 m-0 h-9 w-9 bg-default "
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          variant="tertiary"
        >
          {theme === "light" ? (
            <HugeiconsIcon icon={Moon02Icon} className=" m-0 w-4 h-4 " />
          ) : (
            <HugeiconsIcon icon={Sun03Icon} className=" m-0 w-4 h-4 " />
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
