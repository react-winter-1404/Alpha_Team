import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, StarCircleIcon } from "@hugeicons/core-free-icons";
import CourseComments from "./CourseComments";
import { useEffect, useState } from "react";
import { getTeacherDetails } from "../../core/services/teacher/get";
import toast from "react-hot-toast";
import { postAddCourseRate } from "../../core/services/Course/post";
import { useTranslation } from "react-i18next";

const DetailSection = ({
  courseId,
  imageAddress,
  teacherId,
  teacherName,
  miniDescribe,
  describe,
  title,
  rate
}) => {
  const { t } = useTranslation("courses");
  const [isLoading, setIsLoading] = useState(false);
  const [teacherDetail, setTeacherDetail] = useState([]);
  const [rating, setRating] = useState(rate || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const fetchTeacherDetail = async () => {
    if (teacherId) {
      setIsLoading(true);
      try {
        const response = await getTeacherDetails({ TeacherId: teacherId });
        setTeacherDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchTeacherDetail();
  }, []);

  const submitRating = async (star) => {
  try {
    const response = await postAddCourseRate(courseId, star);
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
      <img
        src={imageAddress}
        alt={title}
        className="bg-accent w-full h-64 lg:h-106.5 rounded-3xl object-cover"
      />
      <div className="w-full flex flex-col gap-3 lg:gap-5 mt-5 lg:mt-7">
        <div className="text-muted">{t("detail.teacher")}</div>
        <div className="w-full flex gap-1.5">
          <div className="flex items-center gap-4 w-[40%]">
            <img
              src={
                teacherDetail?.pictureAddress ||
                "/public/images/placeholder.png"
              }
              alt={teacherName}
              className="bg-default w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="font-bold text-sm lg:text-lg text-foreground">{teacherName}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 lg:gap-5 mt-6 lg:mt-9">
        <div className="text-muted">{t("detail.description")}</div>
        <div className="flex flex-col gap-3 lg:gap-5">
          <div className="font-bold text-lg lg:text-2xl text-foreground">{miniDescribe}</div>
          <div className="lg:text-xl text-muted">{describe}</div>
        </div>

        <div className="h-10 mt-5 flex items-center gap-1.5 lg:gap-3 rounded-lg px-3">
          <HugeiconsIcon
            icon={StarCircleIcon}
            className="text-accent w-5 h-5 lg:w-6 lg:h-6"
          />
          <div className="lg:text-xl font-bold text-foreground">{t("detail.rate")}</div>
          <div className="flex gap-1 mx-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <HugeiconsIcon
                key={star}
                icon={StarIcon}
                onClick={() => {submitRating(star)}}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`w-5 h-5 lg:w-6 lg:h-6 cursor-pointer transition-all duration-150 ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          {rating > 0 && (
            <span className="text-sm text-muted">{t("detail.yourRate")}: {rating}</span>
          )}
        </div>
      </div>
      <CourseComments courseId={courseId} courseTitle={title} />
    </div>
  );
};

export default DetailSection;