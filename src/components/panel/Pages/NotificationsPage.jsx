import { useState, useEffect, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon, CheckmarkCircle03Icon, Search01Icon,  } from "@hugeicons/core-free-icons";
import { getUnseenNotifications, markAllNotificationsAsRead } from "../../../core/services/userPanel/notification/get";
import { markNotificationAsSeen } from "../../../core/services/userPanel/notification/patch";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchAllNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await markAllNotificationsAsRead();
      if (Array.isArray(response)) {
        setNotifications(response);
      } else if (response?.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const handleMarkAsSeen = async (id) => {
    try {
      await markNotificationAsSeen(id);
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, seen: true } : item))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, seen: true })));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAndSortedNotifications = useMemo(() => {
    let result = [...notifications];

    if (searchQuery.trim() !== "") {
      result = result.filter((item) =>
        item.message?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter === "unseen") {
      result = result.filter((item) => !item.seen);
    } else if (statusFilter === "seen") {
      result = result.filter((item) => item.seen);
    }

    result.sort((a, b) => {
      if (statusFilter === "all") {
        if (a.seen !== b.seen) {
          return a.seen ? 1 : -1;
        }
      }

      const dateA = new Date(a.insertDate || 0).getTime();
      const dateB = new Date(b.insertDate || 0).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [notifications, searchQuery, statusFilter, sortOrder]);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-overlay p-6 rounded-2xl border border-border">
        <div>
          <h1 className="text-xl font-bold text-foreground">مدیریت اعلان‌ها</h1>
          <p className="text-xs text-muted mt-1">مشاهده و مدیریت تمام پیام‌ها و اطلاعیه‌های سیستم</p>
        </div>
        <button
          onClick={handleMarkAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={CheckmarkCircle03Icon} className="w-4 h-4" />
          <span>علامت‌گذاری همه به عنوان خوانده شده</span>
        </button>
      </div>

      <div className="bg-overlay p-4 rounded-2xl border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
            <HugeiconsIcon icon={Search01Icon} className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در متن اعلان‌ها..."
            className="w-full h-10 pr-9 pl-4 bg-default border border-border rounded-xl text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 bg-default p-1 rounded-xl border border-border">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === "all" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              همه
            </button>
            <button
              onClick={() => setStatusFilter("unseen")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === "unseen" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              دیده نشده
            </button>
            <button
              onClick={() => setStatusFilter("seen")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === "seen" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              دیده شده
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-default p-1 rounded-xl border border-border">
            <button
              onClick={() => setSortOrder("newest")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                sortOrder === "newest" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              جدیدترین
            </button>
            <button
              onClick={() => setSortOrder("oldest")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                sortOrder === "oldest" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              قدیمی‌ترین
            </button>
          </div>
        </div>
      </div>

      <div className="bg-overlay border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted text-xs">در حال بارگذاری اعلان‌ها...</div>
        ) : filteredAndSortedNotifications.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-default flex items-center justify-center text-muted">
              <HugeiconsIcon icon={Notification01Icon} className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-foreground">هیچ اعلانی یافت نشد</p>
            <span className="text-xs text-muted">با توجه به فیلترها یا جستجوی انجام شده، نتیجه‌ای وجود ندارد.</span>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAndSortedNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => !item.seen && handleMarkAsSeen(item.id)}
                className={`p-4 flex justify-between items-center transition-colors ${
                  !item.seen ? "bg-overlay cursor-pointer hover:bg-default/20" : "bg-accent-soft"
                }`}
              >
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-muted">
                    {new Date(item.insertDate).toLocaleDateString("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {!item.seen && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;