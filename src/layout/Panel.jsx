import { useEffect, useState } from "react";
import PanelPages from "../components/panel/PanelPages";
import { getUserProfile } from "../core/services/userPanel/get";
import { useTheme } from "@heroui/use-theme";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@heroui/button";
import { Link, useNavigate } from "react-router-dom";

const Panel = () => {
  const [dashboard, setDashboard] = useState(true);
  const [myCourse, setMyCourse] = useState(false);
  const [myReserve, setMyReserve] = useState(false);
  const [favCourses, setFavCourses] = useState(false);
  const [favMag, setFavMag] = useState(false);
  const [profile, setProfile] = useState(false);
  const { theme, setTheme } = useTheme("system");
  const [profilePic, setProfilePic] = useState("");

  const [smallMenu, setSmallMenu] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [userRoles, setUserRoles] = useState("");

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      setProfilePic(response.data.currentPictureAddress || "");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    setUserRoles(JSON.parse(localStorage.getItem("roles")));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen min-h-screen p-3 md:p-5 flex flex-col md:flex-row gap-3 bg-default overflow-auto">
      <div className="hidden md:block md:w-[276px] md:h-[950px] p-4 rounded-[16px] bg-overlay">
        <Link
          to={"/"}
          className=" w-full h-[60px] flex justify-center items-center"
        >
          <img
            src="/public/icons/Untitled-1 2.png"
            alt=""
            className="w-[54px] h-[52px]"
          />
          <img
            src="/public/icons/Untitled-1 3.png"
            alt=""
            className="mt-4 w-[189.1px] h-[37.69px]"
          />
        </Link>

        <div className="flex flex-col  items-start mt-10">
          <div>
            <h4 className="text-[16px] mb-2.5 text-[#787878]">عمومی</h4>
            <ul className="w-full">
              <li
                onClick={() => {
                  setDashboard(true);
                  setMyCourse(false);
                  setMyReserve(false);
                  setFavCourses(false);
                  setFavMag(false);
                  setProfile(false);
                }}
                className={` ${dashboard ? "bg-accent text-accent-foreground " : "bg-default text-muted "} mb-[10px] w-[228px] h-[53px] rounded-[38px]  text-right flex justify-start items-center cursor-pointer`}
              >
                <img
                  src="/public/icons/dashboard-circle-stroke-rounded 1.png"
                  alt=""
                  className="h-[24px] w-[24px] mr-3"
                />
                <span className="text-[18px] indent-4 ">داشبورد</span>
              </li>

              <li
                onClick={() => {
                  setDashboard(false);
                  setMyCourse(true);
                  setMyReserve(false);
                  setFavCourses(false);
                  setFavMag(false);
                  setProfile(false);
                }}
                className={` ${myCourse ? "bg-accent text-accent-foreground " : "bg-default text-muted "} mb-[10px] w-[228px] h-[53px] rounded-[38px]  text-right flex justify-start items-center cursor-pointer`}
              >
                <img
                  src="/public/icons/book-02-stroke-rounded 1.png"
                  alt=""
                  className="h-[24px] w-[24px] mr-3"
                />
                <span className="text-[18px]  indent-4">دوره من</span>
              </li>

              <li
                onClick={() => {
                  setDashboard(false);
                  setMyCourse(false);
                  setMyReserve(true);
                  setFavCourses(false);
                  setFavMag(false);
                  setProfile(false);
                }}
                className={` ${myReserve ? "bg-accent text-accent-foreground " : "bg-default text-muted "} mb-[10px] w-[228px] h-[53px] rounded-[38px]  text-right flex justify-start items-center cursor-pointer`}
              >
                <img
                  src="/public/icons/time-setting-03-stroke-rounded 1.png"
                  alt=""
                  className="h-[24px] w-[24px] mr-3"
                />
                <span className="text-[18px]   indent-4">رزرو من</span>
              </li>

              <li
                onClick={() => {
                  setDashboard(false);
                  setMyCourse(false);
                  setMyReserve(false);
                  setFavCourses(true);
                  setFavMag(false);
                  setProfile(false);
                }}
                className={` ${favCourses ? "bg-accent text-accent-foreground " : "bg-default text-muted "} mb-[10px] w-[228px] h-[53px] rounded-[38px]  text-right flex justify-start items-center cursor-pointer`}
              >
                <img
                  src="/public/icons/book-bookmark-02-stroke-rounded 1.png"
                  alt=""
                  className="h-[24px] w-[24px] mr-3"
                />
                <span className="text-[18px]  indent-4">علاقه مندی دوره</span>
              </li>

              <li
                onClick={() => {
                  setDashboard(false);
                  setMyCourse(false);
                  setMyReserve(false);
                  setFavCourses(false);
                  setFavMag(true);
                  setProfile(false);
                }}
                className={` ${favMag ? "bg-accent text-accent-foreground " : "bg-default text-muted "} mb-[10px] w-[228px] h-[53px] rounded-[38px]  text-right flex justify-start items-center cursor-pointer`}
              >
                <img
                  src="/public/icons/file-bookmark-stroke-rounded 1.png"
                  alt=""
                  className="h-[24px] w-[24px] mr-3"
                />
                <span className="text-[18px]  indent-4">علاقه مندی مقالات</span>
              </li>

              <li
                onClick={() => {
                  setDashboard(false);
                  setMyCourse(false);
                  setMyReserve(false);
                  setFavCourses(false);
                  setFavMag(false);
                  setProfile(true);
                }}
                className={` ${profile ? "bg-accent text-accent-foreground " : "bg-default text-muted "} mb-[10px] w-[228px] h-[53px] rounded-[38px]  text-right flex justify-start items-center cursor-pointer`}
              >
                <img
                  src="/public/icons/user-edit-01-stroke-rounded 1.png"
                  alt=""
                  className="h-[24px] w-[24px] mr-3"
                />
                <span className="text-[18px]  indent-4">پروفایل</span>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="text-[16px] mb-2.5 text-[#787878]">مالی</h4>

            <div className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center bg-default text-muted cursor-pointer">
              <img
                src="/public/icons/money-send-02-stroke-rounded 1.png"
                alt=""
                className="h-[24px] w-[24px] mr-3"
              />
              <span className="text-[18px] indent-4 ">پرداخت ها</span>
            </div>
          </div>
        </div>

        <div className="mt-40">
          <ul>
            <li className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center text-muted bg-default cursor-pointer">
              <img
                src="/public/icons/user-settings-01-stroke-rounded 1.png"
                alt=""
                className="h-[24px] w-[24px] mr-3"
              />
              <span className="text-[18px]  indent-4">حساب های کاربری</span>
            </li>

            <li className="mb-[10px] w-[228px] h-[53px] rounded-[38px] text-right flex justify-start items-center  bg-default cursor-pointer">
              <img
                src="/public/icons/logout-03-stroke-rounded 1.png"
                alt=""
                className="h-[24px] w-[24px] mr-3"
              />
              <span className="text-[18px] text-[#ff5454] indent-4">
                خروج از حساب
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 w-full rounded-[16px]">
        <div className="w-full p-2.5 rounded-[16px] md:bg-[#fefdff] flex sm:flex-row justify-between items-center gap-3">
          <div className="hidden w-[200px] h-full md:flex justify-center items-center gap-3">
            <img
              src={profilePic || userProfile.currentPictureAddress}
              alt=""
              className="w-[56px] h-[56px] rounded-full"
            />

            <div>
              <span className="text-[20px]  flex">
                {userProfile.fName + " " + userProfile.lName}
              </span>

              <span className="text-[16px]  block">
                {userRoles &&
                  userRoles.map((role, index) => (
                    <span key={index}>
                      {role}
                      {index < userRoles.length - 1 && ", "}
                    </span>
                  ))}
              </span>
            </div>
          </div>

          <img
            onClick={() => navigate("/")}
            src="/public/icons/Untitled-1 2.png"
            alt=""
            className="h-[40px] w-[40px] md:hidden cursor-pointer"
          />

          <div className="flex justify-between items-center w-[120px] h-full">
            <button className="relative w-[56px] h-[56px] border-solid border dark:border-gray-600 rounded-full border-gray-200 text-center">
              <img
                src="/public/icons/notification-02-stroke-rounded 1.png"
                alt=""
                className="m-auto"
              />
              <div className="w-[20px] h-[20px] rounded-full bg-[#ff5454] border border-[2px] absolute top-[35px] flex justify-center items-center text-[14px]">
                5
              </div>
            </button>
            <Button
              isIconOnly
              disableRipple
              variant="flat"
              onPress={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-xl w-[56px] h-[56px] cursor-pointer border-solid border dark:border-gray-600 rounded-full border-gray-200 text-center flex items-center justify-center "
            >
              {theme === "light" ? (
                <HugeiconsIcon icon={Moon02Icon} className=" m-0 w-6 h-6 " />
              ) : (
                <HugeiconsIcon icon={Sun03Icon} className=" m-0 w-6 h-6 " />
              )}
            </Button>
          </div>
        </div>

        <PanelPages
          dashboard={dashboard}
          myCourse={myCourse}
          myReserve={myReserve}
          favCourses={favCourses}
          favMag={favMag}
          profile={profile}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />
      </div>

      <div className="md:hidden w-full h-[60px] rounded-[30px] bg-[#fefdff] border-1 border-[#f0f0f0] flex justify-between items-center">
        <div
          onClick={() => {
            setDashboard(true);
            setMyCourse(false);
            setMyReserve(false);
            setFavCourses(false);
            setFavMag(false);
            setProfile(false);
          }}
          className="w-[50px] h-[50px] rounded-[38px] bg-[#3772ff] flex items-center"
        >
          <img
            src="/public/icons/dashboard-circle-stroke-rounded 1.png"
            alt=""
            className="w-[32px] h-[32px] m-auto"
          />
        </div>

        <div
          onClick={() => {
            setDashboard(false);
            setMyCourse(true);
            setMyReserve(false);
            setFavCourses(false);
            setFavMag(false);
            setProfile(false);
          }}
          className="w-[50px] h-[50px] rounded-[38px] bg-[#3772ff] flex items-center bg-default"
        >
          <img
            src="/public/icons/book-02-stroke-rounded 1.png"
            alt=""
            className="w-[32px] h-[32px] m-auto"
          />
        </div>

        <div
          onClick={() => {
            setDashboard(false);
            setMyCourse(false);
            setMyReserve(true);
            setFavCourses(false);
            setFavMag(false);
            setProfile(false);
          }}
          className="w-[50px] h-[50px] rounded-[38px] bg-[#3772ff] flex items-center bg-default"
        >
          <img
            src="/public/icons/time-setting-03-stroke-rounded 1.png"
            alt=""
            className="w-[32px] h-[32px] m-auto"
          />
        </div>

        <div
          onClick={() => {
            setDashboard(false);
            setMyCourse(false);
            setMyReserve(false);
            setFavCourses(false);
            setFavMag(false);
            setProfile(true);
          }}
          className="w-[50px] h-[50px] rounded-[38px] bg-[#3772ff] flex items-center bg-default"
        >
          <img
            src="/public/icons/dashboard-circle-stroke-rounded 1.png"
            alt=""
            className="w-[32px] h-[32px] m-auto"
          />
        </div>

        <div
          onClick={() => setSmallMenu(!smallMenu)}
          className="relative w-[50px] h-[50px] rounded-[38px] bg-[#3772ff] flex items-center bg-default"
        >
          <img
            src="/public/icons/more-vertical-circle-01-stroke-rounded 1.png"
            alt=""
            className="w-[32px] h-[32px] m-auto"
          />

          {smallMenu && (
            <div className="absolute top-[-250px] left-2 w-[221px] h-[248px] rounded-[16px] bg-[#ffff] flex flex-col justify-center items-center">
              <ul className="m-0 p-0">
                <li
                  onClick={() => {
                    setDashboard(false);
                    setMyCourse(false);
                    setMyReserve(false);
                    setFavCourses(true);
                    setFavMag(false);
                    setProfile(false);
                  }}
                  className="flex justify-start items-center gap-3 p-2"
                >
                  <img
                    src="/public/icons/book-bookmark-02-stroke-rounded 1.png"
                    alt=""
                    className="w-[24px] h-[24px] "
                  />
                  <span className="text-[16px] ">علاقه‌مندی دوره</span>
                </li>

                <li
                  onClick={() => {
                    setDashboard(false);
                    setMyCourse(false);
                    setMyReserve(false);
                    setFavCourses(false);
                    setFavMag(true);
                    setProfile(false);
                  }}
                  className="flex justify-start items-center gap-3 p-2"
                >
                  <img
                    src="/public/icons/file-bookmark-stroke-rounded 1.png"
                    alt=""
                    className="w-[24px] h-[24px] "
                  />
                  <span className="text-[16px] ">علاقه‌مندی مقاله</span>
                </li>

                <li className="flex justify-start items-center gap-3 p-2">
                  <img
                    src="/public/icons/money-send-02-stroke-rounded 1.png"
                    alt=""
                    className="w-[24px] h-[24px] "
                  />
                  <span className="text-[16px] text-muted ">پرداخت ها</span>
                </li>

                <li className="flex justify-start items-center gap-3 p-2">
                  <img
                    src={userProfile.currentPictureAddress}
                    alt=""
                    className="w-[24px] h-[24px] "
                  />
                  <span className="text-[16px] ">حساب‌های کاربری</span>
                </li>

                <li className="flex justify-start items-center gap-3 p-2">
                  <img
                    src="/public/icons/logout-03-stroke-rounded 1.png"
                    alt=""
                    className="w-[24px] h-[24px] "
                  />
                  <span className="text-[16px] text-[#ff5454]">
                    خروج از حساب
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
