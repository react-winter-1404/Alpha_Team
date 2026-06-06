import { Button } from "@heroui/react";
import NavbarHeader from "./components/landing/NavbarHeader";
import { Link } from "react-router-dom";

const NotFound404Page = () => {
  return (
    <div className=" w-full h-screen flex flex-col ">
      <NavbarHeader />
      <div className=" h-full flex justify-center items-center ">
        <div className=" relative bottom-[15%] md:w-110 md:h-50 w-77 h-35 2xl:w-143 2xl:h-65 flex justify-between ">
          <div className=" w-[13%] h-full flex items-end  ">
            <img
              src="/public/images/3d-glassy-abstract-spiral-band-blue2.png"
              alt=""
            />
          </div>
          <div className=" w-[60%] h-full flex flex-col items-center justify-between py-1 text-accent ">
            <div className=" text-5xl md:text-7xl 2xl:text-8xl font-bold ">404</div>
            <div className=" text-sm md:text-[16px] 2xl:text-xl text-center font-bold ">
              ما صفحه‌ای که دنبالش هستی رو نتونستیم پیدا کنیم!
            </div>
            <Button
              variant="primary"
              type="button"
              className=" w-20 h-7 md:w-auto md:h-10 2xl:h-11 font-bold text-xs md:text-[16px] 2xl:text-lg "
            >
                <Link to={'/'} >صفحه اصلی</Link>
            </Button>
          </div>
          <div className=" w-[13%] h-full flex items-start ">
            <img src="/public/images/3d-glassy-twisted-line-1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound404Page;
