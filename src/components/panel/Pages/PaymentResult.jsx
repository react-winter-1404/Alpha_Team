import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { patchCoursePaymentStep2 } from "../../../core/services/userPanel/patch";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("در حال بررسی و تایید پرداخت...");
  
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (isCalledRef.current) return;

    const verifyPayment = async () => {
      const paymentStatus = searchParams.get("Status");
      const authority = searchParams.get("Authority") || searchParams.get("authority");
      const reserveId = searchParams.get("reserveId");

      if (paymentStatus === "NOK" || !authority || !reserveId) {
        setStatus("error");
        setMessage("پرداخت توسط کاربر لغو شد یا اطلاعات پرداخت نامعتبر است.");
        return;
      }

      isCalledRef.current = true;

      try {
        const response = await patchCoursePaymentStep2(reserveId, authority);
        console.log("پاسخ تایید پرداخت:", response);

        // از آنجا که درخواست بدون خطا اجرا شده و دوره هم در پنل ثبت شده،
        // یعنی پرداخت موفق بوده است.
        setStatus("success");
        setMessage("پرداخت شما با موفقیت انجام شد و دوره فعال گردید.");

      } catch (error) {
        console.error("خطا در تایید پرداخت:", error);
        setStatus("error");
        setMessage(
          error?.response?.data?.ErrorMessage || 
          error?.response?.data?.message || 
          "خطا در تایید تراکنش توسط سرور."
        );
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md p-6 bg-overlay border border-border rounded-3xl shadow-xl flex flex-col items-center text-center gap-4">
        {status === "loading" && (
          <>
            <Spinner size="lg" />
            <p className="text-foreground text-sm font-medium mt-2">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground">پرداخت موفقیت‌آمیز بود</h2>
            <p className="text-muted text-sm">{message}</p>
            <button
              onClick={() => navigate("/panel")}
              className="mt-4 px-6 py-2.5 bg-accent text-accent-foreground font-bold rounded-2xl text-sm hover:opacity-90 transition-all cursor-pointer"
            >
              بازگشت به پنل کاربری
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center">
              <HugeiconsIcon icon={CancelCircleIcon} className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground">پرداخت ناموفق</h2>
            <p className="text-muted text-sm">{message}</p>
            <button
              onClick={() => navigate("/panel")}
              className="mt-4 px-6 py-2.5 bg-default text-foreground font-bold rounded-2xl text-sm hover:bg-default/80 transition-all cursor-pointer"
            >
              بازگشت به پنل کاربری
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;