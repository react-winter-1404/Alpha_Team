import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function NavbarHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // منطق ساده برای تغییر تم (بعداً با next-themes حرفه‌ایش می‌کنیم)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Navbar isBordered maxWidth="full"  className="w-full justify-between p-1.5 font-extralight" >
      {/* بخش راست: لوگو و برند */}
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3">
          {/* اینجا آدرس لوگوی خودت رو بذار */}
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/30">
            <img src="/public/icons/Untitled-1 4.svg" alt="" style={{width:"100%", height:"100%"}}/>
          </div>
          <p className=" sm:block text-2xl  text-blue-400 bg-clip-text ">
            آکادمی کد نویسی بحر
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* بخش وسط: لینک‌ها (با استایل هوشمند تیلویند) */}
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary text-gray-700 opacity-80 hover:opacity-100 transition-colors">خانه</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary text-gray-700 opacity-80 hover:text-primary hover:opacity-100 transition-colors">دوره‌ها</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary text-gray-700 opacity-80 hover:text-primary hover:opacity-100 transition-colors">اخبار و مقالات</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-primary text-gray-700 opacity-80 hover:text-primary hover:opacity-100 transition-colors">ارتباط با ما</Link>
        </NavbarItem>
      </NavbarContent>

      {/* بخش چپ: دکمه‌ها و دارک‌مود */}
      <NavbarContent justify="end" className="gap-4">
        <Button 
          isIconOnly 
          disableRipple
          variant="flat" 
          onClick={toggleTheme}
          className="text-xl border-solid border rounded-full border-gray-200 text-center"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </Button>
        
        <Button 
        disableRipple
          color="primary" 
          variant="shadow" 
          className=" px-6 bg-blue-500 text-white rounded-3xl"
        >
          ورود یا ثبت‌نام
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
