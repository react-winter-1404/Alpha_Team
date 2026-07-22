import { useEffect, useState } from "react";
import { getCourseDetails } from "../../../core/services/Course/get";
import { Chip } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RowCourseCard = ({ course }) => {
  const { t } = useTranslation("panel");
  const [isLoading, setIsLoading] = useState(false);
  const [courseDetail, setCourseDetail] = useState([]);

  const fetchCourseDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getCourseDetails({ courseId: course.courseId });
      setCourseDetail(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetail();
  }, []);

  return (
    <div
      key={course.id}
      className="w-full h-25 flex items-center gap-5 mt-3 justify-start"
    >
      <img
        src={courseDetail.imageAddress}
        className="w-[12%] h-full flex justify-left bg-muted rounded-2xl"
      />
      <div className="w-[10%] text-lg text-foreground overflow-hidden  whitespace-nowrap text-ellipsis">
        {course.courseName}
      </div>

      <div className="w-[12%] flex justify-center text-foreground">{course.teacher}</div>
      <div className="w-[12%] flex justify-center text-foreground">
        {new Date(course.startDate).toLocaleDateString("fa-IR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="w-[14%] flex justify-center text-foreground">
        {" "}
        {courseDetail.cost && courseDetail.cost.toLocaleString("fa-IR")} {t("myReserve.toman")}
      </div>

      <div className="w-[15%] flex justify-center">
        <Chip
          variant="soft"
          color={course.accept ? "success" : "danger"}
          className="font-bold px-2 py-1"
        >
          {course.accept ? t("myReserve.accepted") : t("myReserve.notAccepted")}
        </Chip>
      </div>
      <div className="w-[10%] flex justify-center">
        <Link to={`/courses/${courseDetail.courseId}`}>
          <HugeiconsIcon className="cursor-pointer text-foreground" icon={ViewIcon} />
        </Link>
      </div>
    </div>
  );
};

export default RowCourseCard;