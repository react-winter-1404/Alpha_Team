import { useState, useEffect } from "react";

export const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showModal, setShowModal] = useState(!navigator.onLine);
  const [showOnlineModal, setShowOnlineModal] = useState(false);

  useEffect(() => {
    let timer;

    const handleOnline = () => {
      setIsOnline(true);
      setShowModal(false);
      setShowOnlineModal(true);
      timer = setTimeout(() => setShowOnlineModal(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowModal(true);
      setShowOnlineModal(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!isOnline && showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-overlay border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center font-bold text-xl">
              !
            </div>
            <h3 className="text-lg font-bold text-foreground">عدم دسترسی به اینترنت</h3>
            <p className="text-sm text-muted">
              اتصال اینترنت شما قطع شده است. در حال حاضر در حالت آفلاین هستید.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 bg-danger hover:bg-danger/90 text-danger-foreground py-2.5 px-4 rounded-xl font-bold shadow-sm transition-all active:scale-95"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

      {isOnline && showOnlineModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-overlay border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center font-bold text-xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-foreground">اتصال آنلاین</h3>
            <p className="text-sm text-muted">
              اتصال اینترنت شما با موفقیت برقرار شد.
            </p>
            <button
              onClick={() => setShowOnlineModal(false)}
              className="w-full mt-2 bg-success hover:bg-success/90 text-success-foreground py-2.5 px-4 rounded-xl font-bold shadow-sm transition-all active:scale-95"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};