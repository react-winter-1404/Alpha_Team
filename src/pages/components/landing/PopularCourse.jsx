import { useEffect, useState } from "react"
import { BestCourses } from "../../../core/services/get"
import { Button } from "@heroui/button";

const PopularCourse = () => {

  const formatPersianDate = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

  const [course, setCourse] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)

      try {
        const response = await BestCourses({count:4})
        setCourse(response.data)
        console.log("دیتای دریافتی از سمت سرور", response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])
  

  return (
    <div className="m-auto w-[95%] mt-15">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[28px] md:text-[40px]">محبوب ترین دوره ها</span>
        <span className="block text-[14px] md:text-[20px]">دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند</span>
      </div>

      <div className="hidden w-full h-full md:flex flex-wrap justify-center align-middle gap-4 ">
        {
          isLoading ? (<p>در حال فراخوانی...</p>):
          (
          course.map((e) => (
            <div key={e.courseId} className="relative text-[#272727] bg-[#ece8e8] dark:bg-[#585757] dark:text-[#ece8e8] h-[530px] w-[90%] md:w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
              
              <img src={e.imageAddress} alt="" className="p-0 bg-pink-500 rounded-[20px] w-full h-[35%]"/>

              <div className="p-2 flex flex-col gap-4">

                <h3 className="text-[20px] md:text-[24px] h-[40px] mb-2.5">{e.title}</h3>

                <p className="text-[14px] md:text-[16px] w-[80%] h-[50px] text-[#787878] dark:text-[#bdbbbb] line-clamp-2">{e.describe}</p>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/icons/teacher-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[14px] md:text-[16px]">{e.teacherName}</span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/icons/calendar-03-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span>{formatPersianDate(e.startTime)} <span className="text-[#787878] dark:text-[#bdbbbb]">(شروع)</span></span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/icons/students-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">{e.capacity} دانشجو</span>
                </div>

                <div className="flex justify-between align-middle">
                  <p className="text-[20px] md:text-[24px] text-[#272727] dark:text-[#bdbbbb]">{e.cost}<span className="text-[14px] md:text-[16px] text-[#3772ff] " > تومان </span></p>
                  <div className="w-[120px] flex justify-between align-middle pt-2">
                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/icons/thumbs-up-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                      <span className="text-[14px] md:text-[16px]">{e.likeCount}</span>
                    </div>

                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/icons/thumbs-down-stroke-rounded 2.png" alt="" className="h-6 w-6"/>
                      <span className="text-[14px] md:text-[16px]">{e.dissLikeCount}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[94px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">{e.technologyList}</div>
              <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[57px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">{e.levelName}</div>

            </div>
          ))
        )
        }
      </div>

      <div className="md:hidden w-full h-full flex flex-wrap justify-center align-middle gap-4 ">
        {
          isLoading ? (<p>در حال فراخوانی...</p>):
          (
          course.slice(0,2).map((e) => (
            <div key={e.courseId} className="relative text-[#272727] bg-[#ece8e8] dark:bg-[#585757] dark:text-[#ece8e8] h-[530px] w-[90%] md:w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
              
              <img src={e.imageAddress} alt="" className="p-0 bg-pink-500 rounded-[20px] w-full h-[35%]"/>

              <div className="p-2 flex flex-col gap-4">

                <h3 className="text-[20px] md:text-[24px] h-[40px] mb-2.5">{e.title}</h3>

                <p className="text-[14px] md:text-[16px] w-[80%] h-[50px] text-[#787878] dark:text-[#bdbbbb] line-clamp-2">{e.describe}</p>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/icons/teacher-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[14px] md:text-[16px]">{e.teacherName}</span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/icons/calendar-03-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span>{formatPersianDate(e.startTime)} <span className="text-[#787878] dark:text-[#bdbbbb]">(شروع)</span></span>
                </div>

                <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
                  <img src="/icons/students-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                  <span className="text-[16px]">{e.capacity} دانشجو</span>
                </div>

                <div className="flex justify-between align-middle">
                  <p className="text-[20px] md:text-[24px] text-[#272727] dark:text-[#bdbbbb]">{e.cost}<span className="text-[14px] md:text-[16px] text-[#3772ff]" > تومان </span></p>
                  <div className="w-[120px] flex justify-between align-middle pt-2">
                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/icons/thumbs-up-stroke-rounded 1.png" alt="" className="h-6 w-6"/>
                      <span className="text-[14px] md:text-[16px]">{e.likeCount}</span>
                    </div>

                    <div className="w-[50px] flex justify-between align-middle">
                      <img src="/icons/thumbs-down-stroke-rounded 2.png" alt="" className="h-6 w-6"/>
                      <span className="text-[14px] md:text-[16px]">{e.dissLikeCount}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[94px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">{e.technologyList}</div>
              <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[57px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">{e.levelName}</div>

            </div>
          ))
        )
        }

        <Button color="primary" radius="full" size="lg" disableRipple className="my-5 px-2 cursor-pointer text-[16px] md:text-[20px] bg-blue-500  text-white w-[140px] h-[40px] md:w-43 md:h-14 rounded-4xl" >
        نمایش بیشتر
        </Button>

      </div>

    </div>
  )
}

export default PopularCourse