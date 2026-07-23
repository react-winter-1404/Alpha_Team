import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { patchCoursePaymentStep2 } from "../../../core/services/userPanel/patch";
import { useTranslation } from "react-i18next";

const PaymentResult = () => {
  const { t } = useTranslation("panel");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(t("payments.paymentResult.checkingMessage"));
  
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (isCalledRef.current) return;

    const verifyPayment = async () => {
      const paymentStatus = searchParams.get("Status");
      const authority = searchParams.get("Authority") || searchParams.get("authority");
      const reserveId = searchParams.get("reserveId");

      if (paymentStatus === "NOK" || !authority || !reserveId) {
        setStatus("error");
        setMessage(t("payments.paymentResult.failedMessage"));
        return;
      }

      isCalledRef.current = true;

      try {
        const response = await patchCoursePaymentStep2(reserveId, authority);
        console.log("پاسخ تایید پرداخت:", response);

        setStatus("success");
        setMessage(t("payments.paymentResult.successMessage"));

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
  }, [searchParams, t]);

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
            <h2 className="text-xl font-bold text-foreground">{t("payments.paymentResult.title")}</h2>
            <p className="text-muted text-sm">{message}</p>
            <button
              onClick={() => navigate("/panel")}
              className="mt-4 px-6 py-2.5 bg-accent text-accent-foreground font-bold rounded-2xl text-sm hover:opacity-90 transition-all cursor-pointer"
            >
              {t("payments.paymentResult.backToPanel")}
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center">
              <HugeiconsIcon icon={CancelCircleIcon} className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{t("payments.paymentResult.titleFailed")}</h2>
            <p className="text-muted text-sm">{message}</p>
            <button
              onClick={() => navigate("/panel")}
              className="mt-4 px-6 py-2.5 bg-default text-foreground font-bold rounded-2xl text-sm hover:bg-default/80 transition-all cursor-pointer"
            >
              {t("payments.paymentResult.backToPanel")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;