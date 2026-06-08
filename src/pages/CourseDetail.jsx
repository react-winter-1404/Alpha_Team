import NavbarHeader from "./components/landing/NavbarHeader";
import { Button, Chip } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StudentsIcon,
  Calendar03Icon,
  StarIcon,
  BookmarkAdd02Icon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "@hugeicons/core-free-icons";

const CourseDetailPage = () => {
  return (
    <div className=" w-full  flex flex-col items-center ">
      <NavbarHeader />
      <div className=" border border-black flex items-start w-[92%] gap-[5%] pt-18.25 ">
        <div className=" border-4  w-[40%] sticky top-32 bg-overlay flex flex-col rounded-3xl px-5 pt-3.25 pb-5 ">
          <Button
            variant="danger-soft"
            className=" h-6.25 w-29 flex items-center gap-2.5 text-center p-0 pb-1 font-semibold  "
          >
            <span className=" w-2 h-2 bg-danger rounded-full mt-1 "></span>
            درحال برگزاری
          </Button>
          <div className=" flex items-start mt-6 ">
            <div className=" text-5xl font-semibold ">ری‌اکت جی‌اس</div>
            <div className=" font-bold text-lg flex items-center ">
              (4{" "}
              <HugeiconsIcon
                icon={StarIcon}
                size={16}
                color="yellow"
                fill="yellow"
              />{" "}
              )
            </div>
          </div>
          <div className=" flex mt-8 text-lg gap-2 ">
            <Chip
              variant="primary"
              color="accent"
              className=" text-[15px] h-8.5 px-3 pb-1.5 "
            >
              برنامه نویسی
            </Chip>
            <Chip
              variant="primary"
              color="accent"
              className=" text-[15px] h-8.5 px-3 pb-1.5 "
            >
              مبتدی
            </Chip>
          </div>
          <div className=" flex flex-col gap-5 text-xl font-bold my-8 ">
            <div className=" flex gap-4 items-center  ">
              <HugeiconsIcon icon={StudentsIcon} size={26} />
              <div className="">80 / 120 دانشجو</div>
            </div>
            <div className=" flex gap-4 items-center  ">
              <HugeiconsIcon icon={Calendar03Icon} size={26} />
              <div className="">
                20 اردیبهشت 1403
                <span className=" text-muted text-lg font-medium ">(شروع)</span>
              </div>
            </div>
            <div className=" flex gap-4 items-center  ">
              <HugeiconsIcon icon={Calendar03Icon} size={26} />
              <div className="">
                20 اردیبهشت 1403
                <span className=" text-muted text-lg font-medium ">
                  (پایان)
                </span>
              </div>
            </div>
          </div>
          <div className=" font-semibold flex gap-1.5 items-end ">
            <span className="text-3xl ">1,800,000</span>
            <span className=" text-accent ">تومان</span>
          </div>
          <div className=" flex justify-between mt-9 ">
            <Button className=" w-[56%] h-15 rounded-full font-bold text-xl pb-2 ">
              رزرو دوره
            </Button>
            <Button  variant="outline" className=' h-15 w-15 rounded-full p-0 text-2xl  ' >
              <HugeiconsIcon icon={BookmarkAdd02Icon} className=" h-6.5 w-6.5 " />
            </Button>
            <Button isIconOnly variant="outline" className=' h-15 w-15 rounded-full p-0 text-2xl  ' >
              <HugeiconsIcon icon={ThumbsUpIcon} className=" h-6.5 w-6.5 " />
            </Button>
            <Button isIconOnly variant="outline" className=' h-15 w-15 rounded-full p-0 text-2xl  ' >
              <HugeiconsIcon icon={ThumbsDownIcon} className=" h-6.5 w-6.5 " />
            </Button>
          </div>
        </div>
        <div className=" border border-black w-[55%] h-500 "></div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
