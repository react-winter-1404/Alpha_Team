import { useState, useEffect } from "react";

export const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineAlert, setShowOnlineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineAlert(true);
      const timer = setTimeout(() => setShowOnlineAlert(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineAlert(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showOnlineAlert) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md transition-all duration-300">
      {!isOnline && (
        <div className="bg-danger text-danger-foreground text-center py-2.5 px-4 rounded-2xl font-medium text-sm shadow-xl border border-danger/20">
          اتصال اینترنت قطع است. در حال استفاده از حالت آفلاین...
        </div>
      )}

      {isOnline && showOnlineAlert && (
        <div className="bg-success text-success-foreground text-center py-2.5 px-4 rounded-2xl font-medium text-sm shadow-xl border border-success/20">
          اتصال اینترنت برقرار شد.
        </div>
      )}
    </div>
  );
};