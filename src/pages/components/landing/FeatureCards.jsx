// import { Card } from "@heroui/card";


export default function FeatureCards() {
  return(
    <div className="flex justify-center items-center gap-7.5 w-[90%] h-75 my-12.5 mx-auto">
    
    <div className="w-[40%] h-full border-[3px] border-[#ccc] rounded-[30px] text-right overflow-hidden">
      <p className="text-[32px] mr-5">پنل اختصاصی دانشجو</p>
      <p className="w-55 text-[16px] opacity-80 font-light mt-2.5 mr-5">
        پنل های اختصاصی دانشجویی برای مدیریت دوره ها و تمرین ها
      </p>
      <img 
        src="/icons/Frame.png" 
        alt="" 
        className="-mt-32.5 mr-2.5 w-125 h-125 max-w-none" 
      />
    </div>

    <div className="w-[30%] h-full rounded-[30px] bg-[#3772FF]">
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
        className="w-50 h-50 mr-37.5 -mt-7.5 max-w-none" 
      />
    </div>
    <div className="w-[25%] h-full border-[3px] border-[#ccc] rounded-[30px]">
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