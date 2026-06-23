
const MyCourses = () => {
  return (
    <>
    <div className="hidden md:block">
      <h3 className="text-[32px] text-[#272727] mt-5">دوره من</h3>

      <div className="flex justify-start items-center gap-5 mt-7">
        <div >
          <div className="flex justify-start items-center gap-2">
            <img src="/public/icons/search-01-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px]"/>
            <span className="text-[16px] text-[#272727]">جستجوِی دوره</span>
          </div>

          <div className="relative mt-3">
            <input type="text" placeholder="جستجو کنید ..." className="rounded-[16px] w-[289px] h-[48px] bg-[#bebebe] text-[14px] text-[#787878] indent-3"/>
            <div className="absolute top-[-1px] left-0 cursor-pointer w-[48px] h-[48px] rounded-[16px] bg-[#3772ff] flex justify-center items-center">
              <img src="/public/icons/search-01-stroke-rounded 2.png" alt="" className="h-[24px] w-[24px]"/>
            </div>
          </div>
        </div>

        <div >
          <div className="flex justify-start items-center gap-2">
            <img src="/public/icons/calendar-03-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px]"/>
            <span className="text-[16px] text-[#272727]">تاریخ برگزاری</span>
          </div>

          <div dir="ltr"  className="relative mt-3">
            <input type="text" placeholder="1403/5/20 - 1403/6/20" className="rounded-[16px] w-[289px] h-[48px] bg-[#bebebe] text-[14px] text-[#787878] indent-3 text-left"/>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full h-[681px] rounded-[16px] bg-[#fefdff] p-3 flex flex-col justify-start items-center">

        <div className="w-full h-[48px] bg-[#f0f0f0] rounded-[16px] flex justify-start items-center gap-3 p-3">
          <span className="text-[16px] text-[#787878] ml-[260px]">نام دوره</span>
          <span className="text-[16px] text-[#787878] ml-[50px]">درباره دوره</span>
          <span className="text-[16px] text-[#787878] ml-[35px]">اساتید دوره</span>
          <span className="text-[16px] text-[#787878] ml-[90px]">تاریخ برگزاری</span>
          <span className="text-[16px] text-[#787878]">قیمت دوره</span>
        </div>

        {/* <div></div>  اینجا باید یک استیت داشته باشیم که دوره هایی که کاربر ثبت نام میکنه اون تو ذخیره بشن و ما اینجا ازش استفاده کنیم. کار با ریداکس یا کانتکس ای پی ایه */}

      </div>
    </div>

    <div className="block md:hidden">
      <div className="flex justify-between items-center ">
        <h3 className="text-[32px] text-[#272727]">دوره من</h3>

        <button className="w-[83px] h-[41px] rounded-[64px] bg-[#3772ff] text-[16px] text-[#fefdff]">فیلتر</button>
      </div>

    </div>
    </>
    
  )
}

export default MyCourses