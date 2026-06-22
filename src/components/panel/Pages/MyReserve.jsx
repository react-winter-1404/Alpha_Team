import { useEffect, useState } from "react";
import { getUserCoursesReserve } from "../../../core/services/userPanel/get";
import RowCourseCard from "../card/RowCourseCard";
import { Spinner } from "@heroui/react";

const MyReserve = () => {
  const [myCoursesReserve, setMyCoursesReserve] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserCoursesReserve();
      setMyCoursesReserve(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>

    <div className="hidden md:block">
      <h3 className="text-[32px] text-[#272727] mt-5">رزرو من</h3>

      <div className="flex justify-start items-center gap-5 mt-7">
        <div>
          <div className="flex justify-start items-center gap-2">
            <img
              src="/public/icons/search-01-stroke-rounded 1.png"
              alt=""
              className="w-[24px] h-[24px]"
            />
            <span className="text-[16px] text-[#272727]">جستجوِی دوره</span>
          </div>

          <div className="relative mt-3">
            <input
              type="text"
              placeholder="جستجو کنید ..."
              className="w-[289px] h-[48px] bg-[#bebebe] text-[14px] text-[#787878] indent-3"
            />
            <div className="absolute top-[-1px] left-0 cursor-pointer w-[48px] h-[48px] rounded-[16px] bg-[#3772ff] flex justify-center items-center">
              <img
                src="/public/icons/search-01-stroke-rounded 2.png"
                alt=""
                className="h-[24px] w-[24px]"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-start items-center gap-2">
            <img
              src="/public/icons/calendar-03-stroke-rounded 1.png"
              alt=""
              className="w-[24px] h-[24px]"
            />
            <span className="text-[16px] text-[#272727]">تاریخ برگزاری</span>
          </div>

          <div dir="ltr" className="relative mt-3">
            <input
              type="text"
              placeholder="1403/5/20 - 1403/6/20"
              className="w-[289px] h-[48px] bg-[#bebebe] text-[14px] text-[#787878] indent-3 text-left"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <label htmlFor="a">ترتیب</label>
          <div id="a" className="flex justify-center items-center gap-2">
            <div className="h-[41px] w-[101px] cursor-pointer rounded-[64px] bg-[#3772ff] text-[16px] text-[#fefdff] flex justify-center items-center">
              تایید شده
            </div>
            <div className="h-[41px] w-[101px] cursor-pointer rounded-[64px] bg-[#f0f0f0] text-[16px] text-[#272727] flex justify-center items-center border border-1 border-[#787878]">
              تایید نشده
            </div>
            <span className="">|</span>
            <div className="h-[41px] w-[101px] cursor-pointer rounded-[64px] bg-[#f0f0f0] text-[16px] text-[#ff5454] flex justify-center items-center gap-2 border border-1 border-[#ff5454]">
              <img
                src="/public/icons/cancel-01-stroke-rounded 1.png"
                alt=""
                className="w-[16px] h-[16px] mt-1"
              />
              <span>حذف</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full h-[681px] rounded-[16px] bg-[#fefdff] p-3 flex flex-col justify-start items-center">
        <div className="w-full h-[48px] text-muted bg-[#f0f0f0] rounded-[16px] flex justify-between items-center  p-3">
          <span className="w-[13%] flex justify-center ">#</span>
          <span className="w-[13%] flex justify-center ">نام دوره</span>
          <span className="w-[15%] flex justify-center ">استاد دوره</span>
          <span className="w-[15%] flex justify-center ">شروع دوره</span>
          <span className="w-[15%] flex justify-center ">قیمت دوره</span>
          <span className="w-[15%] flex justify-center ">وضعیت ثبت نام</span>
          <span className="w-[10%] flex justify-center "></span>
        </div>

        <div className="  border-black flex flex-col gap-4 w-full h-full py-4 px-3 overflow-auto ">
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-[#787878] text-lg">
             <Spinner />
            </div>
          ) : myCoursesReserve.length === 0 ? (
            <div className="flex justify-center items-center h-full text-[#787878] text-lg">
              دوره رزرو شده‌ای یافت نشد
            </div>
          ) : (
            myCoursesReserve.map((course) => (
              <RowCourseCard key={course.id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>

    <div className="block md:hidden">
      <div className="flex justify-between items-center ">
        <h3 className="text-[32px] text-[#272727]">رزرو من</h3>

        <button className="w-[83px] h-[41px] rounded-[64px] bg-[#3772ff] text-[16px] text-[#fefdff]">فیلتر</button>
      </div>

    </div>
    </>
    
  )
}

export default MyReserve;
