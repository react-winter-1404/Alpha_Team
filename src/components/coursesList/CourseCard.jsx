import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "@gravity-ui/icons";
import { ToggleButton } from "@heroui/react";
import { addCourseLike, addCourseDislike, deleteCourseLike, addCourseFavorite } from "../../core/services/Course/post";

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
  onUpdate
}) => {
  const isRow = viewMode === 'row';
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

  return (
    <div className={`relative text-[#272727] bg-[#ece8e8] dark:bg-[#585757] dark:text-[#ece8e8] rounded-[20px] text-right flex transition-all duration-300 ${isRow ? 'w-full h-auto md:h-[240px] flex-row-reverse p-4 gap-6 items-center' : 'w-full md:w-[315px] h-[530px] flex-col gap-2'}`} style={{ direction: 'rtl' }}>
      <div className={`relative overflow-hidden rounded-[20px] ${isRow ? 'w-[320px] h-full' : 'w-full h-[35%]'}`}>
        <img src={imageURL} alt={title} className="w-full h-full object-cover transition-all duration-300 bg-pink-500" />
        <div className="absolute top-3 left-3 z-10">
          <ToggleButton isSelected={userFavorite} onChange={handleFavorite} isDisabled={isFavoriting} aria-label="Favorite" className={`min-w-10 h-10 p-0 rounded-full transition-all shadow-md backdrop-blur-sm backdrop-brightness-95 ${userFavorite ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/80 text-gray-600 hover:bg-white hover:scale-105"}`}>
            <Heart className={userFavorite ? "fill-current" : ""} />
          </ToggleButton>
        </div>
      </div>
      <div className={`p-2 flex flex-col justify-between flex-1 ${isRow ? 'h-full py-2' : 'gap-4'}`}>
        <div>
          <Link to={`/courses/${id}`} className="block">
            <h3 className="text-[20px] md:text-[24px] h-[40px] mb-2.5 font-bold hover:text-[#3772ff] transition-colors line-clamp-1">{title}</h3>
          </Link>
          <p className="text-[14px] md:text-[16px] w-[90%] h-[50px] text-[#787878] dark:text-[#bdbbbb] line-clamp-2 mb-4">{discribtion}</p>
        </div>
        <div className={`flex ${isRow ? 'flex-row flex-wrap gap-x-6 gap-y-2' : 'flex-col gap-2'}`}>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3"><img src="/icons/teacher-stroke-rounded 1.png" alt="teacher" className="h-6 w-6"/><span className="text-[14px] md:text-[16px]">{teacher}</span></div>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3"><img src="/icons/calendar-03-stroke-rounded 1.png" alt="calendar" className="h-6 w-6"/><span className="text-[14px] md:text-[16px]">{date} <span className="text-[#787878] dark:text-[#bdbbbb]">(شروع)</span></span></div>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3"><img src="/icons/students-stroke-rounded 1.png" alt="students" className="h-6 w-6"/><span className="text-[16px]">{number} دانشجو</span></div>
        </div>
        <div className="flex justify-between items-center mt-auto pt-2">
          <p className="text-[20px] md:text-[24px] text-[#272727] dark:text-[#bdbbbb]">{price}<span className="text-[14px] md:text-[16px] text-[#3772ff]"> تومان </span></p>
          <div className="w-[120px] flex justify-between items-center">
            <button onClick={handleLike} disabled={isLiking} className={`w-[50px] flex justify-between items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform ${isLiking ? 'opacity-60' : ''} ${userLiked ? 'text-blue-500 font-bold scale-105' : ''}`}>
              <img src="/icons/thumbs-up-stroke-rounded 1.png" alt="like" className={`h-6 w-6 transition-all ${userLiked ? 'scale-110 filter brightness-100 hue-rotate-[200deg] saturate-200' : ''}`} />
              <span className="text-[14px] md:text-[16px] select-none">{localLikeCount}</span>
            </button>
            <button onClick={handleDislike} disabled={isDisliking} className={`w-[50px] flex justify-between items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform ${isDisliking ? 'opacity-60' : ''} ${userDisliked ? 'text-red-500 font-bold scale-105' : ''}`}>
              <img src="/icons/thumbs-down-stroke-rounded 2.png" alt="dislike" className={`h-6 w-6 transition-all ${userDisliked ? 'scale-110 filter brightness-100 hue-rotate-[0deg] saturate-200' : ''}`} />
              <span className="text-[14px] md:text-[16px] select-none">{localDislikeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;