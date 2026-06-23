import React from "react";
import { Link } from "react-router-dom";
import quillIcon from "../../assets/News/quill-write-02-stroke-rounded 1.png";
import viewIcon from "../../assets/News/view-stroke-rounded (1) 1.png";
import calendarIcon from "../../assets/News/calendar-03-stroke-rounded 1.png";
import thumbsUpIcon from "../../assets/News/thumbs-up-stroke-rounded 1.png";
import thumbsDownIcon from "../../assets/News/thumbs-down-stroke-rounded 1.png";

const newsCard = ({
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
  return (
    <div className="absolute w-[985px] h-[288px] flex flex-row-reverse items-center justify-between p-4 bg-white rounded-3xl shadow-sm dir-rtl">
      <img
        src={imageURL}
        alt={title}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-[427px] h-[287px] rounded-[24px] object-cover"
      />

      <div className="flex flex-col justify-between h-full pr-[450px] pl-4 py-2 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-gray-900 line-clamp-1">
            {title}+{id}
          </h1>
          <span className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {discribtion}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-500 my-4">
          <div className="flex items-center gap-1">
            <img
              src={quillIcon}
              alt=""
              className="w-4 h-4"
            />
            <span>{publisher}</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src={viewIcon}
              alt=""
              className="w-4 h-4"
            />
            <span>{number}</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src={calendarIcon}
              alt=""
              className="w-4 h-4"
            />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 border-r pr-4 border-gray-200">
            <div className="flex items-center gap-1">
              <img
                src={thumbsUpIcon}
                alt=""
                className="w-4 h-4"
              />
              <span>{like}</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={thumbsDownIcon}
                alt=""
                className="w-4 h-4"
              />
              <span>{dislike}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/news/${id}`}
          className="self-start px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          بیشتر بخوانید
        </Link>
      </div>
    </div>
  );
};

export default newsCard;