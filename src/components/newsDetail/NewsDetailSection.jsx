import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, StarCircleIcon } from "@hugeicons/core-free-icons";
import NewsComments from "./NewsComments";
import { useState } from "react";
import toast from "react-hot-toast";
import { postAddNewsRate } from "../../core/services/News/post";

const NewsDetailSection = ({ newsId, imageAddress, miniDescribe, describe, newsTitle, rate }) => {
  const [rating, setRating] = useState(rate || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const submitRating = async (star) => {
    try {
      const response = await postAddNewsRate(newsId, star);
      if (response.data.success) {
        toast.success(response.data.message);
        setRating(star);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ثبت امتیاز");
    }
  };

  return (
    <div className="w-full lg:w-[54.5%] flex flex-col">
      <img src={imageAddress} alt="" className="bg-accent w-full h-106.5 rounded-3xl object-cover" />
      <div className="w-full flex flex-col gap-3 lg:gap-5 mt-6 lg:mt-9">
        <div className="flex flex-col gap-3 lg:gap-5">
          <div className="lg:text-xl text-foreground">{miniDescribe}</div>
          <div className="lg:text-xl text-muted">{describe}</div>
        </div>
        <div className="h-10 mt-5 flex items-center gap-1.5 lg:gap-3 rounded-lg px-3">
          <HugeiconsIcon icon={StarCircleIcon} className="text-accent w-5 h-5 lg:w-6 lg:h-6" />
          <div className="lg:text-xl font-bold text-foreground">امتیاز بدید</div>
          <div className="flex gap-1 mx-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <HugeiconsIcon
                key={star}
                icon={StarIcon}
                onClick={() => submitRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`w-5 h-5 lg:w-6 lg:h-6 cursor-pointer transition-all duration-150 ${
                  star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-muted"
                }`}
              />
            ))}
          </div>
          {rating > 0 && <span className="text-sm text-muted">امتیاز شما: {rating}</span>}
        </div>
      </div>
      <NewsComments newsId={newsId} newsTitle={newsTitle} />
    </div>
  );
};

export default NewsDetailSection;