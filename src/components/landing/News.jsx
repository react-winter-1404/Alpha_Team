import { useEffect, useState } from "react";
import { News } from "../../core/services/landing/get";
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
        <Skeleton className="h-6 w-1/3 rounded-lg bg-default" />
        <Skeleton className="h-10 w-2/5 rounded-[65px] bg-default" />
      </div>
    </div>
  );
};

const NewsCard = ({ e, t }) => (
  <div className="relative text-foreground bg-default border border-border h-[530px] w-[90%] md:w-[22%] flex flex-col gap-2 rounded-[20px] text-right">
    <img
      src={e.currentImageAddress}
      alt=""
      className="p-0 bg-accent rounded-[20px] w-full h-[35%]"
    />

    <div className="p-2 flex flex-col gap-4">
      <h3 className="text-[20px] md:text-[24px]">{e.title}</h3>

      <p className="text-[14px] md:text-[16px] w-[80%] h-[45px] text-muted overflow-hidden">
        {e.describe}
      </p>

      <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
        <img src="/public/icons/quill-write-02-stroke-rounded 1.png" alt="" className="h-6 w-6" />
        <span className="text-[16px]">{e.addUserFullName}</span>
      </div>

      <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
        <img src="/public/icons/view-stroke-rounded (1) 1.png" alt="" className="h-6 w-6" />
        <span className="text-[16px]">{e.currentView}</span>
      </div>

      <div className="flex justify-between align-middle">
        <div className="w-[120px] flex justify-between align-middle pt-2">
          <div className="w-[50px] flex justify-between align-middle">
            <img src="/public/icons/thumbs-up-stroke-rounded 1.png" alt="" className="h-6 w-6" />
            <span className="text-[16px]">{e.currentLikeCount}</span>
          </div>

          <div className="w-[50px] flex justify-between align-middle">
            <img src="/public/icons/thumbs-down-stroke-rounded 2.png" alt="" className="h-6 w-6" />
            <span className="text-[16px]">{e.currentDissLikeCount}</span>
          </div>
        </div>

        <button className="w-[40%] h-[40px] bg-accent rounded-[65px] text-[14px] md:text-[16px] text-accent-foreground">
          {t("news.readMore")}
        </button>
      </div>
    </div>

    <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-accent-foreground bg-accent h-[31px] w-[94px] flex items-center justify-center rounded-[64px] shadow-sm"></div>
    <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-accent-foreground bg-accent h-[31px] w-[57px] flex items-center justify-center rounded-[64px] shadow-sm">
      {e.newsCatregoryName}
    </div>
  </div>
);

const NewsBar = () => {
  const { t } = useTranslation("home");
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await News({ pageNumber: 1, rowsOfPage: 4 });
        setCourse(response.data.news);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="m-auto mt-[60px] w-[95%]">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[28px] md:text-[40px] text-foreground">{t("news.title")}</span>
        <span className="block text-[14px] md:text-[20px] text-muted">
          {t("news.subtitle")}
        </span>
      </div>

      <div className="hidden w-full h-full md:flex flex-wrap justify-center align-middle gap-4">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => <BasicSkeleton key={index} />)
        ) : (
          course.map((e) => <NewsCard key={e.id} e={e} t={t} />)
        )}
      </div>

      <div className="md:hidden w-full h-full flex flex-wrap justify-center align-middle gap-4">
        {isLoading ? (
          Array(2).fill(0).map((_, index) => <BasicSkeleton key={index} />)
        ) : (
          course.slice(0, 2).map((e) => <NewsCard key={e.id} e={e} t={t} />)
        )}

        <Button
          color="primary"
          radius="full"
          size="lg"
          disableRipple
          className="my-5 px-2 cursor-pointer text-[16px] md:text-[20px] bg-accent text-accent-foreground w-[140px] h-[40px] md:w-43 md:h-14 rounded-4xl mx-auto"
        >
          {t("news.showMore")}
        </Button>
      </div>
    </div>
  );
};

export default NewsBar;