import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  StarCircleIcon,
} from "@hugeicons/core-free-icons";
import NewsComments from "./NewsComments";



const NewsDetailSection = ({newsId,imageAddress,miniDescribe,describe,newsTitle}) => {
  
  return (
    <div className=" border border-black w-full lg:w-[54.5%]  flex flex-col ">
      <img
        src={imageAddress}
        alt=""
        className=" bg-danger-hover w-full h-106.5 rounded-3xl"
      />
      <div className=" w-full flex flex-col gap-3 lg:gap-5 mt-6 lg:mt-9  ">
        <div className=" flex flex-col gap-3 lg:gap-5 ">
          <div className=" lg:text-xl ">{miniDescribe}</div>
          <div className=" lg:text-xl ">{describe}</div>
        </div>
        <div className=" h-10 border border-black mt-5 flex items-center gap-1.5 lg:gap-3 ">
          <HugeiconsIcon
            icon={StarCircleIcon}
            className=" text-accent w-5 h-5 lg:w-6 lg:h-6 "
          />
          <div className=" lg:text-xl font-bold ">امتیاز بدید</div>
          <div className=" flex gap-1 mx-2 text-yellow-400 ">
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
          </div>
        </div>
      </div>
      <NewsComments newsId={newsId} newsTitle={newsTitle}  />
    </div>
  );
};

export default NewsDetailSection