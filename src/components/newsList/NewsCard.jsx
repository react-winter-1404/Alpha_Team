import React from "react";
import { Link } from "react-router-dom";
import quillIcon from "../../assets/News/quill-write-02-stroke-rounded 1.png";
import viewIcon from "../../assets/News/view-stroke-rounded (1) 1.png";
import calendarIcon from "../../assets/News/calendar-03-stroke-rounded 1.png";
import thumbsUpIcon from "../../assets/News/thumbs-up-stroke-rounded 1.png";
import thumbsDownIcon from "../../assets/News/thumbs-down-stroke-rounded 1.png";
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
  id,
}) => {
  const { t } = useTranslation("news");

  return (
    <div className="relative w-full max-w-[985px] min-h-[288px] flex flex-col md:flex-row-reverse items-center justify-between p-4 bg-[#F6F5F7] rounded-3xl shadow-sm border border-border dir-rtl">
      <img
        src={imageURL}
        alt={title}
        className="w-full md:w-[427px] h-[200px] md:h-[256px] rounded-[24px] object-cover"
      />

      <div className="flex flex-col justify-between h-full w-full pt-4 md:pt-0 md:pl-6 md:pr-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-foreground line-clamp-1">
            {title}
          </h1>
          <span className="text-sm text-muted line-clamp-3 leading-relaxed">
            {discribtion}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs text-muted my-4">
          <div className="flex items-center gap-1">
            <img src={quillIcon} alt="publisher" className="w-4 h-4" />
            <span>{publisher}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={viewIcon} alt="views" className="w-4 h-4" />
            <span>{number}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={calendarIcon} alt="date" className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 border-r pr-4 border-separator">
            <div className="flex items-center gap-1">
              <img src={thumbsUpIcon} alt="like" className="w-4 h-4" />
              <span>{like}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={thumbsDownIcon} alt="dislike" className="w-4 h-4" />
              <span>{dislike}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/news/${id}`}
          className="self-start px-5 py-2 bg-accent hover:bg-accent/80 text-accent-foreground text-sm font-medium rounded-xl transition-colors"
        >
          {t("card.readMore")}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;