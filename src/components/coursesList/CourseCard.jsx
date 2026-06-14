// import React from 'react'
import { Heart } from "@gravity-ui/icons";
import { ToggleButton } from "@heroui/react";
// import teacherIcon from '../../assets/CourseCards/teacher-stroke-rounded 1.png'
// import Calendar from '../../assets/CourseCards/calendar-03-stroke-rounded 1.png';
// import studentIcon from '../../assets/CourseCards/students-stroke-rounded 1.png'
import { Link } from "react-router-dom";

 const CourseCard = ({
  viewMode, 
  imageURL,
  discribtion,
  title,
  date,
  number,
  rating,
  teacher,
  price,
  id
}) => {
  const isRow = viewMode === 'row';

  return (
    <div 
      className={`rounded-[24px] bg-[#787878]/[0.06] overflow-hidden transition-all duration-300 ${
        isRow 
          ? 'w-full h-[240px] flex flex-row-reverse p-4 gap-6 items-center' 
          : 'w-[315px] h-[529px]' 
      }`}
    >
      <img
        src={imageURL}
        className={`object-cover transition-all duration-300 ${
          isRow 
            ? 'w-[320px] h-full rounded-[20px]' 
            : 'w-full h-[225px] rounded-t-[24px]'
        }`}
      />

      <div className={`flex flex-col justify-between flex-1 ${isRow ? 'h-full py-2 px-2' : 'px-4 py-3'}`}>
        
        <div style={{ direction: 'rtl' }}>
          <Link to={`/courses/${id}`} className={`font-black text-[#2B2B2B] ${isRow ? 'text-[24px] text-right mb-1' : 'text-[32px] text-center'}`}>
            {title}
          </Link>
          <span className={`block text-[#A7A7A7] text-[14px] leading-7 ${isRow ? 'text-right mt-1 line-clamp-2' : 'text-center mt-2'}`}>
            {discribtion}
          </span>
        </div>

        <div 
          className={`flex gap-x-6 gap-y-3 ${isRow ? 'flex-row flex-wrap mt-2' : 'flex-col mt-5'}`}
          style={{ direction: 'rtl' }}
        >
          <div className='flex items-center gap-2'>
            <img src={''} className='w-5 h-5' alt="teacher" />
            <span className='text-[16px] font-bold text-[#2B2B2B]'>{teacher}</span>
          </div>

          <div className='flex items-center gap-2'>
            <img src={''} className='w-5 h-5' alt="calendar" />
            <span className='text-[16px] font-bold text-[#2B2B2B]'>{date}</span>
          </div>

          <div className='flex items-center gap-2'>
            <img src={''} className='w-5 h-5' alt="students" />
            <span className='text-[16px] font-bold text-[#2B2B2B]'>{number} دانشجو</span>
          </div>
        </div>

        <div className={`flex items-center justify-between ${isRow ? 'mt-2' : 'mt-6'}`} style={{ direction: 'rtl' }}>
          
          <h2 className='text-[32px] font-black text-[#3772FF] flex items-center gap-1'>
            {price}
            <span className='text-[16px] font-normal text-[#3772FF]'>
              تومان
            </span>
          </h2>

          <ToggleButton
            isIconOnly
            aria-label="Like"
            className='bg-transparent border-none'
          >
            <Heart className='w-5 h-5' />
            <span className="text-[#2B2B2B] font-bold text-sm mr-1">{rating}</span>
          </ToggleButton>

        </div>

      </div>
    </div>
  )
}
export default CourseCard;