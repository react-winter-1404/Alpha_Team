import { useTranslation } from "react-i18next";

const MyCourses = () => {
  const { t } = useTranslation("panel");

  return (
    <>
      <div className="hidden md:block">
        <h3 className="text-[32px] text-foreground mt-5">{t("myCourses.title")}</h3>

        <div className="flex justify-start items-center gap-5 mt-7">
          <div>
            <div className="flex justify-start items-center gap-2">
              <img src="/public/icons/search-01-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px]" />
              <span className="text-[16px] text-foreground">{t("myCourses.searchCourse")}</span>
            </div>

            <div className="relative mt-3">
              <input type="text" placeholder={t("myCourses.searchPlaceholder")} className="rounded-[16px] w-[289px] h-[48px] bg-default text-[14px] text-muted indent-3 border border-border" />
              <div className="absolute top-[-1px] left-0 cursor-pointer w-[48px] h-[48px] rounded-[16px] bg-accent flex justify-center items-center">
                <img src="/public/icons/search-01-stroke-rounded 2.png" alt="" className="h-[24px] w-[24px]" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-start items-center gap-2">
              <img src="/public/icons/calendar-03-stroke-rounded 1.png" alt="" className="w-[24px] h-[24px]" />
              <span className="text-[16px] text-foreground">{t("myCourses.startDate")}</span>
            </div>

            <div dir="ltr" className="relative mt-3">
              <input type="text" placeholder="1403/5/20 - 1403/6/20" className="rounded-[16px] w-[289px] h-[48px] bg-default text-[14px] text-muted indent-3 text-left border border-border" />
            </div>
          </div>
        </div>

        <div className="mt-5 w-full h-[681px] rounded-[16px] bg-overlay p-3 flex flex-col justify-start items-center">

          <div className="w-full h-[48px] bg-default rounded-[16px] flex justify-start items-center gap-3 p-3">
            <span className="text-[16px] text-muted ml-[260px]">{t("myCourses.courseName")}</span>
            <span className="text-[16px] text-muted ml-[50px]">{t("myCourses.aboutCourse")}</span>
            <span className="text-[16px] text-muted ml-[35px]">{t("myCourses.courseTeacher")}</span>
            <span className="text-[16px] text-muted ml-[90px]">{t("myCourses.startDate")}</span>
            <span className="text-[16px] text-muted">{t("myCourses.coursePrice")}</span>
          </div>

        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex justify-between items-center">
          <h3 className="text-[32px] text-foreground">{t("myCourses.title")}</h3>

          <button className="w-[83px] h-[41px] rounded-[64px] bg-accent text-[16px] text-accent-foreground">{t("myCourses.filter")}</button>
        </div>
      </div>
    </>
  );
};

export default MyCourses;