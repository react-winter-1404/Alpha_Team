import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoneySend02Icon, CheckmarkCircle02Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { getStudentUserPayList } from "../../../core/services/userPanel/get";

const Payments = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentUserPayList();
      const dataList = Array.isArray(response) ? response : response?.data?.data || response?.data || [];
      setTransactions(dataList);

      const sum = dataList.reduce((acc, curr) => acc + (Number(curr.paid) || Number(curr.amount) || Number(curr.price) || 0), 0);
      setTotalAmount(sum);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">تاریخچه پرداخت‌ها</h1>
        <p className="text-xs text-muted">مدیریت تراکنش‌ها، فاکتورها و وضعیت خریدهای دوره‌ها</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-overlay border border-border p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <HugeiconsIcon icon={MoneySend02Icon} className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-muted block">کل پرداخت‌ها</span>
            <span className="text-lg font-bold text-foreground">
              {isLoading ? "..." : totalAmount.toLocaleString()} <span className="text-xs font-normal text-muted">تومان</span>
            </span>
          </div>
        </div>
      </div>

      <div className="block md:hidden space-y-3">
        {isLoading ? (
          <div className="bg-overlay border border-border p-6 rounded-2xl text-center text-muted text-xs">
            در حال بارگذاری اطلاعات...
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-overlay border border-border p-6 rounded-2xl text-center text-muted text-xs">
            هیچ تراکنشی یافت نشد.
          </div>
        ) : (
          transactions.map((tx, index) => (
            <div key={tx.id || index} className="bg-overlay border border-border p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
              <div className="flex justify-between items-center border-b border-border/50 pb-2.5">
                <span className="text-xs font-semibold text-foreground">
                  {tx.course?.title || tx.groupName || "دوره آموزشی"}
                </span>
                {tx.accept ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-medium">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3 h-3" />
                    موفق
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px] font-medium">
                    <HugeiconsIcon icon={CancelCircleIcon} className="w-3 h-3" />
                    ناموفق
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">کد تراکنش:</span>
                <span className="font-semibold text-foreground">{tx.paymentId || (tx.id ? tx.id.slice(0, 8) + "..." : "---")}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">مبلغ:</span>
                <span className="font-bold text-foreground">{tx.paid ? Number(tx.paid).toLocaleString() : "۰"} تومان</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">تاریخ:</span>
                <span className="text-muted">{tx.PeymentDate ? new Date(tx.PeymentDate).toLocaleDateString("fa-IR") : "---"}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block bg-overlay border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-overlay">
          <span className="text-sm font-bold text-foreground">لیست تراکنش‌های اخیر</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-border text-xs text-muted bg-default/50">
                <th className="py-3 px-6 font-medium">کد تراکنش / شناسه</th>
                <th className="py-3 px-6 font-medium">عنوان دوره</th>
                <th className="py-3 px-6 font-medium">مبلغ (تومان)</th>
                <th className="py-3 px-6 font-medium">تاریخ</th>
                <th className="py-3 px-6 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-muted">
                    در حال بارگذاری اطلاعات...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-muted">
                    هیچ تراکنشی یافت نشد.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, index) => (
                  <tr key={tx.id || index} className="hover:bg-default/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-foreground">
                      {tx.paymentId || (tx.id ? tx.id.slice(0, 8) + "..." : "---")}
                    </td>
                    <td className="py-4 px-6 text-foreground">{tx.course?.title || tx.groupName || "دوره آموزشی"}</td>
                    <td className="py-4 px-6 font-medium text-foreground">
                      {tx.paid ? Number(tx.paid).toLocaleString() : "۰"}
                    </td>
                    <td className="py-4 px-6 text-muted">
                      {tx.PeymentDate ? new Date(tx.PeymentDate).toLocaleDateString("fa-IR") : "---"}
                    </td>
                    <td className="py-4 px-6">
                      {tx.accept ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3.5 h-3.5" />
                          موفق
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-medium">
                          <HugeiconsIcon icon={CancelCircleIcon} className="w-3.5 h-3.5" />
                          ناموفق
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;