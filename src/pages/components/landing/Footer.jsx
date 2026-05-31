

const Footer = () => {
  return (
    <div className="p-3 w-[90%] h-[350px] mx-auto rounded-[30px] bg-[#e4e4e4] mt-[50px] flex justify-between items-center">

      <div className="w-[10%] h-[70%] flex flex-col gap-3">
        <img src="/public/icons/Untitled-1 2.svg" alt="" />
        <img src="/public/icons/insta.png" alt="" />
        <img src="/public/icons/tel.png" alt="" />
      </div>

      <div className="w-[20%] h-[80%]">
        <h3 className="text-[24px] text-[#272727] ">آکادمی کدنویسی بحر</h3>
        <p className="mt-[20px] text-[16px] text-[#787878]">+13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.</p>
      </div>

      <div className="w-[20%] h-[80%] flex justify-between items-start">
        <ul className="text-[20px] text-[#272727]">
          <li className="text-[#787878] mb-5">صفحات</li>

          <li >خانه</li>
          <li >دوره ها</li>
          <li >اخبار و مقالات</li>
        </ul>

        <ul className="text-[20px] text-[#272727]">
          <li className="text-[#787878] mb-5">ما</li>
          
          <li>اساتید</li>
          <li>درباره ما</li>
          <li>ارتباط با ما</li>
        </ul>
      </div>

      <div className="w-[80px] h-[80px] border mb-[200px]">
        <img src="" alt="" />
      </div>

    </div>
  )
}

export default Footer