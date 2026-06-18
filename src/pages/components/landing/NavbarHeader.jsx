import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useTheme } from "@heroui/use-theme";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarHeader() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme("system");

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle("dark");
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
    <Navbar maxWidth="full"  className=" relative mx-auto w-[95%] flex items-center justify-between p-1.5 font-extralight" >
      <NavbarContent >
        <NavbarBrand className="gap-3">
          <div className="md:w-[34px] md:h-[33px] w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/30">
            <img src="/icons/Untitled-1 4.svg" alt="" style={{width:"100%", height:"100%"}}/>
          </div>
          <p className="hidden md:block text-2xl  text-blue-400 bg-clip-text ">
            آکادمی کد نویسی بحر
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-8" >
        <NavbarItem>
          <Link to={'/'} color="foreground" className="hover:text-primary  opacity-80 hover:opacity-100 transition-colors">خانه</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={"/courses"} color="foreground" className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors">دوره‌ها</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={'/news'} color="foreground" className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors">اخبار و مقالات</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={'/Contact_Us'} color="foreground" className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors">ارتباط با ما</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent  className="gap-2 md:gap-4">
        <Button 
          isIconOnly 
          disableRipple
          variant="flat" 
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-xl border-solid border flex items-center justify-center dark:border-gray-600 rounded-full border-gray-200 text-center"
        >
          {theme === "light" ? (
            <HugeiconsIcon icon={Moon02Icon} className=" m-0 w-4 h-4 " />
          ) : (
            <HugeiconsIcon icon={Sun03Icon} className=" m-0 w-4 h-4 " />
          )}
        </Button>
        
        <Button 
          disableRipple
          color="primary" 
          variant="shadow" 
          className="md:text-[16px] md:px-6 text-[16px] px-3 bg-blue-500 text-white rounded-3xl"
        >
          <Link to={'/Auth/Login'} >ورود یا ثبت نام</Link>
        </Button>

        <Button
          disableRipple  className="block md:hidden w-[32px] h-[32px]"
          onClick={() => {toggleMenu()}}
        >
          <img src="icons/menu-02-stroke-rounded (1) 1.png" alt="" className="w-full h-full "/>
        </Button>
      </NavbarContent>
    </Navbar>

    {
      isMenuOpen && (
        <div className="absolute shadow-2xl  w-full h-[250px] md:hidden rounded-[32px] bg-[#fefdff] flex flex-col">
          <div className="  dark:bg-slate-900 p-4 w-full h-full flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
              <img src="/icons/home-01-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px]"/>
              <Link href="/" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>خانه</Link>
              </div>
              <p className="text-[16px]">صفحه اصلی</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
              <img src="/icons/book-02-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px]"/>
              <Link href="#" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>دوره ها</Link>
              </div>
              <p className="text-[16px]">...</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
              <img src="/icons/news-01-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px]"/>
              <Link href="#" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>اخبار و مقالات</Link>
              </div>
              <p className="text-[16px]">...</p>
            </div>

            <div className="flex justify-start items-center gap-3">
              <img src="/icons/flip-phone-stroke-rounded 1.png" alt="" className="h-[24px] w-[24px]"/>
              <Link href="#" className="text-[20px] cursor-pointer" onClick={() => setIsMenuOpen(false)}>ارتباط با ما</Link>
            </div>

          </div>

          <div className="w-[80%] h-[50px] mx-auto border-t border-[#e4e4e4] flex justify-between items-center">
            <div className="gap-3 flex justify-center items-center">
              <div className="md:w-[34px] md:h-[33px] w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/30">
                <img src="/icons/Untitled-1 4.svg" alt="" style={{width:"100%", height:"100%"}}/>
              </div>

              <p className="text-[16px]  text-blue-400 bg-clip-text ">
                آکادمی کد نویسی بحر
              </p>
            </div>

            <div className="gap-3 flex justify-center items-center">
              <img src="/icons/tel2.png" alt="" className="w-[32px] h-[32px]"/>
              <img src="/icons/insta2.png" alt="" className="w-[32px] h-[32px]"/>
            </div>
          </div>
        </div>
      )
    }
    </>

  );
}
