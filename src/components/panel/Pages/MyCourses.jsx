import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Spinner, DateRangePicker, DateField, RangeCalendar, I18nProvider } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, Calendar02Icon, Cancel01Icon, Search01Icon, MoneyAdd02Icon, FilterIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { getUserMyCourses } from "../../../core/services/userPanel/get";
import { patchCoursePaymentStep1 } from "../../../core/services/userPanel/patch";
import fallbackImg from "../../../assets/Courses/images.png"

const MyCourses = () => {
  const { t } = useTranslation("panel");

  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [payingCourseId, setPayingCourseId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateValue, setDateValue] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempDateValue, setTempDateValue] = useState(null);
  const [tempPaymentFilter, setTempPaymentFilter] = useState("all");

  const fetchMyCourses = async () => {
    setIsLoading(true);
    try {
      const response = await getUserMyCourses({ PageNumber: 1, RowsOfPage: 1000 });
      const data = response.data?.listOfMyCourses || [];
      setMyCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateValue, paymentFilter]);

  const parseDescription = (descRaw) => {
    if (!descRaw) return "-";
    try {
      if (typeof descRaw === "string" && descRaw.startsWith("{")) {
        const parsed = JSON.parse(descRaw);
        if (parsed.blocks && Array.isArray(parsed.blocks)) {
          return parsed.blocks.map((b) => b.data?.text || "").join(" ");
        }
      }
      return descRaw;
    } catch (e) {
      return descRaw;
    }
  };

  const jalaliToGregorian = (jy, jm, jd) => {
    const salPar = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gy = jy <= 979 ? 621 : 1600;
    jy -= jy <= 979 ? 0 : 979;
    let days =
      365 * jy +
      Math.floor(jy / 33) * 8 +
      Math.floor(((jy % 33) + 3) / 4) +
      78 +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let gd = days + 1;
    let gm;
    for (gm = 0; gm < 12; gm++) {
      const v = salPar[gm] + (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) ? 1 : 0);
      if (gd <= v) break;
    }
    gd -= salPar[gm - 1] + (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) ? 1 : 0);
    return new Date(gy, gm - 1, gd);
  };

  const convertCalendarObjToJsDate = (dateObj) => {
    if (!dateObj) return null;
    try {
      if (typeof dateObj.toDate === "function") {
        return dateObj.toDate("UTC");
      }
      if (dateObj.year && dateObj.month && dateObj.day) {
        return jalaliToGregorian(dateObj.year, dateObj.month, dateObj.day);
      }
      return new Date(dateObj);
    } catch (e) {
      return null;
    }
  };

  const clearDateFilter = () => setDateValue(null);
  const clearTempDateFilter = () => setTempDateValue(null);

  const openFilterModal = () => {
    setTempSearchTerm(searchTerm);
    setTempDateValue(dateValue);
    setTempPaymentFilter(paymentFilter);
    setIsFilterModalOpen(true);
  };

  const handleApplyMobileFilter = () => {
    setSearchTerm(tempSearchTerm);
    setDateValue(tempDateValue);
    setPaymentFilter(tempPaymentFilter);
    setIsFilterModalOpen(false);
  };

  const handlePayment = async (courseItem) => {
    const reserveId = courseItem.reserveId || courseItem.id;
    if (!reserveId) return;

    try {
      setPayingCourseId(reserveId);
      const callbackUrl = `${window.location.origin}/payment-result?reserveId=${reserveId}`;
      const response = await patchCoursePaymentStep1(reserveId, callbackUrl);
      const redirectUrl =
        response?.data?.link ||
        response?.data?.url ||
        response?.data?.paymentUrl ||
        response?.data?.result ||
        response?.data;

      if (redirectUrl && typeof redirectUrl === "string") {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPayingCourseId(null);
    }
  };

  const filteredCourses = myCourses.filter((item) => {
    const search = searchTerm.toLowerCase().trim();
    const courseTitle = item.courseTitle || item.course?.title || "";
    const teacherName = item.fullName || (item.course?.teacher ? `${item.course.teacher.fName} ${item.course.teacher.lName}` : "");
    const descriptionText = parseDescription(item.desc || item.course?.describe || item.course?.miniDescribe || "");

    const matchesSearch =
      !search ||
      courseTitle.toLowerCase().includes(search) ||
      teacherName.toLowerCase().includes(search) ||
      descriptionText.toLowerCase().includes(search);

    let matchesDate = true;
    if (dateValue && (dateValue.start || dateValue.end)) {
      const startTimeRaw = item.course?.startTime || item.lastUpdate;
      if (startTimeRaw) {
        const itemDate = new Date(startTimeRaw);
        itemDate.setHours(0, 0, 0, 0);
        const itemTime = itemDate.getTime();

        const startDate = dateValue.start ? convertCalendarObjToJsDate(dateValue.start) : null;
        const endDate = dateValue.end ? convertCalendarObjToJsDate(dateValue.end) : null;

        if (startDate) {
          startDate.setHours(0, 0, 0, 0);
          if (itemTime < startDate.getTime()) matchesDate = false;
        }

        if (endDate) {
          endDate.setHours(23, 59, 59, 999);
          if (itemTime > endDate.getTime()) matchesDate = false;
        }
      } else {
        matchesDate = false;
      }
    }

    let matchesPayment = true;
    const isUnpaid = item.paymentStatus === "پرداخت نشده" || item.paymentStatus === false;
    if (paymentFilter === "paid") {
      matchesPayment = !isUnpaid;
    } else if (paymentFilter === "unpaid") {
      matchesPayment = isUnpaid;
    }

    return matchesSearch && matchesDate && matchesPayment;
  });

  const totalPages = Math.ceil(filteredCourses.length / pageSize) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="h-full w-full flex flex-col pb-0 p-4 md:p-6 gap-6 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          {t("myCourses.title") || "دوره‌های من"}
        </h3>
        <button
          type="button"
          onClick={openFilterModal}
          className="md:hidden w-[83px] h-[41px] rounded-[64px] bg-accent text-sm text-accent-foreground flex items-center justify-center font-medium cursor-pointer hover:opacity-90 active:scale-95 transition-all"
        >
          {t("myCourses.filter") || "فیلتر"}
        </button>
      </div>

      <div className="hidden md:flex justify-start items-center gap-5 flex-shrink-0 flex-wrap">
        <div>
          <div className="flex justify-start items-center gap-2">
            <HugeiconsIcon icon={Search01Icon} className="m-0 w-5 h-5 text-foreground" />
            <span className="text-sm text-foreground">
              {t("myCourses.searchCourse") || "جستجو دوره"}
            </span>
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder={t("myCourses.searchPlaceholder") || "جستجو کنید..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[289px] h-12 bg-default text-sm text-foreground indent-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-border"
            />
            <div className="absolute top-0 left-0 cursor-pointer w-12 h-12 rounded-2xl bg-accent flex justify-center items-center">
              <HugeiconsIcon icon={Search01Icon} className="m-0 w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-foreground">
              <HugeiconsIcon icon={Calendar02Icon} className="m-0 w-5 h-5" />
              <span>{t("myCourses.startDate") || "تاریخ شروع"}</span>
            </div>
            {dateValue && (
              <button
                type="button"
                onClick={clearDateFilter}
                className="w-7 h-7 bg-danger hover:bg-danger/80 text-danger-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <I18nProvider locale="fa-IR">
              <DateRangePicker
                aria-label="بازه تاریخی دوره"
                className="w-full"
                endName="endDate"
                startName="startDate"
                value={dateValue}
                onChange={setDateValue}
              >
                <DateField.Group
                  fullWidth
                  className="bg-default rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm"
                >
                  <DateField.Input slot="start" className="outline-none bg-transparent text-foreground">
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateRangePicker.RangeSeparator className="mx-2 text-muted" />
                  <DateField.Input slot="end" className="outline-none bg-transparent text-foreground">
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix className="mr-auto">
                    <DateRangePicker.Trigger>
                      <DateRangePicker.TriggerIndicator className="text-muted" />
                    </DateRangePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DateRangePicker.Popover className="bg-background rounded-2xl shadow-xl border border-border p-2 z-50">
                  <RangeCalendar aria-label="انتخاب تاریخ برگزاری" className="bg-background">
                    <RangeCalendar.Header className="flex items-center justify-between pb-2 bg-background">
                      <RangeCalendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-muted">
                        <RangeCalendar.YearPickerTriggerHeading />
                        <RangeCalendar.YearPickerTriggerIndicator />
                      </RangeCalendar.YearPickerTrigger>
                      <div className="flex gap-1">
                        <RangeCalendar.NavButton slot="previous" className="p-1 rounded-lg hover:bg-default text-foreground cursor-pointer" />
                        <RangeCalendar.NavButton slot="next" className="p-1 rounded-lg hover:bg-default text-foreground cursor-pointer" />
                      </div>
                    </RangeCalendar.Header>
                    <RangeCalendar.Grid className="bg-background">
                      <RangeCalendar.GridHeader>
                        {(day) => <RangeCalendar.HeaderCell className="text-muted font-normal p-1">{day}</RangeCalendar.HeaderCell>}
                      </RangeCalendar.GridHeader>
                      <RangeCalendar.GridBody>
                        {(date) => (
                          <RangeCalendar.Cell
                            date={date}
                            className="p-1 text-center data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-lg text-foreground cursor-pointer"
                          />
                        )}
                      </RangeCalendar.GridBody>
                    </RangeCalendar.Grid>
                  </RangeCalendar>
                </DateRangePicker.Popover>
              </DateRangePicker>
            </I18nProvider>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-sm mb-1 text-foreground">
            <HugeiconsIcon icon={FilterIcon} className="m-0 w-5 h-5" />
            <span>{t("myCourses.paymentStatus") || "وضعیت پرداخت"}</span>
          </div>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="h-12 bg-default text-sm text-foreground px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-border cursor-pointer"
          >
            <option value="all">{t("myCourses.all") || "همه"}</option>
            <option value="paid">{t("myCourses.paid") || "پرداخت شده"}</option>
            <option value="unpaid">{t("myCourses.unpaid") || "پرداخت نشده"}</option>
          </select>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-overlay rounded-2xl border border-border p-4 overflow-hidden flex-col min-h-90">
        <div className="grid grid-cols-12 gap-1.5 h-12 bg-default rounded-2xl p-3 text-sm text-muted flex-shrink-0 items-center">
          <span className="col-span-1 text-center">#</span>
          <span className="col-span-2 pl-0">{t("myCourses.courseName") || "نام دوره"}</span>
          <span className="col-span-2 pr-0">{t("myCourses.aboutCourse") || "درباره دوره"}</span>
          <span className="col-span-2 text-center">{t("myCourses.courseTeacher") || "مدرس"}</span>
          <span className="col-span-1 text-center">{t("myCourses.startDate") || "تاریخ شروع"}</span>
          <span className="col-span-1 text-center">{t("myCourses.coursePrice") || "قیمت"}</span>
          <span className="col-span-2 text-center">{t("myCourses.paymentStatus") || "وضعیت پرداخت"}</span>
          <span className="col-span-1 text-center"></span>
        </div>
        <div className="flex-1 overflow-y-auto mt-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : paginatedCourses.length === 0 ? (
            <div className="text-center text-muted py-10">
              {searchTerm || dateValue || paymentFilter !== "all"
                ? t("myCourses.noCoursesFound") || "دوره‌ای پیدا نشد"
                : t("myCourses.noCourses") || "هیچ دوره‌ای ثبت نشده است"}
            </div>
          ) : (
            paginatedCourses.map((item) => {
              const currentReserveId = item.reserveId || item.id;
              const startTime = item.course?.startTime || item.lastUpdate;
              const title = item.courseTitle || item.course?.title || "-";
              const image = item.tumbImageAddress || item.course?.tumbImageAddress || "/placeholder.jpg";
              const teacher = item.fullName || (item.course?.teacher ? `${item.course.teacher.fName} ${item.course.teacher.lName}` : "-");
              const description = parseDescription(item.desc || item.course?.describe || item.course?.miniDescribe);
              const cost = item.cost ?? item.course?.cost;
              const isUnpaid = item.paymentStatus === "پرداخت نشده" || item.paymentStatus === false;

              return (
                <div
                  key={currentReserveId}
                  className="grid grid-cols-12 gap-1.5 p-3 items-center border-b border-border/50 hover:bg-default/30 rounded-xl transition-colors"
                >
                  <div className="col-span-1 flex justify-center">
                    <img
                      src={image}
                      alt={title}
                      className="w-16 h-12 rounded-xl bg-default object-cover"
                    />
                  </div>
                  <div className="col-span-2 text-sm font-medium text-foreground truncate pl-0" title={title}>
                    {title}
                  </div>
                  <div className="col-span-2 text-sm text-muted truncate pr-0" title={description}>
                    {description}
                  </div>
                  <div className="col-span-2 text-center text-sm text-foreground truncate">
                    {teacher}
                  </div>
                  <div className="col-span-1 text-center text-sm text-foreground">
                    {startTime
                      ? new Date(startTime).toLocaleDateString("fa-IR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </div>
                  <div className="col-span-1 text-center text-sm text-foreground">
                    {cost ? `${Number(cost).toLocaleString("fa-IR")} ${t("myCourses.toman") || "تومان"}` : "رایگان"}
                  </div>
                  <div className="col-span-2 flex justify-center items-center gap-1.5">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        isUnpaid
                          ? "bg-danger/10 text-danger border border-danger/20"
                          : "bg-success/10 text-success border border-success/20"
                      }`}
                    >
                      {isUnpaid ? t("myCourses.unpaid") || "پرداخت نشده" : t("myCourses.paid") || "پرداخت شده"}
                    </span>
                    {isUnpaid && (
                      <button
                        type="button"
                        disabled={payingCourseId === currentReserveId}
                        onClick={() => handlePayment(item)}
                        title={t("myCourses.pay") || "پرداخت"}
                        className="p-1.5 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {payingCourseId === currentReserveId ? (
                          <Spinner size="sm" />
                        ) : (
                          <HugeiconsIcon icon={MoneyAdd02Icon} className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Link
                      to={`/courses/${item.courseId || item.course?.courseId}`}
                      className="p-2 hover:bg-default rounded-lg text-foreground transition-colors"
                    >
                      <HugeiconsIcon icon={ViewIcon} className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-3 mt-auto border-t border-border flex-shrink-0">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-xl bg-default text-foreground disabled:opacity-40 cursor-pointer hover:bg-default/80 transition-all"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-foreground">
              صفحه {currentPage.toLocaleString("fa-IR")} از {totalPages.toLocaleString("fa-IR")}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 rounded-xl bg-default text-foreground disabled:opacity-40 cursor-pointer hover:bg-default/80 transition-all"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <Spinner />
          </div>
        ) : paginatedCourses.length === 0 ? (
          <div className="text-center text-muted py-10">
            {searchTerm || dateValue || paymentFilter !== "all"
              ? t("myCourses.noCoursesFound") || "دوره‌ای پیدا نشد"
              : t("myCourses.noCourses") || "هیچ دوره‌ای ثبت نشده است"}
          </div>
        ) : (
          paginatedCourses.map((item) => {
            const currentReserveId = item.reserveId || item.id;
            const title = item.courseTitle || item.course?.title || "-";
            const image = item.tumbImageAddress || item.course?.tumbImageAddress || "/placeholder.jpg";
            const teacher = item.fullName || (item.course?.teacher ? `${item.course.teacher.fName} ${item.course.teacher.lName}` : "-");
            const cost = item.cost ?? item.course?.cost;
            const isUnpaid = item.paymentStatus === "پرداخت نشده" || item.paymentStatus === false;

            return (
              <div
                key={currentReserveId}
                className="w-full p-3 flex gap-3 items-center bg-background border border-border rounded-2xl shadow-xs justify-between"
              >
                <div className="flex items-center gap-3 w-[75%]">
                  <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 rounded-xl bg-default object-cover flex-shrink-0"
                  />
                  <Link to={`/courses/${item.courseId || item.course?.courseId}`} className="truncate">
                    <span className="block text-sm font-semibold text-foreground truncate max-w-[120px]" title={title}>
                      {title}
                    </span>
                    <span className="block text-xs truncate my-0.5 text-muted">
                      {teacher}
                    </span>
                    <span className="block text-[11px] text-foreground font-medium truncate">
                      {cost ? `${Number(cost).toLocaleString("fa-IR")} ${t("myCourses.toman") || "تومان"}` : "رایگان"}
                    </span>
                  </Link>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isUnpaid
                        ? "bg-danger/10 text-danger border border-danger/20"
                        : "bg-success/10 text-success border border-success/20"
                    }`}
                  >
                    {isUnpaid ? t("myCourses.unpaid") || "پرداخت نشده" : t("myCourses.paid") || "پرداخت شده"}
                  </span>
                  {isUnpaid && (
                    <button
                      type="button"
                      disabled={payingCourseId === currentReserveId}
                      onClick={() => handlePayment(item)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 bg-accent text-accent-foreground rounded-lg font-medium cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                    >
                      {payingCourseId === currentReserveId ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <HugeiconsIcon icon={MoneyAdd02Icon} className="w-3.5 h-3.5" />
                          <span>{t("myCourses.pay") || "پرداخت"}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-xl bg-default text-foreground disabled:opacity-40 cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-foreground">
              صفحه {currentPage.toLocaleString("fa-IR")} از {totalPages.toLocaleString("fa-IR")}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 rounded-xl bg-default text-foreground disabled:opacity-40 cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in duration-200 p-4">
          <div className="w-full bg-white dark:bg-background rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-border max-h-[85vh] overflow-y-auto mb-14 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-muted/40 rounded-full self-center" />

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex items-center gap-1.5 border border-danger/60 text-danger rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-danger/10 active:scale-95 transition-all"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                <span>{t("myCourses.close") || "بستن"}</span>
              </button>
              <h3 className="text-xl font-bold text-foreground">{t("myCourses.filter") || "فیلتر"}</h3>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-end gap-2 text-foreground font-semibold text-sm">
                <span>{t("myCourses.searchCourse") || "جستجو دوره"}</span>
                <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-foreground" />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder={t("myCourses.searchPlaceholder") || "جستجو کنید..."}
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
                  className="w-full h-12 bg-default text-sm text-foreground pr-4 pl-14 rounded-2xl focus:outline-none border border-border"
                />
                <div className="absolute left-0 w-12 h-12 rounded-2xl bg-accent flex justify-center items-center">
                  <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm mb-1 text-foreground">
                  <HugeiconsIcon icon={Calendar02Icon} className="m-0 w-5 h-5" />
                  <span>{t("myCourses.startDate") || "تاریخ شروع"}</span>
                </div>
                {tempDateValue && (
                  <button
                    type="button"
                    onClick={clearTempDateFilter}
                    className="w-7 h-7 bg-danger hover:bg-danger/80 text-danger-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <I18nProvider locale="fa-IR">
                  <DateRangePicker
                    aria-label="بازه تاریخی دوره"
                    className="w-full"
                    endName="endDate"
                    startName="startDate"
                    value={tempDateValue}
                    onChange={setTempDateValue}
                  >
                    <DateField.Group
                      fullWidth
                      className="bg-default rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm"
                    >
                      <DateField.Input slot="start" className="outline-none bg-transparent text-foreground">
                        {(segment) => <DateField.Segment segment={segment} />}
                      </DateField.Input>
                      <DateRangePicker.RangeSeparator className="mx-2 text-muted" />
                      <DateField.Input slot="end" className="outline-none bg-transparent text-foreground">
                        {(segment) => <DateField.Segment segment={segment} />}
                      </DateField.Input>
                      <DateField.Suffix className="mr-auto">
                        <DateRangePicker.Trigger>
                          <DateRangePicker.TriggerIndicator className="text-muted" />
                        </DateRangePicker.Trigger>
                      </DateField.Suffix>
                    </DateField.Group>
                    <DateRangePicker.Popover className="bg-background rounded-2xl shadow-xl border border-border p-2 z-[1010]">
                      <RangeCalendar aria-label="انتخاب تاریخ برگزاری" className="bg-background">
                        <RangeCalendar.Header className="flex items-center justify-between pb-2 bg-background">
                          <RangeCalendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-muted">
                            <RangeCalendar.YearPickerTriggerHeading />
                            <RangeCalendar.YearPickerTriggerIndicator />
                          </RangeCalendar.YearPickerTrigger>
                          <div className="flex gap-1">
                            <RangeCalendar.NavButton slot="previous" className="p-1 rounded-lg hover:bg-default text-foreground cursor-pointer" />
                            <RangeCalendar.NavButton slot="next" className="p-1 rounded-lg hover:bg-default text-foreground cursor-pointer" />
                          </div>
                        </RangeCalendar.Header>
                        <RangeCalendar.Grid className="bg-background">
                          <RangeCalendar.GridHeader>
                            {(day) => <RangeCalendar.HeaderCell className="text-muted font-normal p-1">{day}</RangeCalendar.HeaderCell>}
                          </RangeCalendar.GridHeader>
                          <RangeCalendar.GridBody>
                            {(date) => (
                              <RangeCalendar.Cell
                                date={date}
                                className="p-1 text-center data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-lg text-foreground cursor-pointer"
                              />
                            )}
                          </RangeCalendar.GridBody>
                        </RangeCalendar.Grid>
                      </RangeCalendar>
                    </DateRangePicker.Popover>
                  </DateRangePicker>
                </I18nProvider>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end gap-2 text-foreground font-semibold text-sm">
                <span>{t("myCourses.paymentStatus") || "وضعیت پرداخت"}</span>
                <HugeiconsIcon icon={FilterIcon} className="w-5 h-5 text-foreground" />
              </div>
              <select
                value={tempPaymentFilter}
                onChange={(e) => setTempPaymentFilter(e.target.value)}
                className="w-full h-12 bg-default text-sm text-foreground px-4 rounded-2xl focus:outline-none border border-border cursor-pointer"
              >
                <option value="all">{t("myCourses.all") || "همه"}</option>
                <option value="paid">{t("myCourses.paid") || "پرداخت شده"}</option>
                <option value="unpaid">{t("myCourses.unpaid") || "پرداخت نشده"}</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleApplyMobileFilter}
              className="w-full h-12 mt-2 bg-accent text-accent-foreground font-bold rounded-2xl text-base flex justify-center items-center cursor-pointer hover:opacity-90 active:scale-98 transition-all"
            >
              {t("myCourses.apply") || "اعمال"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;