import { Button, Chip, AlertDialog } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StudentsIcon,
  Calendar03Icon,
  StarIcon,
  BookmarkAdd02Icon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CheckmarkCircle03Icon,
  UserStoryIcon,
  ProfileIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";

const InfoBox = ({
  title,
  courseLevelName,
  capacity,
  startTime,
  endTime,
  cost,
  isActive,
  courseRate,
  courseTech,
}) => {
  const [isShowReserveCourseModal, setIsShowReserveCourseModal] =
    useState(false);
  const [courseTechs, setCourseTechs] = useState(courseTech);
  console.log(courseTechs);
  useState(() => {
    setCourseTechs(courseTech);
  });
  const start = new Date(startTime).toLocaleDateString("fa-IR");
  const end = new Date(endTime).toLocaleDateString("fa-IR");

  return (
    <div className=" border-4 max-h-screen w-full mx-auto max-w-120 lg:max-w-none lg:w-[40.75%] lg:sticky top-29 bg-overlay flex flex-col rounded-3xl px-5 pt-3.25 pb-5 ">
      {isActive && (
        <Chip
          variant="danger-soft"
          className=" h-6 w-27.5 bg-danger-soft text-danger flex justify-center items-center gap-2 text-center p-0 pb-1 font-semibold  "
        >
          <span className=" w-2 h-2 bg-danger rounded-full mt-1 "></span>
          درحال برگزاری
        </Chip>
      )}
      <div className=" flex items-start mt-4 ">
        <div className=" text-2xl lg:text-3xl xl:text-[42px] font-semibold ">{title}</div>
        <div className="  lg:text-xl flex items-center gap-1 ">
          ({Number(courseRate).toFixed(1)}{" "}
          <HugeiconsIcon
            icon={StarIcon}
            size={16}
            color="yellow"
            fill="yellow"
          />{" "}
          )
        </div>
      </div>
      <div className=" flex flex-wrap mt-2 lg:mt-4 text-lg gap-2 ">
        {courseTechs.map((tech, index) => {
          return (
            <Chip
              key={index}
              variant="primary"
              color="accent"
              className=" h-7 px-1.25 lg:text-[15px] lg:h-8 lg:px-2.5 pb-1.5 "
            >
              {tech}
            </Chip>
          );
        })}

        <Chip
          variant="primary"
          color="accent"
          className=" h-7 px-1.25 lg:text-[15px] lg:h-8 lg:px-2.5 pb-1.5 "
        >
          {courseLevelName}
        </Chip>
      </div>
      <div className=" flex flex-col gap-2 lg:gap-4 lg:text-xl my-3.5 lg:my-7 ">
        <div className=" flex gap-4 items-center  ">
          <HugeiconsIcon icon={StudentsIcon} className=" lg:w-6.5 lg:h-6.5 " />
          <div className="">{capacity} دانشجو</div>
        </div>
        <div className=" flex gap-4 items-center  ">
          <HugeiconsIcon
            icon={Calendar03Icon}
            className=" lg:w-6.5 lg:h-6.5 "
          />
          <div className="">
            {start}
            <span className=" text-muted lg:text-lg font-medium ">
              {" "}
              (شروع){" "}
            </span>
          </div>
        </div>
        <div className=" flex gap-4 items-center  ">
          <HugeiconsIcon
            icon={Calendar03Icon}
            className=" lg:w-6.5 lg:h-6.5 "
          />
          <div className="">
            {end}
            <span className=" text-muted lg:text-lg font-medium ">
              {" "}
              (پایان){" "}
            </span>
          </div>
        </div>
      </div>
      <div className=" font-semibold flex gap-1.5 items-end ">
        <span className=" text-xl lg:text-[28px] ">
          {cost && cost.toLocaleString("fa-IR")}
        </span>
        <span className=" text-accent text-sm lg:text-md ">تومان</span>
      </div>
      <div className=" flex justify-between gap-3 items-center mt-4 lg:mt-7.5 ">
        <AlertDialog
          isOpen={isShowReserveCourseModal}
          onOpenChange={setIsShowReserveCourseModal}
        >
          <Button
            onClick={() => {
              setIsShowReserveCourseModal(true);
            }}
            className=" w-[56%] h-10 lg:h-14 rounded-full font-bold text-lg lg:text-xl pb-2 "
          >
            رزرو دوره
          </Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="lg:max-w-140">
                <AlertDialog.Header>
                  <AlertDialog.Heading>
                    <Chip
                      variant="primary"
                      color="success"
                      className=" w-full flex justify-center items-center gap-2 lg:text-xl text-white h-12 rounded-full "
                    >
                      <div className=" mb-1 lg:mb-2 ">
                        {" "}
                        دوره با موفقیت به لیست رزرو های شما اضافه شد
                      </div>
                      <HugeiconsIcon
                        icon={CheckmarkCircle03Icon}
                        className=" w-5 h-5 lg:w-6 lg:h-6 "
                      />
                    </Chip>
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <div className=" flex items-center my-7 lg:my-10 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="160"
                      height="48"
                      viewBox="0 0 160 48"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 24h130" stroke-dasharray="6 6" />
                      <path d="M20 16l-10 8" />
                      <path d="M20 32l-10 -8" />
                    </svg>
                    <div className=" flex flex-col ">
                      <Chip
                        variant="primary"
                        color="accent"
                        className=" flex items-center justify-center text-[15px] w-18 h-18 lg:h-25 lg:w-25 rounded-full px-2.5 pb-1.5 "
                      >
                        <HugeiconsIcon
                          strokeWidth={1}
                          icon={UserStoryIcon}
                          className=" mt-1 w-[65%] h-[65%] "
                        />
                      </Chip>
                      <div className=" text-center lg:text-xl text-foreground font-bold ">
                        {" "}
                        رزرو من{" "}
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="160"
                      height="48"
                      viewBox="0 0 160 48"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 24h130" stroke-dasharray="6 6" />
                      <path d="M20 16l-10 8" />
                      <path d="M20 32l-10 -8" />
                    </svg>
                    <div className=" flex flex-col ">
                      <Chip
                        variant="tertiary"
                        className=" flex items-center justify-center border-4 text-[15px] w-18 h-18 lg:h-25 lg:w-25 rounded-full px-2.5 pb-1.5 "
                      >
                        <HugeiconsIcon
                          strokeWidth={1}
                          icon={ProfileIcon}
                          className=" w-[65%] h-[65%] "
                        />
                      </Chip>
                      <div className=" text-center lg:text-xl text-foreground font-bold ">
                        {" "}
                        دوره من{" "}
                      </div>
                    </div>
                  </div>

                  <div className=" text-center mx-auto w-[75%] lg:text-xl leading-relaxed ">
                    بعد از تایید ادمین مربوط دوره شما به
                    <span className=" text-foreground underline-offset-7 underline ">
                      {" "}
                      دوره من{" "}
                    </span>
                    اضافه خواهد شد
                  </div>
                </AlertDialog.Body>
                <AlertDialog.Footer className=" gap-5 mt-10 ">
                  <Button
                    slot="close"
                    className=" w-[68%] h-11 lg:h-13  lg:text-xl pb-1 lg:pb-2 rounded-full "
                  >
                    لیست رزرو های من
                  </Button>
                  <Button
                    slot="close"
                    variant="outline"
                    className=" w-[28%] h-11 lg:h-13  lg:text-xl pb-1 lg:pb-2 rounded-full "
                  >
                    باشه
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>

        <Button
          variant="outline"
          className=" w-10 h-10 lg:h-14 lg:w-14 rounded-full p-0 text-2xl  "
        >
          <HugeiconsIcon
            icon={BookmarkAdd02Icon}
            className=" w-4 h-4 lg:h-6 lg:w-6 "
          />
        </Button>
        <Button
          isIconOnly
          variant="outline"
          className=" w-10 h-10 lg:h-14 lg:w-14 rounded-full p-0 text-2xl  "
        >
          <HugeiconsIcon
            icon={ThumbsUpIcon}
            className=" w-4 h-4 lg:h-6 lg:w-6 "
          />
        </Button>
        <Button
          isIconOnly
          variant="outline"
          className=" w-10 h-10 lg:h-14 lg:w-14 rounded-full p-0 text-2xl  "
        >
          <HugeiconsIcon
            icon={ThumbsDownIcon}
            className=" w-4 h-4 lg:h-6 lg:w-6 "
          />
        </Button>
      </div>
    </div>
  );
};

export default InfoBox;
