import { useEffect, useState } from "react";
import { getCourseDetails } from "../../../core/services/Course/get";
import { Chip, Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../../../core/interceptor/interceptor";
import toast from "react-hot-toast";

const RowCourseCard = ({ course }) => {
  const { t } = useTranslation("panel");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
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

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsPaying(true);

    const reserveId = course.reserveId || course.id;

    if (!reserveId) {
      console.error("reserveId یافت نشد!", course);
      toast.error("خطا: شناسه رزرو دوره مشخص نیست.");
      setIsPaying(false);
      return;
    }

    try {
      localStorage.setItem("currentReserveId", reserveId);

      const response = await apiClient.patch(
        `/NewVersion/CoursePayment/StepOneToPay/${reserveId}`,
        {
          callbackUrl: "http://localhost:5173/payment-result",
        }
      );

      console.log("پاسخ کامل سرور:", response);

      let paymentLink = "";

      if (response.data) {
        if (typeof response.data === "string" && response.data.startsWith("http")) {
          paymentLink = response.data;
        } else if (response.data.message && typeof response.data.message === "string" && response.data.message.startsWith("http")) {
          paymentLink = response.data.message;
        } else {
          paymentLink = 
            response.data.paymentUrl || 
            response.data.url || 
            response.data.data?.paymentUrl || 
            response.data.data?.url;
        }
      }

      if (paymentLink && typeof paymentLink === "string" && paymentLink.startsWith("http")) {
        toast.success("در حال انتقال به درگاه پرداخت...");
        setTimeout(() => {
          window.location.href = paymentLink;
        }, 1000);
      } else {
        toast.error("آدرس درگاه پرداخت دریافت نشد.");
      }
    } catch (error) {
      console.error(error);
      toast.error("در ارتباط با درگاه پرداخت مشکلی پیش آمد.");
    } finally {
      setIsPaying(false);
    }
  };

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
        {courseDetail?.cost && courseDetail.cost.toLocaleString("fa-IR")} {t("myReserve.toman")}
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
      <div className="w-[10%] flex justify-center items-center gap-3">
        {course.accept && (
          <Button
            size="sm"
            color="success"
            className="text-white font-bold px-3 py-1 text-xs min-w-16 h-8 rounded-lg"
            onClick={handlePayment}
            isLoading={isPaying}
          >
            { "پرداخت"}
          </Button>
        )}
        <Link to={`/courses/${courseDetail?.courseId}`}>
          <HugeiconsIcon className="cursor-pointer text-foreground w-5 h-5" icon={ViewIcon} />
        </Link>
      </div>
    </div>
  );
};

export default RowCourseCard;