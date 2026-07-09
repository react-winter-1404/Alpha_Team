import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu02Icon,
  Home01Icon,
  Book02Icon,
  News01Icon,
  FlipPhoneIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CloseButton } from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import ScrollProgressBar from "../../layout/ScrollProgressBar";
import ThemeSwitcher from "../../components/theme/ThemeSwitcher";


export default function NavbarHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoged,setIsLoged]=useState(false);

    useEffect(()=>{
        setIsLoged(JSON.parse(localStorage.getItem('isLogin')));

    },[localStorage.getItem('token')])



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate()

  return (
    <>
      <ScrollProgressBar/>
      <Navbar
        maxWidth="full"
        className=" relative mx-auto w-full sm:w-[95%] flex items-center justify-between p-1.5 font-extralight bg-white dark:bg-[rgb(28,27,34)] "
      >
        <NavbarContent>
          <NavbarBrand className="gap-3">
            <div onClick={() => navigate("/")} className="cursor-pointer w-full overflow-hidden  h-11.75 flex items-center gap-1.5 px-1 ">
              <img
                src="/public/images/imageLogo.png"
                alt=""
                className=" h-full w-0 opacity-0 lg:w-auto lg:opacity-100    duration-300 "
              />
              <img
                src="/public/images/textLogo.png"
                alt=""
                className=" max-h-[65%]  mt-0.75 w-38 "
              />
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-8">
          <NavbarItem>
            <Link
              to={"/"}
              color="foreground"
              className="hover:text-primary  opacity-80 hover:opacity-100 transition-colors"
            >
              خانه
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to={"/courses"}
              color="foreground"
              className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors"
            >
              دوره‌ها
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to={"/news"}
              color="foreground"
              className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors"
            >
              اخبار و مقالات
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to={"/Contact_Us"}
              color="foreground"
              className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors"
            >
              ارتباط با ما
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="gap-2 md:gap-4">
          <ThemeSwitcher />

          <Button
            disableRipple
            
            className={`${isLoged  ? ' bg-overlay border dark:border-0 hover:bg-field-hover dark:hover:bg-gray-900 ':' bg-accent text-accent-foreground '} rounded-3xl flex items-center justify-center `}
          >
            <Link to={isLoged  ? '/panel':'/Auth/Login'} className=" text-sm mb-1 md:text-[16px] ">
            {isLoged  ? 'حساب کاربری':' ورود یا ثبت نام'}
             
            </Link>
          </Button>

          <Button
            variant="ghost"
            disableRipple
            className=" border-0 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg duration-500 md:hidden text-xl w-9 h-9 flex items-center justify-center  text-center p-0 "
            onClick={() => {
              toggleMenu();
            }}
          >
            <HugeiconsIcon icon={Menu02Icon} className=" m-0 w-8 h-8   " />
          </Button>
        </NavbarContent>
      </Navbar>

      <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -250 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -250 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute shadow-2xl w-full h-[250px] md:hidden rounded-[32px] bg-overlay  dark:bg-[rgb(28,27,34)] flex flex-col z-50"
    >
      <div className="dark:bg-[rgb(28,27,34)] bg-overlay p-4 w-full h-full flex flex-col gap-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <HugeiconsIcon icon={Home01Icon} className="m-0 w-6 h-6 text-muted" />
            <Link to="/" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              خانه
            </Link>
          </div>
          <CloseButton onClick={() => setIsMenuOpen(false)} className="bg-danger-soft text-danger w-7 h-7 rounded-full" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <HugeiconsIcon icon={Book02Icon} className="m-0 w-6 h-6 text-muted" />
            <Link to="/courses" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              دوره‌ها
            </Link>
          </div>
          <p className="text-[16px]">...</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <HugeiconsIcon icon={News01Icon} className="m-0 w-6 h-6 text-muted" />
            <Link to="/news" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              اخبار و مقالات
            </Link>
          </div>
          <p className="text-[16px]">...</p>
        </div>

        <div className="flex justify-start items-center gap-3">
          <HugeiconsIcon icon={FlipPhoneIcon} className="m-0 w-6 h-6 text-muted" />
          <Link to="/Contact_Us" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            ارتباط با ما
          </Link>
        </div>
      </div>

      <div className="w-[80%] h-[50px] mx-auto flex justify-between items-center">
        <div className="w-full overflow-hidden h-11.75 flex items-center gap-0 px-1">
          <img src="/public/images/imageLogo.png" alt="" className="h-[80%]" />
          <img src="/public/images/textLogo.png" alt="" className="max-h-[65%] mt-0.75 w-38" />
        </div>
        <div className="gap-3 flex justify-center items-center">
          <img src="/icons/tel2.png" alt="" className="w-[32px] h-[32px]" />
          <img src="/icons/insta2.png" alt="" className="w-[32px] h-[32px]" />
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}