import { useTheme } from "@heroui/use-theme";
import { Button  } from "@heroui/react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
       <div className=" w-full h-screen flex flex-col items-center justify-center ">
            <Button
                className=' border bg-blue-600 '
                onPress={() => setTheme(theme === "light" ? "dark" : "light")}
                variant="flat"
            >
                {theme === "light" ? "🌙 دارک مود" : "☀️ لایت مود"}
            </Button>
            <div className=" text-lg font-bold ">hello world!</div>
        </div> 
  );
};

export default ThemeSwitcher;
