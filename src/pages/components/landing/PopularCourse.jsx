
const PopularCourse = () => {

  const ls = [1, 2, 3, 4]

  return (
    <div className="m-auto w-[95%] mt-15">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[40px]">محبوب ترین دوره ها</span>
        <span className="block text-[20px]">دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند</span>
      </div>

      <div className="w-full h-full flex justify-center align-middle gap-4 ">
        {
          ls.map((e) => (
            <div key={e} className="bg-[#ece8e8] h-[530px] w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
              
              <img src="" alt="" className="p-0 bg-pink-500 rounded-[20px] w-full h-[35%]"/>

              <div className="p-2 flex flex-col gap-4">

                <h3 className="text-[24px]">رابط‌کاربری‌ و تجربه کابری</h3>

                <p className="text-[16px] w-[80%] h-[50px] text-[#787878] line-clamp-2">آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه تسک های م...</p>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/teacher-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">محسن اسفندیاری , مهدی اصغری</span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/calendar-03-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">20 اردیبهشت 1403</span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/students-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">80 دانشجو</span>
                </div>

                <div className="flex justify-between align-middle">
                  <p className="text-[24px] text-[#272727]">1000000<span className="text-[16px] text-[#3772ff]">تومان</span></p>
                  <div className="w-[120px] flex justify-between align-middle pt-2">
                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/public/icons/thumbs-up-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                      <span className="text-[16px]">22</span>
                    </div>

                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/public/icons/thumbs-down-stroke-rounded 2.png" alt="" className="h-6 w-6"/>
                      <span span className="text-[16px]">3</span>
                    </div>
                  </div>
                </div>

              </div>

              <div></div>
              <div></div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PopularCourse