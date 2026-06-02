import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function NavbarHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
    <Navbar maxWidth="full"  className=" relative w-full justify-between p-1.5 font-extralight" >
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3">
          <div className="md:w-[34px] md:h-[33px] w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/30">
            <img src="/icons/Untitled-1 4.svg" alt="" style={{width:"100%", height:"100%"}}/>
          </div>
          <p className="hidden md:block text-2xl  text-blue-400 bg-clip-text ">
            آکادمی کد نویسی بحر
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-8" justify="center">
        <NavbarItem>
          <Link href="/" color="foreground" className="hover:text-primary  opacity-80 hover:opacity-100 transition-colors">خانه</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors">دوره‌ها</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors">اخبار و مقالات</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary  opacity-80 hover:text-primary hover:opacity-100 transition-colors">ارتباط با ما</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 md:gap-4">
        <Button 
          isIconOnly 
          disableRipple
          variant="flat" 
          onClick={toggleTheme}
          className="text-xl border-solid border dark:border-gray-600 rounded-full border-gray-200 text-center"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </Button>
        
        <Button 
          disableRipple
          color="primary" 
          variant="shadow" 
          className="md:text-[16px] md:px-6 text-[16px] px-3 bg-blue-500 text-white rounded-3xl"
        >
          ورود یا ثبت‌نام
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
