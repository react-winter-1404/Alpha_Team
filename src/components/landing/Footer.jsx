import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, TelegramIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="hidden relative p-3 w-[90%] h-[320px] mx-auto rounded-[30px] bg-surface-secondary my-[50px] md:flex flex-wrap items-center">
        <div className="lg:w-[10%] w-[13%] h-[80%] flex flex-col items-start gap-3">
          <img src="/public/icons/Untitled-1 2.svg" alt="" className="" />
          <Button
            variant="secondary"
            className="bg-overlay pt-3.5 pb-4 px-2 gap-1 lg:px-3.5 lg:gap-2 font-bold text-danger mt-2 text-sm lg:text-[16px]"
          >
            <HugeiconsIcon
              icon={InstagramIcon}
              className="m-0 lg:w-6 lg:h-6 w-5 h-5"
            />
            اینستاگرام
          </Button>
          <Button
            variant="secondary"
            className="bg-overlay pt-3.5 pb-4 px-2 gap-1 lg:px-3.5 lg:gap-2 font-bold text-accent mt-2 text-sm lg:text-[16px]"
          >
            <HugeiconsIcon icon={TelegramIcon} className="m-0 w-6 h-6" />
            تلگرام
          </Button>
        </div>

        <div className="w-[30%] h-[80%] mx-[2%] lg:mx-[5%]">
          <h3 className="lg:text-[24px] text-lg font-bold text-foreground">
            آکادمی کدنویسی بحر
          </h3>
          <p className="mt-[20px] text-sm lg:text-[16px] text-muted">
            +13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا
            بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم
            برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.
          </p>
        </div>

        <div className="lg:w-[25%] w-[27%] h-[80%] flex justify-between items-start mx-[2%] lg:mx-[5%]">
          <ul className="text-[16px] lg:text-[20px] font-bold text-foreground">
            <li className="text-accent mb-5">صفحات</li>
            <li>خانه</li>
            <li>دوره ها</li>
            <li>اخبار و مقالات</li>
          </ul>

          <ul className="text-[16px] lg:text-[20px] font-bold text-foreground">
            <li className="text-accent mb-5">ما</li>
            <li>اساتید</li>
            <li>
              <Link to={"/About_Us"}>درباره ما</Link>
            </li>
            <li>
              <Link to={"/Contact_Us"}>ارتباط با ما</Link>
            </li>
          </ul>
        </div>

        <div className="w-[95px] h-[95px] border border-border bg-overlay flex items-center justify-center absolute top-10 left-[5%]">
          <img src="" alt="نماد اعتماد الکترونیک" />
        </div>
      </div>

      <div className="md:hidden p-3 w-[90%] h-auto min-h-[630px] mx-auto rounded-[30px] bg-surface-secondary my-[50px] flex flex-wrap justify-between items-center">
        <div className="w-full h-auto flex justify-between items-center gap-3 py-0">
          <div className="w-[40%] h-full">
            <img
              src="/public/icons/Untitled-1 2.svg"
              alt=""
              className="w-[70px] h-[80px] sm:w-[90px] sm:h-[100px] m-auto"
            />
          </div>
          <div className="w-[40%] h-full">
            <img
              src=""
              alt="نماد الکترونیک"
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] m-auto border border-border"
            />
          </div>
        </div>

        <div className="w-full h-auto mt-0 flex justify-around items-start">
          <ul className="text-[16px] sm:text-[20px] font-bold text-foreground">
            <li className="text-accent mb-3 sm:mb-5">صفحات</li>
            <li>خانه</li>
            <li>دوره ها</li>
            <li>اخبار و مقالات</li>
          </ul>

          <ul className="text-[16px] sm:text-[20px] font-bold text-foreground">
            <li className="text-accent mb-3 sm:mb-5">ما</li>
            <li>اساتید</li>
            <li>
              <Link to={"/About_Us"}>درباره ما</Link>
            </li>
            <li>
              <Link to={"/Contact_Us"}>ارتباط با ما</Link>
            </li>
          </ul>
        </div>

        <div className="w-full h-auto mt-0">
          <h3 className="text-[18px] sm:text-[20px] font-bold text-foreground">
            آکادمی کدنویسی بحر
          </h3>
          <p className="mt-[10px] sm:mt-[14px] text-[14px] sm:text-[16px] text-muted">
            +13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا
            بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم
            برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.
          </p>
        </div>

        <div className="w-full flex gap-3 mt-0">
          <Button
            variant="secondary"
            size="sm"
            className="bg-overlay font-bold text-danger text-xs sm:text-sm"
          >
            <HugeiconsIcon
              icon={InstagramIcon}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            اینستاگرام
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-overlay font-bold text-accent text-xs sm:text-sm"
          >
            <HugeiconsIcon
              icon={TelegramIcon}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            تلگرام
          </Button>
        </div>
      </div>
    </>
  );
};

export default Footer;