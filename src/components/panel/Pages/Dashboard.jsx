import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Courses } from "../../../core/services/get";

const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [course, setCourse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      const fetchCourses = async () => {
      setIsLoading(true)
  
      try {
        const response = await Courses({pageNumber:1, rowsOfPage:4})
        setCourse(response.data.courseDtos)
        console.log("دیتای دریافتی از سمت سرور", response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    }
      fetchCourses()
    }, [])

  const formatPersianDate = (isoString) => {
    if (!isoString) return "—";
    const date = new Date(isoString);

    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  return (
    <div className="w-full mt-5 p-3 flex flex-col justify-center items-start">
      <div className="w-full flex justify-between items-center">

        <h2 className="text-[32px] text-[#272727] w-[500px]">سلام، صبح‌ بخیر پارسا  😍</h2>

        <div className="w-full flex justify-center items-center gap-15">
          
          <div className="flex justify-center items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full bg-[#fefdff] flex items-center justify-center">
              <img src="/public/icons/clock-01-stroke-rounded 2.png" alt="" className="w-[24px] h-[24px] m-auto"/>
            </div>

            <div>
              <span className="block text-[16px] text-[#787878]">ساعت</span>
              <span className="block text-[16px] text-[#272727]">09:21</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full bg-[#fefdff] flex items-center justify-center">
              <img src="/public/icons/calendar-03-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px] m-auto"/>
            </div>

            <div>
              <span className="block text-[16px] text-[#787878]">تاریخ</span>
              <span className="block text-[16px] text-[#272727]">20 اردیبهشت 1403</span>
            </div>
          </div>

          
        </div>
      </div>

      <div className="w-full h-[300px] mt-10 flex justify-center items-center gap-5">
        <div className="w-[40%] h-[287px] bg-[#fefdff] rounded-[16px] p-3">

          <div className="h-[30px] w-full flex justify-between items-center">
            <h3 className="text-[16px] text-[#272727]">نظرات‌ شما</h3>
            <span className="text-[14px] text-[#3772ff] cursor-pointer">مشاهده همه {">"}</span>
          </div>
          
          <div>
            
          </div>
        </div>

        <div className="w-[30%] h-[287px] bg-[#fefdff] rounded-[16px]">
          <Calendar
              value={value}
              onChange={setValue}
              calendar={persian}
              locale={persian_fa}
              className="purple" 
              style={{
                width: "100%",
                height:"90%",
                borderRadius:"16px",
                border: "none",
                paddingRight:"17px",
                boxShadow: "none"
              }}
            />
        </div>

        <div className="w-[30%] h-[287px] bg-[#fefdff] rounded-[16px]">
          
        </div>
      </div>

      <div className="w-full h-[470px] flex flex-col justify-start items-center gap-3 mt-3 p-3 bg-[#fefdff] rounded-[16px]">

        <div className="h-[30px] w-full flex justify-between items-center">
            <h3 className="text-[16px] text-[#272727]">جدیدترین دوره ها</h3>
            <span className="text-[14px] text-[#3772ff] cursor-pointer">مشاهده همه {">"}</span>
        </div>

        <div className="w-full h-[48px] bg-[#f0f0f0] rounded-[16px] flex justify-start items-center gap-3 p-3">
          <span className="text-[16px] text-[#787878] ml-[260px]">نام دوره</span>
          <span className="text-[16px] text-[#787878] ml-[50px]">درباره دوره</span>
          <span className="text-[16px] text-[#787878] ml-[35px]">اساتید دوره</span>
          <span className="text-[16px] text-[#787878] ml-[90px]">تاریخ برگزاری</span>
          <span className="text-[16px] text-[#787878]">قیمت دوره</span>
        </div>

        <div className="w-full h-[470px] bg-[#fefdff] rounded-[16px] flex flex-col justify-start items-start">
          {
            isLoading ? (<p>در حال فراخوانی...</p>):
            (
              course.map((c) => (
                <div key={c.courseId} className="w-full h-[30px] p-2 m-auto flex justify-start items-center gap-8">
                  <span className="text-[20px] text-[#272727] w-[300px]">{c.title}</span>
                  <span className="text-[16px] text-[#272727] cursor-pointer w-[100px]">...</span>
                  <span className="text-[16px] text-[#272727] cursor-pointer w-[85px]">...</span>
                  <span className="text-[16px] text-[#272727] w-[150px]">{formatPersianDate(c.startTime)}</span>
                  <span className="text-[20px] text-[#272727] w-[150px]">{c.cost}<span>تومان</span></span>
                  <img src="/public/icons/view-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px] cursor-pointer"/>
                </div>
              ))
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Dashboard