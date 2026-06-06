import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="hidden p-3 w-[90%] h-[350px] mx-auto rounded-[30px] bg-[#e4e4e4] dark:bg-[#585757] mt-[50px] md:flex flex-wrap justify-between items-center">

        <div className="w-[10%] h-[80%] flex flex-col gap-3">
          <img src="/public/icons/Untitled-1 2.svg" alt=""/>
          <img src="/public/icons/insta.png" alt="" />
          <img src="/public/icons/tel.png" alt="" />
        </div>

        <div className="w-[30%] h-[80%]">
          <h3 className="text-[24px] text-[#272727] dark:text-white">آکادمی کدنویسی بحر</h3>
          <p className="mt-[20px] text-[16px] text-[#787878] dark:text-[#d8d5d5]">+13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.</p>
        </div>

        <div className="w-[20%] h-[80%] flex justify-between items-start">
          <ul className="text-[20px] text-[#272727] dark:text-[#d8d5d5]">
            <li className="text-[#787878] dark:text-white mb-5">صفحات</li>

            <li >خانه</li>
            <li >دوره ها</li>
            <li >اخبار و مقالات</li>
          </ul>

          <ul className="text-[20px] text-[#272727] dark:text-[#d8d5d5]">
            <li className="text-[#787878] dark:text-white mb-5">ما</li>
            
            <li>اساتید</li>
            <li><Link to={"/About_Us"} > درباره ما </Link></li>
            <li><Link to={"/Contact_Us"} > ارتباط با ما </Link></li>
            
          </ul>
        </div>

        <div className="w-[80px] h-[80px] border mb-[200px]">
          <img src="" alt="نماد الکترونیک" />
        </div>

      </div>

      <div className="md:hidden p-3 w-[90%] h-[630px] mx-auto rounded-[30px] bg-[#e4e4e4] dark:bg-[#585757] mt-[50px] flex flex-wrap justify-between items-center">

        <div className="w-full h-[20%] flex justify-between items-center gap-3">
          <div className="w-[40%] h-full"><img src="/public/icons/Untitled-1 2.svg" alt="" className="w-[90px] h-[100px] m-auto"/></div>
          <div className="w-[40%] h-full"> <img src="" alt="نماد الکترونیک" className="w-[100px] h-[100px] m-auto border"/> </div>     
        </div>

        <div className="w-full h-[40%] mt-4 flex justify-between items-start">
          <ul className="text-[20px] text-[#272727] dark:text-[#d8d5d5]">
            <li className="text-[#787878] dark:text-white mb-5">صفحات</li>

            <li >خانه</li>
            <li >دوره ها</li>
            <li >اخبار و مقالات</li>
          </ul>

          <ul className="text-[20px] text-[#272727] dark:text-[#d8d5d5]">
            <li className="text-[#787878] text-white mb-5">ما</li>
            
            <li>اساتید</li>
            <li>درباره ما</li>
            <li>ارتباط با ما</li>
          </ul>
        </div>

        <div className="w-full h-[30%] mt-[-50px]">
          <h3 className="text-[20px] text-[#272727] dark:text-white">آکادمی کدنویسی بحر</h3>
          <p className="mt-[14px] text-[16px] text-[#787878] dark:text-[#d8d5d5]">+13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.</p>
        </div>


        <img src="/public/icons/insta.png" alt="" />
        <img src="/public/icons/tel.png" alt="" />

      </div>
    </>
  )
}

export default Footer