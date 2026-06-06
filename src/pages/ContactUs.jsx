import Footer from "./components/landing/Footer";
import NavbarHeader from "./components/landing/NavbarHeader";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  Mail02Icon,
  YoutubeIcon,
  Facebook02Icon,
  TwitterIcon,
  InstagramIcon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";

const ContactUsPage = () => {
  return (
    <div className=" w-full flex flex-col ">
      <NavbarHeader />

      <div className=" flex flex-col items-center  pt-10">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold ">ارتباط با ما</div>
        <div className=" my-2 md:my-5 text-sm sm:text-lg lg:text-xl "> در این صفحه میتوانید اطلاعات ارتباطی آکادمی کدنویسی بحر را مشاهده کنید. </div>
        <div className=" flex my-8 md:my-15 gap-8 md:gap-11 lg:gap-14 ">
          <div className=" flex flex-col gap-5 md:gap-8 lg:gap-10 ">
            <div className=" text-sm sm:text-lg lg:text-xl font-bold ">پل های ارتباطی</div>
            <div className=" flex gap-3 md:gap-4.5 lg:gap-6 ">
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon
                  icon={Call02Icon}
                  size={24}
                  strokeWidth={1.5}
                  fill="currentColor"
                />
              </div>
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon icon={Mail02Icon} />
              </div>
            </div>
          </div>
          <div className=" border "></div>
          <div className=" flex flex-col gap-5 md:gap-8 lg:gap-10 ">
            <div className=" text-sm sm:text-lg lg:text-xl font-bold ">شبکه های اجتماعی</div>
            <div className=" flex gap-3 md:gap-4.5 lg:gap-6 ">
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon icon={YoutubeIcon} />
              </div>
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon icon={Facebook02Icon} fill="currentColor" />
              </div>
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon icon={TwitterIcon} fill="currentColor" />
              </div>
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon icon={InstagramIcon} />
              </div>
              <div className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-[rgba(55,114,255,0.231)] text-accent cursor-pointer hover:bg-accent hover:text-white duration-150 ">
                <HugeiconsIcon icon={TelegramIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[82%] my-5 md:my-10 py-7 px-15  flex flex-col gap-3 md:gap-5 rounded-2xl bg-surface-secondary shadow-lg ">
          <div className=" flex flex-col gap-1.5 md:gap-3 ">
            <div className=" sm:text-xl lg:text-2xl font-bold text-accent ">شماره تماس دفتر</div>
            <div className=" text-xs sm:text-lg lg:text-xl ">01122334455</div>
          </div>
          <div className=" flex flex-col gap-1.5 md:gap-3 ">
            <div className=" sm:text-xl lg:text-xl font-bold text-accent ">آدرس دفتر</div>
            <div className=" text-xs sm:text-lg lg:text-xl ">
              مازندران، ساری، میدان خزر، جاده دریا، بعد از دنیای آرزو، ساختمان سپهرگان، طبقات دوم و سوم
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default ContactUsPage;
