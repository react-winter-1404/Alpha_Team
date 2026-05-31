
const NewsBar = () => {
  const ls = [1, 2, 3, 4]

  return (
    <div className="m-auto mt-[60px] w-[95%]">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[40px]">اخبار و مقالات هفته</span>
        <span className="block text-[20px]">خبر ها و مقاله هایی که در این هفته منتشر شدند</span>
      </div>

      <div className="w-full h-full flex justify-center align-middle gap-4 ">
        {
          ls.map((e) => (
            <div key={e} className="bg-[#ece8e8] h-[530px] w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
              
              <img src="" alt="" className="p-0 bg-pink-500 rounded-[20px] w-full h-[35%]"/>

              <div className="p-2 flex flex-col gap-4">

                <h3 className="text-[24px]">ری اکت چیست و چرا باید ازش استفاده کنیم؟</h3>

                <p className="text-[16px] w-[80%] h-[50px] text-[#787878] overflow-hidden">ری اکت (React) یک کتابخانه جاوا اسکریپتی برای ساخت رابط کاربری بوده که برای ایجاد برنامه‌های تحت وب با استفاده از کامپوننت‌ها، قابل استفاده است.</p>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/quill-write-02-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">سعید قربانی</span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/public/icons/view-stroke-rounded (1) 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">225</span>
                </div>

                <div className="flex justify-between align-middle">
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

                  <button className="w-[40%] h-[40px] bg-[#3772ff] rounded-[65px] text-[16px] text-[#fefdff]">بیشتر بخوانید</button>

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

export default NewsBar