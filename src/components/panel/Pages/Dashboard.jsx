import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Courses } from "../../../core/services/get";
import { getUserProfile } from "../../../core/services/userPanel/get";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [course, setCourse] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
   const [submittedPercent, setSubmittedPercent] = useState(0);

   const getProgressInfo = (c) => {
    if (c < 50) return { clr: "#ffc619", p: "اطلاعات کاربری شما تکمیل نیست!" };
    if (c < 100) return { clr: "#3E98C7", p: "اطلاعات کاربری شما تکمیل نیست!" };
    return { clr: "#47C724", p: "اطلاعات کاربری شما تکمیل شد" };
  };
     const pc = getProgressInfo( submittedPercent);


  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        const response = await Courses({ pageNumber: 1, rowsOfPage: 4 });
        setCourse(response.data.courseDtos);
        console.log("دیتای دریافتی از سمت سرور", response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      console.log(response.data);
      setSubmittedPercent(response.data.profileCompletionPercentage)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const formatPersianDate = (isoString) => {
    if (!isoString) return "—";
    const date = new Date(isoString);

    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const getGreeting = () => {
    const hour = time.getHours();

    if (hour >= 5 && hour < 12) return "صبح بخیر";
    if (hour >= 12 && hour < 15) return "ظهر بخیر";
    if (hour >= 15 && hour < 19) return "عصر بخیر";
    return "شب بخیر";
  };

  const now = new Date();
  const day = now.toLocaleDateString("fa-IR", { day: "numeric" });
  const month = now.toLocaleDateString("fa-IR", { month: "long" });
  const year = now.toLocaleDateString("fa-IR", { year: "numeric" });
  const fullDate = `${day} ${month} ${year}`;

  return (
    <div className="w-full mt-5 p-3 flex flex-col justify-center items-start">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-[32px] text-[#272727] w-[500px]">
          سلام، {getGreeting()} {userProfile.fName} 😍
        </h2>

        <div className="w-full flex justify-center items-center gap-15">
          <div className="flex justify-center items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full bg-[#fefdff] flex items-center justify-center">
              <img
                src="/public/icons/clock-01-stroke-rounded 2.png"
                alt=""
                className="w-[24px] h-[24px] m-auto"
              />
            </div>

            <div>
              <span className="block text-[16px] text-[#787878]">ساعت</span>
              <span className="block text-[16px] text-[#272727]">
                {time.toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full bg-[#fefdff] flex items-center justify-center">
              <img
                src="/public/icons/calendar-03-stroke-rounded 1.png"
                alt=""
                className="w-[24px] h-[24px] m-auto"
              />
            </div>

            <div>
              <span className="block text-[16px] text-[#787878]">تاریخ</span>
              <span className="block text-[16px] text-[#272727]">
                {fullDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] mt-10 flex justify-center items-center gap-5">
        <div className="w-[40%] h-[287px] bg-[#fefdff] rounded-[16px] p-3">
          <div className="h-[30px] w-full flex justify-between items-center">
            <h3 className="text-[16px] text-[#272727]">نظرات‌ شما</h3>
            <span className="text-[14px] text-[#3772ff] cursor-pointer">
              مشاهده همه {">"}
            </span>
          </div>

          <div></div>
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
              height: "90%",
              borderRadius: "16px",
              border: "none",
              paddingRight: "17px",
              boxShadow: "none",
            }}
          />
        </div>

        <div className="w-[30%] h-[287px] bg-[#fefdff] rounded-[16px] flex flex-col ">
          <h3 className="text-[16px] text-[#272727] mt-3 mr-2 ">وضعیت اطلاعات حساب</h3>
        <div className="m-auto mt-[40px] h-[130px] w-[136px]">
          <CircularProgressbar
            value={ submittedPercent}
            text={`${ submittedPercent}%`}
            styles={buildStyles({
              pathColor: pc.clr,
              textColor: pc.clr,
              trailColor: "#f0f0f0",
              strokeLinecap: "round",
              textSize: "34px",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
        <p
          className="text-[14px] mt-[20px] text-center mb-7 "
          style={{ color: pc.clr }}
        >
          {pc.p}
        </p>
        </div>
      </div>

      <div className="w-full h-[470px] flex flex-col justify-start items-center gap-3 mt-3 p-3 bg-[#fefdff] rounded-[16px]">
        <div className="h-[30px] w-full flex justify-between items-center">
          <h3 className="text-[16px] text-[#272727]">جدیدترین دوره ها</h3>
          <span className="text-[14px] text-[#3772ff] cursor-pointer">
            مشاهده همه {">"}
          </span>
        </div>

        <div className="w-full h-[48px] bg-[#f0f0f0] rounded-[16px] flex justify-start items-center gap-3 p-3">
          <span className="text-[16px] text-[#787878] ml-[260px]">
            نام دوره
          </span>
          <span className="text-[16px] text-[#787878] ml-[50px]">
            درباره دوره
          </span>
          <span className="text-[16px] text-[#787878] ml-[35px]">
            اساتید دوره
          </span>
          <span className="text-[16px] text-[#787878] ml-[90px]">
            تاریخ برگزاری
          </span>
          <span className="text-[16px] text-[#787878]">قیمت دوره</span>
        </div>

        <div className="w-full h-[470px] bg-[#fefdff] rounded-[16px] flex flex-col justify-start items-start">
          {isLoading ? (
            <p>در حال فراخوانی...</p>
          ) : (
            course.map((c) => (
              <div
                key={c.courseId}
                className="w-full h-[30px] p-2 m-auto flex justify-start items-center gap-8"
              >
                <span className="text-[20px] text-[#272727] w-[300px]">
                  {c.title}
                </span>
                <span className="text-[16px] text-[#272727] cursor-pointer w-[100px]">
                  ...
                </span>
                <span className="text-[16px] text-[#272727] cursor-pointer w-[85px]">
                  ...
                </span>
                <span className="text-[16px] text-[#272727] w-[150px]">
                  {formatPersianDate(c.startTime)}
                </span>
                <span className="text-[20px] text-[#272727] w-[150px]">
                  {c.cost}
                  <span>تومان</span>
                </span>
                <img
                  src="/public/icons/view-stroke-rounded 1.png"
                  alt=""
                  className="w-[24px] h-[24px] cursor-pointer"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
