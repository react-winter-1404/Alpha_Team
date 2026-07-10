import { Button, Chip } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  HeartIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ViewIcon,
  StarIcon
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addNewsLike, addNewsDislike, deleteNewsLike, addNewsFavorite } from "../../core/services/News/post";
import { useTranslation } from "react-i18next";

const NewsInfoBox = ({ newsId, title, insertDate, newsCatregoryName, currentView, addUserFullName, addUserProfileImage, newsRate, isFavorite, userIsLiked, currentUserDissLike }) => {
  const { t } = useTranslation("news");
  const [isFavorited, setIsFavorited] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  const navigate = useNavigate();
  const start = new Date(insertDate).toLocaleDateString("fa-IR");

  useEffect(() => {
    setLike(userIsLiked === true);
    setDislike(currentUserDissLike === true);
    setIsFavorited(isFavorite === true);
  }, [userIsLiked, currentUserDissLike, isFavorite]);

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

  const toggleFavorite = async () => {
    if (isFavorited) return;
    if (!checkAuth()) return;
    try {
      const response = await addNewsFavorite(newsId);
      if (response.success) {
        toast.success("به علاقه‌مندی‌ها اضافه شد");
        setIsFavorited(true);
      } else {
        toast.error(response.message || "خطا");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error("ابتدا باید وارد حساب کاربری خود شوید", { duration: 4000 });
      }
      if (error.response?.status === 400) {
        toast.error("علاقه مندی شما قبلا ثبت شده است", { duration: 4000 });
      }
    }
  };

  const handleLike = async () => {
    if (!checkAuth() || isLiking) return;
    setIsLiking(true);
    try {
      if (like) {
        await deleteNewsLike(newsId);
        setLike(false);
      } else {
        await addNewsLike(newsId);
        setLike(true);
        setDislike(false);
      }
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
      if (dislike) {
        await deleteNewsLike(newsId);
        setDislike(false);
      } else {
        await addNewsDislike(newsId);
        setDislike(true);
        setLike(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisliking(false);
    }
  };

  return (
    <div className="border-4 border-border w-full mx-auto max-w-120 lg:max-w-none lg:w-[40.75%] lg:sticky top-29 bg-overlay flex flex-col rounded-3xl px-5 pt-3.25 pb-5">
      <div className="flex items-start mt-4">
        <div className="text-2xl lg:text-3xl xl:text-[42px] font-semibold text-foreground">{title}</div>
        <div className="lg:text-xl flex items-center gap-1 text-foreground">
          ({Number(newsRate).toFixed(1)} <HugeiconsIcon icon={StarIcon} size={16} color="yellow" fill="yellow" />)
        </div>
      </div>
      <div className="flex mt-2 lg:mt-4 text-lg gap-2">
        <Chip variant="primary" color="accent" className="h-7 px-1.25 lg:text-[15px] lg:h-8 lg:px-2.5 pb-1.5">{newsCatregoryName}</Chip>
        <Chip variant="primary" color="accent" className="h-7 px-1.25 lg:text-[15px] lg:h-8 lg:px-2.5 pb-1.5">{t("detail.article")}</Chip>
      </div>
      <div className="flex flex-col gap-2 lg:gap-4 lg:text-xl my-3.5 lg:my-7 text-foreground">
        <div className="flex gap-4 items-center">
          <HugeiconsIcon icon={Calendar03Icon} className="lg:w-6.5 lg:h-6.5" />
          <div>{start}</div>
        </div>
        <div className="flex gap-4 items-center">
          <HugeiconsIcon icon={ViewIcon} className="lg:w-6.5 lg:h-6.5" />
          <div>{currentView}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-0">
        <div className="text-muted">{t("detail.publisher")}</div>
        <div className="flex justify-between gap-3 items-center">
          <div className="flex items-center gap-4">
            <img src={addUserProfileImage} alt="" className="bg-default w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover" />
            <div className="font-bold text-sm lg:text-lg text-foreground">{addUserFullName}</div>
          </div>
          <div className="w-[40%] lg:w-[50%] flex gap-2 justify-between items-center">
            <Button
              onClick={toggleFavorite}
              variant="outline"
              className={`w-10 h-10 lg:h-14 lg:w-14 rounded-full p-0 text-2xl transition-all duration-300 ${isFavorited ? "bg-danger border-danger text-danger-foreground" : "hover:bg-default"}`}
            >
              <HugeiconsIcon icon={HeartIcon} className={`w-5 h-5 lg:w-6 lg:h-6 transition-all ${isFavorited ? "fill-current" : ""}`} />
            </Button>
            <Button
              onClick={handleLike}
              disabled={isLiking}
              variant={like ? "primary" : "outline"}
              className="w-10 h-10 lg:h-14 lg:w-14 rounded-full p-0 text-2xl transition-all duration-300"
            >
              <HugeiconsIcon icon={ThumbsUpIcon} className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
            <Button
              onClick={handleDislike}
              disabled={isDisliking}
              variant={dislike ? "primary" : "outline"}
              className="w-10 h-10 lg:h-14 lg:w-14 rounded-full p-0 text-2xl transition-all duration-300"
            >
              <HugeiconsIcon icon={ThumbsDownIcon} className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInfoBox;