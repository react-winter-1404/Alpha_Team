import { Button, Chip } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  BookmarkAdd02Icon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ViewIcon,
  StarIcon
} from "@hugeicons/core-free-icons";


const NewsInfoBox = ({ title, insertDate, newsCatregoryName,currentView,addUserFullName,addUserProfileImage,newsRate }) => {

  const start = new Date(insertDate).toLocaleDateString("fa-IR");

  return (
    <div className=" border-4 w-full mx-auto max-w-120 lg:max-w-none lg:w-[40.75%] lg:sticky top-29 bg-overlay flex flex-col rounded-3xl px-5 pt-3.25 pb-5 ">
      <div className=" flex items-start mt-4 ">
        <div className=" text-2xl lg:text-3xl xl:text-[42px] font-semibold ">{title}</div>
        <div className="  lg:text-xl flex items-center gap-1 ">
          ({Number(newsRate).toFixed(1)}{" "}
          <HugeiconsIcon
            icon={StarIcon}
            size={16}
            color="yellow"
            fill="yellow"
          />{" "}
          )
        </div>
      </div>
      <div className=" flex mt-2 lg:mt-4 text-lg gap-2 ">
        <Chip
          variant="primary"
          color="accent"
          className=" h-7 px-1.25 lg:text-[15px] lg:h-8 lg:px-2.5 pb-1.5 "
        >
          {newsCatregoryName}
        </Chip>
        <Chip
          variant="primary"
          color="accent"
          className=" h-7 px-1.25 lg:text-[15px] lg:h-8 lg:px-2.5 pb-1.5 "
        >
          مقاله
        </Chip>
      </div>
      <div className=" flex flex-col gap-2 lg:gap-4 lg:text-xl my-3.5 lg:my-7 ">
        <div className=" flex gap-4 items-center  ">
          <HugeiconsIcon
            icon={Calendar03Icon}
            className=" lg:w-6.5 lg:h-6.5 "
          />
          <div className="">{start}</div>
        </div>
        <div className=" flex gap-4 items-center  ">
          <HugeiconsIcon
            icon={ViewIcon}
            className=" lg:w-6.5 lg:h-6.5 "
          />
          <div className="">{currentView}</div>
        </div>
      </div>
      <div className=" flex flex-col gap-3 mt-0 ">
        <div className=" text-muted ">منتشر کننده</div>
        <div className=" flex justify-between gap-3 items-center  ">
          <div className=" border flex items-center gap-4  ">
            <img
              src={addUserProfileImage}
              alt=""
              className=" bg-border w-12 h-12 lg:w-14 lg:h-14 rounded-full "
            />

            <div className=" font-bold text-sm lg:text-lg ">{addUserFullName}</div>
          </div>
          <div className=" w-[40%] lg:w-[50%] flex gap-2 justify-between items-center ">
            <Button
              variant="outline"
              className=" w-10 h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full p-0 text-2xl  "
            >
              <HugeiconsIcon
                icon={BookmarkAdd02Icon}
                className=" w-4 h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 "
              />
            </Button>
            <Button
              isIconOnly
              variant="outline"
              className=" w-10 h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full p-0 text-2xl  "
            >
              <HugeiconsIcon
                icon={ThumbsUpIcon}
                className=" w-4 h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 "
              />
            </Button>
            <Button
              isIconOnly
              variant="outline"
              className=" w-10 h-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full p-0 text-2xl  "
            >
              <HugeiconsIcon
                icon={ThumbsDownIcon}
                className=" w-4 h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 "
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInfoBox;
