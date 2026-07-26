import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { News } from "../../core/services/landing/get";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/react";
import { useTranslation } from "react-i18next";
import fallbackImage from "../../assets/Courses/images.png";

const BasicSkeleton = () => {
  return (
    <div className="shadow-panel w-full md:w-[22%] h-[510px] space-y-4 rounded-[20px] bg-overlay border border-border p-4 flex flex-col justify-between">
      <Skeleton className="h-[35%] rounded-lg bg-default" />
      <div className="space-y-3 flex-1 mt-3">
        <Skeleton className="h-6 w-3/5 rounded-lg bg-default" />
        <Skeleton className="h-4 w-4/5 rounded-lg bg-default" />
        <Skeleton className="h-4 w-2/5 rounded-lg bg-default" />
      </div>
      <div className="flex justify-between items-center mt-auto pt-2">
        <Skeleton className="h-6 w-1/3 rounded-lg bg-default" />
        <Skeleton className="h-9 w-2/5 rounded-[65px] bg-default" />
      </div>
    </div>
  );
};

const NewsCard = ({ e, t }) => (
  <div className="relative text-foreground bg-default border border-border h-[510px] w-[90%] md:w-[22%] flex flex-col rounded-[20px] text-right overflow-hidden transition-all duration-300">
    <div className="relative w-full h-[35%] overflow-hidden">
      <img
        src={e.currentImageAddress || fallbackImage}
        alt={e.title || "News"}
        onError={(err) => {
          err.currentTarget.onerror = null;
          err.currentTarget.src = fallbackImage;
        }}
        className="w-full h-full object-cover bg-accent"
      />
    </div>

    <div className="p-3 flex flex-col justify-between flex-1 gap-2">
      <div>
        <Link to={`/news/${e.id}`} className="block">
          <h3 className="text-[18px] md:text-[20px] font-bold h-[32px] mb-1 hover:text-accent transition-colors line-clamp-1">
            {e.title}
          </h3>
        </Link>

        <p className="text-[13px] md:text-[15px] w-full h-[40px] text-muted line-clamp-2 mb-2">
          {e.describe}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[14px] flex justify-start items-center gap-2">
          <img src="/icons/quill-write-02-stroke-rounded 1.png" alt="author" className="h-5 w-5" />
          <span className="text-[13px] md:text-[14px] line-clamp-1">{e.addUserFullName}</span>
        </div>

        <div className="text-[14px] flex justify-start items-center gap-2">
          <img src="/icons/view-stroke-rounded (1) 1.png" alt="views" className="h-5 w-5" />
          <span className="text-[13px] md:text-[14px]">{e.currentView}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <img src="/icons/thumbs-up-stroke-rounded 1.png" alt="like" className="h-5 w-5" />
            <span className="text-[13px] md:text-[14px]">{e.currentLikeCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <img src="/icons/thumbs-down-stroke-rounded 2.png" alt="dislike" className="h-5 w-5" />
            <span className="text-[13px] md:text-[14px]">{e.currentDissLikeCount}</span>
          </div>
        </div>

        <Link to={`/news/${e.id}`}>
          <button className="px-4 h-[36px] bg-accent rounded-[65px] text-[13px] md:text-[14px] text-accent-foreground font-medium hover:opacity-90 active:scale-95 transition-all">
            {t("news.readMore")}
          </button>
        </Link>
      </div>
    </div>

    {e.newsCatregoryName && (
      <div className="absolute top-2 right-3 text-[12px] text-accent-foreground bg-accent h-[28px] px-3 flex items-center justify-center rounded-[64px] shadow-sm">
        {e.newsCatregoryName}
      </div>
    )}
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