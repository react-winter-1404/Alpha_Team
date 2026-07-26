import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BestCourses } from "../../core/services/landing/get";
import {
  addCourseLike,
  addCourseDislike,
  deleteCourseLike,
  addCourseFavorite,
} from "../../core/services/Course/post";
import { Button } from "@heroui/button";
import { Skeleton, ToggleButton } from "@heroui/react";
import { Heart } from "@gravity-ui/icons";
import { useTranslation } from "react-i18next";
import fallbackImage from "../../assets/Courses/images.png";

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

const CourseCard = ({
  viewMode,
  imageURL,
  discribtion,
  title,
  date,
  number,
  teacher,
  price,
  id,
  likeCount,
  dissLikeCount,
  technologyList,
  levelName,
  userIsLiked,
  currentUserDissLike,
  isUserFavorite,
  onUpdate,
}) => {
  const { t } = useTranslation("courses");
  const isRow = viewMode === "row";
  const navigate = useNavigate();

  const [localLikeCount, setLocalLikeCount] = useState(likeCount ?? 0);
  const [localDislikeCount, setLocalDislikeCount] = useState(dissLikeCount ?? 0);

  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [userFavorite, setUserFavorite] = useState(false);

  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  useEffect(() => {
    setUserLiked(userIsLiked === "1" || userIsLiked === true || userIsLiked === "true");
    setUserDisliked(currentUserDissLike === "1" || currentUserDissLike === true || currentUserDissLike === "true");
    setUserFavorite(isUserFavorite === true || isUserFavorite === "true" || isUserFavorite === "1");
    setLocalLikeCount(likeCount ?? 0);
    setLocalDislikeCount(dissLikeCount ?? 0);
  }, [userIsLiked, currentUserDissLike, likeCount, dissLikeCount, isUserFavorite]);

  const checkAuth = () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken || storedToken === "undefined" || storedToken === "null") throw new Error("No token");
      const token = JSON.parse(storedToken);
      if (!token) throw new Error("Invalid token");
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/Auth/Login");
      return false;
    }
  };

  const handleLike = async () => {
    if (!checkAuth() || isLiking) return;
    setIsLiking(true);
    try {
      if (userLiked) await deleteCourseLike(id);
      else await addCourseLike(id);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    if (!checkAuth() || isDisliking) return;
    setIsDisliking(true);
    try {
      if (userDisliked) await deleteCourseLike(id);
      else await addCourseDislike(id);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisliking(false);
    }
  };

  const handleFavorite = async () => {
    if (!checkAuth() || isFavoriting) return;
    setIsFavoriting(true);

    const previousState = userFavorite;
    setUserFavorite(!userFavorite);

    try {
      if (!previousState) {
        await addCourseFavorite(id);
      }
    } catch (error) {
      console.error(error);
      setUserFavorite(previousState);
    } finally {
      setIsFavoriting(false);
    }
  };

  const formattedPrice = price != null ? Number(price).toLocaleString("fa-IR") : "۰";

  return (
    <div
      className={`relative text-foreground bg-default border border-border rounded-[20px] text-right flex transition-all duration-300 ${
        isRow
          ? "w-full h-auto md:h-[240px] flex-row-reverse p-4 gap-6 items-center"
          : "w-full md:w-[22%] h-[530px] flex-col gap-2"
      }`}
      style={{ direction: "rtl" }}
    >
      <div className={`relative overflow-hidden rounded-[20px] ${isRow ? "w-[320px] h-full" : "w-full h-[35%]"}`}>
        <img
          src={imageURL ? imageURL : fallbackImage}
          alt={title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover transition-all duration-300 bg-accent"
        />
        <div className="absolute top-3 left-3 z-10">
          <ToggleButton
            isSelected={userFavorite}
            onChange={handleFavorite}
            isDisabled={isFavoriting}
            aria-label="Favorite"
            className={`min-w-10 h-10 p-0 rounded-full transition-all shadow-md backdrop-blur-sm backdrop-brightness-95 ${
              userFavorite
                ? "bg-danger text-danger-foreground hover:bg-danger/80"
                : "bg-overlay/80 text-muted hover:bg-overlay hover:scale-105"
            }`}
          >
            <Heart className={userFavorite ? "fill-current" : ""} />
          </ToggleButton>
        </div>
      </div>

      <div className={`p-2 flex flex-col justify-between flex-1 ${isRow ? "h-full py-2" : "gap-4"}`}>
        <div>
          <Link to={`/courses/${id}`} className="block">
            <h3 className="text-[20px] md:text-[24px] h-[40px] mb-2.5 font-bold hover:text-accent transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-[14px] md:text-[16px] w-[90%] h-[50px] text-muted line-clamp-2 mb-4">
            {discribtion}
          </p>
        </div>

        <div className={`flex ${isRow ? "flex-row flex-wrap gap-x-6 gap-y-2" : "flex-col gap-2"}`}>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
            <img src="/icons/teacher-stroke-rounded 1.png" alt="teacher" className="h-6 w-6" />
            <span className="text-[14px] md:text-[16px]">{teacher}</span>
          </div>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
            <img src="/icons/calendar-03-stroke-rounded 1.png" alt="calendar" className="h-6 w-6" />
            <span className="text-[14px] md:text-[16px]">
              {date} <span className="text-muted">({t("card.start")})</span>
            </span>
          </div>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
            <img src="/icons/students-stroke-rounded 1.png" alt="students" className="h-6 w-6" />
            <span className="text-[16px]">
              {number} {t("card.student")}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2">
          <p className="text-[20px] md:text-[24px] text-foreground">
            {formattedPrice}
            <span className="text-[14px] md:text-[16px] text-accent"> {t("card.toman")} </span>
          </p>
          <div className="w-[120px] flex justify-between items-center">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`w-[50px] flex justify-between items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform ${
                isLiking ? "opacity-60" : ""
              } ${userLiked ? "text-accent font-bold scale-105" : ""}`}
            >
              <img
                src="/icons/thumbs-up-stroke-rounded 1.png"
                alt="like"
                className={`h-6 w-6 transition-all ${
                  userLiked ? "scale-110 filter brightness-100 hue-rotate-[200deg] saturate-200" : ""
                }`}
              />
              <span className="text-[14px] md:text-[16px] select-none">{localLikeCount}</span>
            </button>
            <button
              onClick={handleDislike}
              disabled={isDisliking}
              className={`w-[50px] flex justify-between items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform ${
                isDisliking ? "opacity-60" : ""
              } ${userDisliked ? "text-danger font-bold scale-105" : ""}`}
            >
              <img
                src="/icons/thumbs-down-stroke-rounded 2.png"
                alt="dislike"
                className={`h-6 w-6 transition-all ${
                  userDisliked ? "scale-110 filter brightness-100 hue-rotate-[0deg] saturate-200" : ""
                }`}
              />
              <span className="text-[14px] md:text-[16px] select-none">{localDislikeCount}</span>
            </button>
          </div>
        </div>
      </div>

      {technologyList && (
        <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-accent-foreground bg-accent h-[31px] px-3 flex items-center justify-center rounded-[64px] shadow-sm">
          {technologyList}
        </div>
      )}
      {levelName && (
        <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-accent-foreground bg-accent h-[31px] px-3 flex items-center justify-center rounded-[64px] shadow-sm">
          {levelName}
        </div>
      )}
    </div>
  );
};

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

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="m-auto w-[95%] mt-15">
      <div className="m-auto w-full text-center mb-7.5">
        <span className="block text-[28px] md:text-[40px] text-foreground">
          {t("popularCourses.title")}
        </span>
        <span className="block text-[14px] md:text-[20px] text-muted">
          {t("popularCourses.subtitle")}
        </span>
      </div>

      <div className="hidden w-full h-full md:flex flex-wrap justify-center align-middle gap-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => <BasicSkeleton key={index} />)
          : course.map((e) => (
              <CourseCard
                key={e.courseId}
                id={e.courseId}
                title={e.title}
                discribtion={e.describe}
                imageURL={e.imageAddress}
                teacher={e.teacherName}
                date={formatPersianDate(e.startTime)}
                number={e.capacity}
                price={e.cost}
                likeCount={e.likeCount}
                dissLikeCount={e.dissLikeCount}
                technologyList={e.technologyList}
                levelName={e.levelName}
                userIsLiked={e.userIsLiked}
                currentUserDissLike={e.currentUserDissLike}
                isUserFavorite={e.isUserFavorite}
                onUpdate={fetchCourses}
              />
            ))}
      </div>

      <div className="md:hidden w-full h-full flex flex-wrap justify-center align-middle gap-4">
        {isLoading ? (
          Array(2)
            .fill(0)
            .map((_, index) => <BasicSkeleton key={index} />)
        ) : (
          course.slice(0, 2).map((e) => (
            <CourseCard
              key={e.courseId}
              id={e.courseId}
              title={e.title}
              discribtion={e.describe}
              imageURL={e.imageAddress}
              teacher={e.teacherName}
              date={formatPersianDate(e.startTime)}
              number={e.capacity}
              price={e.cost}
              likeCount={e.likeCount}
              dissLikeCount={e.dissLikeCount}
              technologyList={e.technologyList}
              levelName={e.levelName}
              userIsLiked={e.userIsLiked}
              currentUserDissLike={e.currentUserDissLike}
              isUserFavorite={e.isUserFavorite}
              onUpdate={fetchCourses}
            />
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