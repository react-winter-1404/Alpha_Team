import { Link } from "react-router-dom";

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
  levelName
}) => {
  const isRow = viewMode === 'row';

  return (
    <div 
      className={`relative text-[#272727] bg-[#ece8e8] dark:bg-[#585757] dark:text-[#ece8e8] rounded-[20px] text-right flex transition-all duration-300 ${
        isRow 
          ? 'w-full h-auto md:h-[240px] flex-row-reverse p-4 gap-6 items-center' 
          : 'w-full md:w-[315px] h-[530px] flex-col gap-2' 
      }`}
      style={{ direction: 'rtl' }}
    >
      <img
        src={imageURL}
        alt={title}
        className={`p-0 bg-pink-500 rounded-[20px] object-cover transition-all duration-300 ${
          isRow 
            ? 'w-[320px] h-full' 
            : 'w-full h-[35%]'
        }`}
      />

      <div className={`p-2 flex flex-col justify-between flex-1 ${isRow ? 'h-full py-2' : 'gap-4'}`}>
        
        <div>
          <Link to={`/courses/${id}`} className="block">
            <h3 className="text-[20px] md:text-[24px] h-[40px] mb-2.5 font-bold hover:text-[#3772ff] transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          
          <p className="text-[14px] md:text-[16px] w-[90%] h-[50px] text-[#787878] dark:text-[#bdbbbb] line-clamp-2 mb-4">
            {discribtion}
          </p>
        </div>

        <div className={`flex ${isRow ? 'flex-row flex-wrap gap-x-6 gap-y-2' : 'flex-col gap-2'}`}>
          <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
            <img src="/icons/teacher-stroke-rounded 1.png" alt="teacher" className="h-6 w-6"/>
            <span className="text-[14px] md:text-[16px]">{teacher}</span>
          </div>

          <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
            <img src="/icons/calendar-03-stroke-rounded 1.png" alt="calendar" className="h-6 w-6"/>
            <span className="text-[14px] md:text-[16px]">{date} <span className="text-[#787878] dark:text-[#bdbbbb]">(شروع)</span></span>
          </div>

          <div className="text-[16px] mb-2 flex justify-start items-center gap-3">
            <img src="/icons/students-stroke-rounded 1.png" alt="students" className="h-6 w-6"/>
            <span className="text-[16px]">{number} دانشجو</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2">
          <p className="text-[20px] md:text-[24px] text-[#272727] dark:text-[#bdbbbb]">
            {price}
            <span className="text-[14px] md:text-[16px] text-[#3772ff]"> تومان </span>
          </p>
          
          <div className="w-[120px] flex justify-between items-center">
            <div className="w-[50px] flex justify-between items-center">
              <img src="/icons/thumbs-up-stroke-rounded 1.png" alt="like" className="h-6 w-6"/>
              <span className="text-[14px] md:text-[16px]">{likeCount ?? 0}</span>
            </div>

            <div className="w-[50px] flex justify-between items-center">
              <img src="/icons/thumbs-down-stroke-rounded 2.png" alt="dislike" className="h-6 w-6"/>
              <span className="text-[14px] md:text-[16px]">{dissLikeCount ?? 0}</span>
            </div>
          </div>
        </div>

      </div>

      {!isRow && (
        <>
          {technologyList && (
            <div className="absolute top-1 right-5 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[94px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">
              {technologyList}
            </div>
          )}
          {levelName && (
            <div className="absolute top-1 right-30 text-[12px] md:text-[14px] text-[#ffffff] bg-[#5a7eff] h-[31px] w-[57px] flex items-center justify-center rounded-[64px] shadow-[0px_1px_2px_rgba(107,107,107,0.1),_0px_4px_4px_rgba(107,107,107,0.09),_0px_8px_5px_rgba(107,107,107,0.05)]">
              {levelName}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CourseCard;