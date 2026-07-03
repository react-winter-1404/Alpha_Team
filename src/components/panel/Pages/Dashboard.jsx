import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Courses } from "../../../core/services/landing/get";
import {
  getUserCoursesComments,
  getUserNewsComments,
  getUserProfile,
} from "../../../core/services/userPanel/get";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import CommentCard from "../card/CommentCard";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon, Calendar03Icon,DashboardCircleIcon,Book02Icon,TimeSetting03Icon,BookBookmark02Icon,FileBookmarkIcon,UserEdit01Icon,MoneySend02Icon,UserSettings01Icon,Logout01Icon,MoreHorizontalCircle01Icon,Notification01Icon } from "@hugeicons/core-free-icons";

const Dashboard = () => {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [course, setCourse] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [userCoursesComments, setUserCoursesComments] = useState([]);
  const [userNewsComments, setUserNewsComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedPercent, setSubmittedPercent] = useState(0);

  const getProgressInfo = (c) => {
    if (c < 50) return { clr: "#ffc619", p: "اطلاعات کاربری شما تکمیل نیست!" };
    if (c < 100) return { clr: "#3E98C7", p: "اطلاعات کاربری شما تکمیل نیست!" };
    return { clr: "#47C724", p: "اطلاعات کاربری شما تکمیل شد" };
  };
  const pc = getProgressInfo(submittedPercent);

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
      setSubmittedPercent(response.data.profileCompletionPercentage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserCoursesComments = async () => {
    setIsLoading(true);
    try {
      const response = await getUserCoursesComments();
      setUserCoursesComments(response.data.myCommentsDtos);
      // console.log(response.data.myCommentsDtos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserNewsComments = async () => {
    setIsLoading(true);
    try {
      const response = await getUserNewsComments();
      setUserNewsComments(response.data.myNewsCommetDtos);
      console.log(response.data.myNewsCommetDtos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchUserCoursesComments();
    fetchUserNewsComments();
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
    <div className="w-full p-3 md:p-5 flex flex-col gap-4">
      <div className="w-[80%] flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
        <div className="text-[20px] md:text-[32px]  w-[500px]">
          سلام، {getGreeting()} {userProfile.fName} 😍
        </div>

        <div className="w-[300px] flex justify-between items-center gap-3 text-sm md:text-base text-[#787878]">
          <div className="flex justify-center items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full bg-overlay flex items-center justify-center">
              <HugeiconsIcon icon={Clock01Icon} className=" m-0 w-6 h-6 " />
            </div>
            <div>
              <span className="block text-[14px] md:text-[16px] text-[#787878]">
                ساعت
              </span>
              <span className="block text-[16px] text-foreground">
                {time.toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full bg-overlay flex items-center justify-center">
              <HugeiconsIcon icon={Calendar03Icon} className=" m-0 w-6 h-6 " />
            </div>
            <div>
              <span className="block text-[14px] md:text-[16px] text-[#787878]">
                تاریخ
              </span>
              <span className="block text-[16px] text-foreground">
                {fullDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-full mt-10 md:flex flex-wrap justify-center items-center gap-5  ">
        <div className="w-full md:w-[40%] h-[287px] bg-overlay rounded-[16px] p-3  ">
          <div className="h-[30px] w-full flex justify-between items-center">
            <h3 className="text-[16px] text-muted">نظرات‌ شما</h3>
          </div>
          <div className=" flex gap-2  overflow-y-auto">
            <div className=" w-full mr-2 my-1   ">دوره ها</div>
            <div className=" w-full mr-2 my-1 ">اخبار و مقالات</div>
          </div>
          <div className=" flex gap-2 h-52 overflow-y-auto">
            <div className=" w-[49%] flex flex-col gap-2 h-auto ">
              {userCoursesComments &&
                userCoursesComments.map((comment) => {
                  return (
                    <CommentCard
                      image={userProfile.currentPictureAddress}
                      author={`${userProfile.fName} ${userProfile.lName}`}
                      insertDate={new Date(
                        comment.insertDate,
                      ).toLocaleDateString("fa-IR")}
                      title={comment.title}
                      describe={comment.describe}
                    />
                  );
                })}
            </div>
            <div className=" w-[49%] flex flex-col gap-2 h-auto ">
              {userNewsComments &&
                userNewsComments.map((comment) => {
                  return (
                    <CommentCard
                      image={userProfile.currentPictureAddress}
                      author={`${userProfile.fName} ${userProfile.lName}`}
                      insertDate={new Date(
                        comment.inserDate,
                      ).toLocaleDateString("fa-IR")}
                      title={comment.title}
                      describe={comment.describe}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] h-[287px]  rounded-[16px] overflow-hidden">
          <Calendar
            value={value}
            onChange={setValue}
            calendar={persian}
            locale={persian_fa}
            className="dashboard-calendar "
          />
        </div>

        <div className="hidden md:flex w-[25%] h-[287px] bg-overlay rounded-[16px] p-3 flex-col items-center justify-center">
          <h3 className="text-[16px]  mb-4">
            وضعیت اطلاعات حساب
          </h3>
          <div className="w-[130px] h-[130px]">
            <CircularProgressbar
              value={submittedPercent}
              text={`${submittedPercent}%`}
              styles={buildStyles({
                pathColor: pc.clr,
                textColor: pc.clr,
                trailColor: "transparent",
                strokeLinecap: "round",
                textSize: "28px",
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
          <p className="text-[14px] mt-4 text-center" style={{ color: pc.clr }}>
            {pc.p}
          </p>
        </div>
      </div>

      <div className="md:hidden w-full mt-10 flex flex-wrap justify-center items-center gap-5">
        <div className="w-full md:w-[30%] h-[287px] bg-overlay rounded-[16px] overflow-hidden">
          <Calendar
            value={value}
            onChange={setValue}
            calendar={persian}
            locale={persian_fa}
            className="dashboard-calendar "
          />
        </div>

        <div className="w-full md:w-[40%] h-[287px] bg-overlay rounded-[16px] p-3">
          <div className="h-[30px] w-full flex justify-between items-center">
            <h3 className="text-[16px] text-muted">نظرات‌ شما</h3>
          </div>
          <div className=" flex gap-2  overflow-y-auto">
            <div className=" w-full mr-2 my-1   ">دوره ها</div>
            <div className=" w-full mr-2 my-1 ">اخبار و مقالات</div>
          </div>
          <div className=" flex gap-2 h-52 overflow-y-auto">
            <div className=" w-[49%] flex flex-col gap-2 h-auto ">
              {userCoursesComments &&
                userCoursesComments.map((comment) => {
                  return (
                    <CommentCard
                      image={userProfile.currentPictureAddress}
                      author={`${userProfile.fName} ${userProfile.lName}`}
                      insertDate={new Date(
                        comment.insertDate,
                      ).toLocaleDateString("fa-IR")}
                      title={comment.title}
                      describe={comment.describe}
                    />
                  );
                })}
            </div>
            <div className=" w-[49%] flex flex-col gap-2 h-auto ">
              {userNewsComments &&
                userNewsComments.map((comment) => {
                  return (
                    <CommentCard
                      image={userProfile.currentPictureAddress}
                      author={`${userProfile.fName} ${userProfile.lName}`}
                      insertDate={new Date(
                        comment.inserDate,
                      ).toLocaleDateString("fa-IR")}
                      title={comment.title}
                      describe={comment.describe}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[470px] flex flex-col justify-start items-center gap-3 mt-3 p-3 bg-overlay rounded-[16px]">
        <div className="h-[30px] w-full flex justify-between items-center">
          <h3 className="text-[16px] ">جدیدترین دوره ها</h3>
          <span className="text-[14px] text-[#3772ff] cursor-pointer">
            مشاهده همه {">"}
          </span>
        </div>

        <div className="hidden w-full h-[48px] bg-default rounded-[16px] md:flex justify-start items-center gap-3 p-3">
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

        <div className="w-full h-[470px] bg-overlay rounded-[16px] flex flex-col justify-start items-start">
          {isLoading ? (
            <p>در حال فراخوانی...</p>
          ) : (
            course.map((c) => (
              <div
                key={c.courseId}
                className="w-full h-[30px] p-2 m-auto flex justify-start items-center gap-8"
              >
                <span className="text-[20px] w-[300px]">
                  {c.title}
                </span>
                <span className="hidden md:block text-[16px] cursor-pointer w-[100px]">
                  ...
                </span>
                <span className="hidden md:block text-[16px] cursor-pointer w-[85px]">
                  ...
                </span>
                <span className="hidden md:block text-[16px] w-[150px]">
                  {formatPersianDate(c.startTime)}
                </span>
                <span className="hidden md:block text-[20px] w-[150px]">
                  {c.cost} <span>تومان</span>
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
