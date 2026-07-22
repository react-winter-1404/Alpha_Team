import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "@heroui/react";
import apiClient from "../../../core/interceptor/interceptor"; 

const PaymentCallback = () => {
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reserveId = localStorage.getItem("currentReserveId");

      if (!reserveId) {
        setStatus("error");
        setMessage("اطلاعات تراکنش یافت نشد.");
        return;
      }

      try {
        await apiClient.patch(
  `/NewVersion/CoursePayment/StepTwoToPay/${reserveId}`
);

        setStatus("success");
        setMessage("پرداخت شما با موفقیت تایید شد! به زودی به پنل کاربری منتقل می‌شوید.");
        localStorage.removeItem("currentReserveId");

        setTimeout(() => {
          navigate("/panel/my-reserve");
        }, 4000);
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("پرداخت ناموفق بود یا توسط بانک تایید نشد.");
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-5">
      <div className="max-w-md w-full bg-overlay p-8 rounded-2xl border border-border text-center shadow-lg">
        {status === "checking" && (
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" color="primary" />
            <h2 className="text-xl font-bold text-foreground">در حال تایید پرداخت...</h2>
            <p className="text-muted text-sm">لطفاً تا اتمام تایید تراکنش و برقراری ارتباط با بانک منتظر بمانید.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center text-success text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-success">پرداخت موفقیت‌آمیز بود!</h2>
            <p className="text-foreground text-sm">{message}</p>
            <Button color="success" onClick={() => navigate("/panel/my-reserve")} className="mt-4">
              بازگشت به لیست رزروها
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center text-danger text-3xl">✕</div>
            <h2 className="text-2xl font-bold text-danger">خطا در فرآیند پرداخت</h2>
            <p className="text-foreground text-sm">{message}</p>
            <Button color="danger" onClick={() => navigate("/panel/my-reserve")} className="mt-4">
              بازگشت و تلاش مجدد
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;