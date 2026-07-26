import React from "react";
import { Link } from "react-router-dom";
import quillIcon from "../../assets/News/quill-write-02-stroke-rounded 1.png";
import viewIcon from "../../assets/News/view-stroke-rounded (1) 1.png";
import calendarIcon from "../../assets/News/calendar-03-stroke-rounded 1.png";
import thumbsUpIcon from "../../assets/News/thumbs-up-stroke-rounded 1.png";
import thumbsDownIcon from "../../assets/News/thumbs-down-stroke-rounded 1.png";
import fallbackImg from "../../assets/News/images.png";
import { useTranslation } from "react-i18next";

const NewsCard = ({
  imageURL,
  discribtion,
  title,
  date,
  number,
  publisher,
  like,
  dislike,
  rating = "4",
  id,
}) => {
  const { t } = useTranslation("news");

  return (
    <div
      dir="rtl"
      style={{ backgroundColor: "#F6F5F7" }}
      className="relative w-full max-w-[985px] min-h-[288px] flex flex-col md:flex-row items-center justify-between p-5 rounded-[32px] shadow-sm border border-border gap-6"
    >
      <div className="relative w-full md:w-[457px] h-[200px] md:h-[256px] flex-shrink-0">
        <img
          src={imageURL}
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
          alt={title}
          className="w-full h-full rounded-[24px] object-cover"
        />
      </div>

      <div className="flex flex-col justify-between h-full w-full py-1 items-start text-right">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <h1 className="text-xl font-bold text-foreground line-clamp-1">
              {title}
            </h1>
            {rating && (
              <span className="text-sm font-semibold text-foreground/80 flex items-center gap-1 flex-shrink-0">
                ({rating})
              </span>
            )}
          </div>
          <p className="text-sm text-muted line-clamp-2 leading-relaxed font-normal">
            {discribtion}
          </p>
        </div>

        <div className="flex flex-col gap-3 my-4 text-xs font-medium text-foreground w-full">
          <div className="flex items-center justify-start gap-2">
            <span className="text-sm">{publisher}</span>
            <img src={quillIcon} alt="publisher" className="w-4 h-4 opacity-70" />
          </div>

          <div className="flex items-center justify-start gap-2">
            <span className="text-sm">{number}</span>
            <img src={viewIcon} alt="views" className="w-4 h-4 opacity-70" />
          </div>

          <div className="flex items-center justify-start gap-2">
            <span className="text-sm">{date}</span>
            <img src={calendarIcon} alt="date" className="w-4 h-4 opacity-70" />
          </div>

          <div className="flex items-center justify-start gap-4">
            <div className="flex items-center gap-1.5">
              <span>{like}</span>
              <img src={thumbsUpIcon} alt="like" className="w-4 h-4 opacity-70" />
            </div>
            <div className="flex items-center gap-1.5">
              <span>{dislike}</span>
              <img src={thumbsDownIcon} alt="dislike" className="w-4 h-4 opacity-70" />
            </div>
          </div>
        </div>

        <Link
          to={`/news/${id}`}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-95"
        >
          {t("card.readMore")}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;