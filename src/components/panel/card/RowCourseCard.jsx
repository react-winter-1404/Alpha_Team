import { useEffect, useState } from "react";
import { getCourseDetails } from "../../../core/services/Course/get";
import { Chip } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";

const RowCourseCard = ({ course }) => {
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
      className="w-full h-25 flex items-center justify-between"
    >
      <img
        src={courseDetail.imageAddress}
        className="w-[13%] h-full flex justify-center bg-muted rounded-2xl"
      />
      <div className="w-[13%] text-lg text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
        {course.courseName}
      </div>

      <div className="w-[15%] flex justify-center text-foreground">{course.teacher}</div>
      <div className="w-[15%] flex justify-center text-foreground">
        {new Date(course.startDate).toLocaleDateString("fa-IR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="w-[15%] flex justify-center text-foreground">
        {" "}
        {courseDetail.cost && courseDetail.cost.toLocaleString("fa-IR")} تومان
      </div>

      <div className="w-[15%] flex justify-center">
        <Chip
          variant="soft"
          color={course.accept ? "success" : "danger"}
          className="font-bold px-2 py-1"
        >
          {course.accept ? "تایید شده" : "تایید نشده"}
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