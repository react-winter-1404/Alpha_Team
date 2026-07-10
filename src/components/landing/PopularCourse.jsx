import { useEffect, useState } from "react";
import { BestCourses } from "../../core/services/landing/get";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/react";
import { useTranslation } from "react-i18next";

const BasicSkeleton = () => {
  return (
    <div className="shadow-panel w-full md:w-[22%] h-[530px] space-y-5 rounded-[20px] bg-overlay border border-border p-4 flex flex-col justify-between">
      <Skeleton className="h-[35%] rounded-lg bg-default" />
      <div className="space-y-3 flex-1 mt-4">
        <Skeleton className="h-6 w-3/5 rounded-lg bg-default" />
        <Skeleton className="h-4 w-4/5 rounded-lg bg-default" />
        <Skeleton className="h-4 w-2/5 rounded-lg bg-default" />
      </div>
      <div className="flex justify-between items-center mt-auto">
        <Skeleton className="h-6 w-1/4 rounded-lg bg-default" />
        <Skeleton className="h-6 w-1/3 rounded-lg bg-default" />
      </div>
    </div>
  );
};

const CourseCard = ({ e, formatPersianDate, t }) => (
  <div className="relative text-foreground bg-default border border-border h-[530px] w-[90%] md:w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
    <img
      src={e.imageAddress}
      alt=""
      className="p-0 bg-accent rounded-[20px] w-full h-[35%]"
    />

    <div className="p-2 flex flex-col gap-4">
      <h3 className="text-[20px] md:text-[24px] h-[40px] mb-2.5">{e.title}</h3>

      <p className="text-[14px] md:text-[16px] w-[80%] h-[50px] text-muted line-clamp-2">
        {e.describe}
      </p>

      <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
        <img src="/icons/teacher-stroke-rounded 1.png" alt="" className="h-6 w-6" />
        <span className="text-[14px] md:text-[16px]">{e.teacherName}</span>
      </div>

      <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
        <img src="/icons/calendar-03-stroke-rounded 1.png" alt="" className="h-6 w-6" />
        <span>
          {formatPersianDate(e.startTime)}{" "}
          <span className="text-muted">({t("popularCourses.start")})</span>
        </span>
      </div>

      <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
        <img src="/icons/students-stroke-rounded 1.png" alt="" className="h-6 w-6" />
        <span className="text-[16px]">{e.capacity} {t("popularCourses.student")}</span>
      </div>

      <div className="flex justify-between align-middle">
        <p className="text-[20px] md:text-[24px] text-foreground">
          {e.cost}
          <span className="text-[14px] md:text-[16px] text-accent"> {t("popularCourses.toman")} </span>
        </p>
        <div className="w-[120px] flex justify-between align-middle pt-2">
          <div className="w-[50px] flex justify-between align-middle">
            <img src="/icons/thumbs-up-stroke-rounded 1.png" alt="" className="h-6 w-6" />
            <span className="text-[14px] md:text-[16px]">{e.likeCount}</span>
          </div>

          <div className="w-[50px] flex justify-between align-middle">
            <img src="/icons/thumbs-down-stroke-rounded 2.png" alt="" className="h-6 w-6" />
            <span className="text-[14px] md:text-[16px]">{e.dissLikeCount}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-accent-foreground bg-accent h-[31px] w-[94px] flex items-center justify-center rounded-[64px] shadow-sm">
      {e.technologyList}
    </div>
    <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-accent-foreground bg-accent h-[31px] w-[57px] flex items-center justify-center rounded-[64px] shadow-sm">
      {e.levelName}
    </div>
  </div>
);

const PopularCourse = () => {
  const { t } = useTranslation("home");

  const formatPersianDate = (isoString) => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await BestCourses({ count: 4 });
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="m-auto w-[95%] mt-15">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[28px] md:text-[40px] text-foreground">{t("popularCourses.title")}</span>
        <span className="block text-[14px] md:text-[20px] text-muted">
          {t("popularCourses.subtitle")}
        </span>
      </div>

      <div className="hidden w-full h-full md:flex flex-wrap justify-center align-middle gap-4">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => <BasicSkeleton key={index} />)
        ) : (
          course.map((e) => (
            <CourseCard key={e.courseId} e={e} formatPersianDate={formatPersianDate} t={t} />
          ))
        )}
      </div>

      <div className="md:hidden w-full h-full flex flex-wrap justify-center align-middle gap-4">
        {isLoading ? (
          Array(2).fill(0).map((_, index) => <BasicSkeleton key={index} />)
        ) : (
          course.slice(0, 2).map((e) => (
            <CourseCard key={e.courseId} e={e} formatPersianDate={formatPersianDate} t={t} />
          ))
        )}

        <Button
          color="primary"
          radius="full"
          size="lg"
          disableRipple
          className="my-5 px-2 cursor-pointer text-[16px] md:text-[20px] bg-accent text-accent-foreground w-[140px] h-[40px] md:w-43 md:h-14 rounded-4xl mx-auto"
        >
          {t("popularCourses.showMore")}
        </Button>
      </div>
    </div>
  );
};

export default PopularCourse;