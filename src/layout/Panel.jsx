import { useEffect, useState, useRef } from "react";
import PanelPages from "../components/panel/PanelPages";
import { getUserProfile } from "../core/services/userPanel/get";
import { getUnseenNotifications } from "../core/services/userPanel/notification/get";
import { markNotificationAsSeen } from "../core/services/userPanel/notification/patch";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Book02Icon,
  TimeSetting03Icon,
  BookBookmark02Icon,
  FileBookmarkIcon,
  UserEdit01Icon,
  MoneySend02Icon,
  UserSettings01Icon,
  Logout01Icon,
  MoreHorizontalCircle01Icon,
  Notification01Icon,
  TeachingIcon,
  TaskDaily01Icon,
  CustomerSupportIcon
} from "@hugeicons/core-free-icons";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../components/theme/ThemeSwitcher";
import { useTranslation } from "react-i18next";

const Panel = () => {
  const { t } = useTranslation("panel");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [profilePic, setProfilePic] = useState("");
  const [smallMenu, setSmallMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      setProfilePic(response.data?.currentPictureAddress || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await getUnseenNotifications();
      if (Array.isArray(response)) {
        setNotifications(response);
      } else if (response?.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
    try {
      const savedRoles = localStorage.getItem("roles");
      if (savedRoles) setUserRoles(JSON.parse(savedRoles));
    } catch (e) {
      console.error(e);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLogin", "false");
    navigate("/");
  };

  const handleMarkAsSeen = async (id) => {
    try {
      await markNotificationAsSeen(id);
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    { id: "dashboard", label: t("sidebar.dashboard"), icon: DashboardCircleIcon },
    { id: "myCourse", label: t("sidebar.myCourses"), icon: Book02Icon },
    { id: "myClasses", label: "کلاس‌های من", icon: TeachingIcon },
    { id: "myAssignments", label: "تکالیف من", icon: TaskDaily01Icon },
    { id: "myTickets", label: "تیکت‌های من", icon: CustomerSupportIcon },
    { id: "myReserve", label: t("sidebar.myReserve"), icon: TimeSetting03Icon },
    { id: "favCourses", label: t("sidebar.favCourses"), icon: BookBookmark02Icon },
    { id: "favMag", label: t("sidebar.favMag"), icon: FileBookmarkIcon },
    { id: "profile", label: t("sidebar.profile"), icon: UserEdit01Icon },
  ];

  return (
    <div className="min-h-screen w-full bg-background flex flex-col md:flex-row">
      <aside className="w-64 p-4 m-4 ml-0 rounded-2xl bg-overlay border border-border hidden md:flex flex-col justify-between flex-shrink-0 self-start sticky top-4">
        <div>
          <Link to="/" className="w-full h-[45px] flex justify-center items-center gap-2 flex-shrink-0">
            <img src="/icons/Untitled-1 2.png" alt="Logo" className="w-[34px] h-[32px] md:w-[38px] md:h-[36px] object-contain" />
            <img src="/icons/Untitled-1 3.png" alt="Logo Text" className="w-[110px] md:w-[125px] h-auto object-contain mt-1" />
          </Link>

          <div className="mt-3">
            <h4 className="text-sm font-medium mb-3 text-muted">{t("sidebar.general")}</h4>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`${
                    activeTab === item.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-transparent text-foreground hover:bg-default/50"
                  } w-full h-11 rounded-[999px] text-right flex justify-start items-center cursor-pointer px-4 py-3 transition-colors`}
                >
                  <HugeiconsIcon icon={item.icon} className="ml-3 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-3 text-muted">{t("sidebar.financial")}</h4>
              <div 
                onClick={() => setActiveTab("payments")}
                className={`${
                  activeTab === "payments"
                    ? "bg-accent text-accent-foreground"
                    : "bg-transparent text-foreground hover:bg-default/50"
                } w-full h-11 rounded-[999px] text-right flex justify-start items-center cursor-pointer px-4 py-3 transition-colors`}
              >
                <HugeiconsIcon icon={MoneySend02Icon} className="ml-3 w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{t("sidebar.payments")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-default mt-4">
          <ul className="space-y-1">
            <li 
              onClick={() => setActiveTab("accounts")}
              className={`${
                activeTab === "accounts"
                  ? "bg-accent text-accent-foreground"
                  : "bg-transparent text-foreground hover:bg-default/50 border border-default"
              } w-full h-11 rounded-[999px] text-right flex justify-start items-center cursor-pointer px-4 py-3 transition-colors`}
            >
              <HugeiconsIcon icon={UserSettings01Icon} className="ml-3 w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{t("sidebar.accounts")}</span>
            </li>
            <li
              onClick={handleLogout}
              className="w-full h-11 rounded-[999px] text-right flex justify-start items-center text-danger bg-transparent border border-default cursor-pointer px-4 py-3 hover:bg-danger/10 transition-colors"
            >
              <HugeiconsIcon icon={Logout01Icon} className="ml-3 w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{t("sidebar.logout")}</span>
            </li>
          </ul>
        </div>
      </aside>

      <main className="min-h-screen w-full flex-1 p-4 md:p-8 pt-24 md:pt-8 overflow-x-hidden">
        <div className="w-full mx-auto p-2.5 rounded-2xl md:bg-overlay flex justify-between items-center gap-3 bg-overlay border border-border/50 z-[1000] shadow-sm md:shadow-none backdrop-blur-md bg-opacity-90 md:bg-opacity-100 px-4 md:px-2.5 relative">
          <div className="hidden md:flex justify-center items-center gap-3">
            <img
              src={profilePic || userProfile?.currentPictureAddress || "/default-avatar.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-base font-semibold text-foreground block truncate">
                {userProfile ? `${userProfile.fName || ""} ${userProfile.lName || ""}` : "کاربر مهمان"}
              </span>
              <span className="text-xs text-muted block truncate">
                {Array.isArray(userRoles) && userRoles.join("، ")}
              </span>
            </div>
          </div>

          <img
            onClick={() => navigate("/")}
            src="/icons/Untitled-1 2.png"
            alt="Logo"
            className="h-10 w-10 md:hidden cursor-pointer flex-shrink-0 object-contain"
          />

          <div className="flex items-center gap-3 flex-shrink-0" ref={dropdownRef}>
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative text-xl w-10 h-10 border border-border rounded-full flex items-center justify-center flex-shrink-0 hover:bg-default transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Notification01Icon} className="w-5 h-5 text-foreground" />
                {notifications.length > 0 && (
                  <div className="min-w-[20px] h-[20px] px-1 rounded-full bg-danger text-danger-foreground absolute -bottom-1.5 -right-2 flex justify-center items-center text-[10px] font-bold shadow-sm">
                    {notifications.length > 9 ? "+9" : notifications.length}
                  </div>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-overlay border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden z-[9999]">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-border bg-default/40">
                    <span className="text-xs font-bold text-foreground">اعلان‌ها</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-danger/10 text-danger font-semibold">
                      {notifications.length} جدید
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-border/50">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-muted text-xs">
                        هیچ نوتیفیکیشن خوانده نشده‌ای ندارید
                      </div>
                    ) : (
                      notifications.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleMarkAsSeen(item.id)}
                          className="p-3 hover:bg-default/60 transition-colors cursor-pointer flex flex-col gap-1 text-right"
                        >
                          <p className="text-xs text-foreground font-medium leading-relaxed">
                            {item.message}
                          </p>
                          <span className="text-[10px] text-muted">
                            {new Date(item.insertDate).toLocaleDateString("fa-IR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="p-2 border-t border-border bg-default/40 text-center">
                      <button
                        onClick={() => {
                          setIsNotificationOpen(false);
                          setActiveTab("notifications");
                        }}
                        className="w-full py-2 bg-accent text-accent-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        نمایش همه و مدیریت اعلان‌ها
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <ThemeSwitcher />
          </div>
        </div>

        <div className="mt-4 pb-20 md:pb-0">
          <PanelPages
            dashboard={activeTab === "dashboard"}
            myCourse={activeTab === "myCourse"}
            myClasses={activeTab === "myClasses"}
            myAssignments={activeTab === "myAssignments"}
            myTickets={activeTab === "myTickets"}
            myReserve={activeTab === "myReserve"}
            favCourses={activeTab === "favCourses"}
            favMag={activeTab === "favMag"}
            profile={activeTab === "profile"}
            payments={activeTab === "payments"}
            accounts={activeTab === "accounts"}
            notifications={activeTab === "notifications"}
            assignments={activeTab === "myAssignments"}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full h-[60px] rounded-t-[24px] bg-overlay border-t border-border flex justify-around items-center px-2 z-50">
        {menuItems.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`${
              activeTab === item.id ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground"
            } w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer`}
          >
            <HugeiconsIcon icon={item.icon} className="w-5 h-5" />
          </div>
        ))}

        <div
          onClick={() => setActiveTab("payments")}
          className={`${
            activeTab === "payments" ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground"
          } w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer`}
        >
          <HugeiconsIcon icon={MoneySend02Icon} className="w-5 h-5" />
        </div>

        <div
          onClick={() => setSmallMenu(!smallMenu)}
          className="relative w-11 h-11 rounded-full flex items-center justify-center bg-transparent text-foreground cursor-pointer flex-shrink-0"
        >
          <HugeiconsIcon icon={MoreHorizontalCircle01Icon} className="w-5 h-5" />
          {smallMenu && (
            <div className="absolute bottom-full left-0 mb-3 w-[220px] bg-overlay border border-border shadow-2xl rounded-2xl flex flex-col p-2 z-50 max-h-64 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.slice(3).map((item) => (
                  <li
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSmallMenu(false); }}
                    className={`${
                      activeTab === item.id ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground hover:bg-default"
                    } flex justify-start items-center gap-3 p-2 cursor-pointer rounded-xl text-xs transition-colors`}
                  >
                    <HugeiconsIcon icon={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </li>
                ))}
                <li
                  onClick={() => { setActiveTab("accounts"); setSmallMenu(false); }}
                  className={`${
                    activeTab === "accounts" ? "bg-accent text-accent-foreground" : "bg-transparent text-foreground hover:bg-default border border-default"
                  } flex justify-start items-center gap-3 p-2 cursor-pointer rounded-xl text-xs transition-colors`}
                >
                  <HugeiconsIcon icon={UserSettings01Icon} className="w-4 h-4" />
                  <span>{t("sidebar.accounts")}</span>
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    setSmallMenu(false);
                  }}
                  className="flex justify-start items-center gap-3 text-danger p-2 rounded-xl hover:bg-danger/10 text-xs cursor-pointer transition-colors border border-default"
                >
                  <HugeiconsIcon icon={Logout01Icon} className="w-4 h-4" />
                  <span>{t("sidebar.logout")}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Panel;