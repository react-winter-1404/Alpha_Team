// import { Card } from "@heroui/card";


export default function FeatureCards() {
  return(
    <div className="flex flex-wrap md:justify-center items-center gap-7.5 w-[90%] my-12.5 mx-auto">
    
    <div className=" relative w-[90%] mx-auto md:mx-0 md:w-[40%] h-[332px] border-[3px] border-[#ccc] rounded-[30px] text-right overflow-hidden dark:bg-[#585757]">
      <p className="text-[32px] mr-5">پنل اختصاصی دانشجو</p>
      <p className="w-55 text-[16px] opacity-80 font-light mt-2.5 mr-5">
        پنل های اختصاصی دانشجویی برای مدیریت دوره ها و تمرین ها
      </p>
      <img 
        src="/icons/Frame.png" 
        alt="" 
        className="absolute top-[5px] left-[10px] w-[500px] h-[500px]" 
      />
    </div>

    <div className="w-[90%] md:w-[30%] mx-auto md:mx-0 h-[332px] rounded-[30px] bg-[#3772FF]">
      <div className="flex justify-between items-center p-5">
        <p className="mr-[20px] text-white text-[24px]">دوره‌های جدید تابستانه!</p>
        <div className="h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center">
          <img 
            src="/icons/arrow-up-left-01-stroke-rounded 2.png" 
            alt="" 
            className="pt-[0px]" // در فلکس باکس نیازی به paddingTop دستی برای وسط‌چینی نیست
          />
        </div>
      </div>
      <p className="text-[13px] text-white w-[40%] mr-5">
        شروع دوره های جدید مبتدی و پیشرفته برای همین تابستان
      </p>
      <img 
        src="/images/Group 143.png" 
        alt="" 
        className="w-50 h-50 mr-[40%] md:mr-50 -mt-[10px] md:-mt-[-30px] max-w-none" 
      />
    </div>

    <div className="w-[90%] md:w-[25%] mx-auto md:mx-0 h-[332px] border-[3px] border-[#ccc] rounded-[30px] dark:bg-[#585757]">
      <div className="flex justify-between items-center p-5">
        <p className="text-[24px]">درباره ما بیشتر بخوانید</p>
        <div className="h-10 w-10 rounded-full bg-[#3772FF] flex items-center justify-center">
          <img 
            src="/icons/arrow-up-left-01-stroke-rounded 1.png" 
            alt="" 
          />
        </div>
      </div>

      <span className="text-[32px] mt-10 mr-2.5 block">+1000</span>
      <span className="text-[16px] mr-2.5 text-gray-500">دانشجوی آنلاین در دوره</span>

      <span className="text-[32px] mt-5 mr-2.5 block">+13</span>
      <span className="text-[16px] mr-2.5 text-gray-500">سال سابقه آموزش تخصصی</span>
    </div>

  </div>
  )
}