import { useEffect, useState } from "react";
import { getUserCoursesReserve } from "../../../core/services/userPanel/get";
import RowCourseCard from "../card/RowCourseCard";
import { Chip, Spinner } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar02Icon, Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { DateRangePicker, DateField, RangeCalendar } from "@heroui/react";
import { I18nProvider } from "@heroui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyReserve = () => {
  const { t } = useTranslation("panel");
  const [myCoursesReserve, setMyCoursesReserve] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [dateValue, setDateValue] = useState(null);
  const [acceptFilter, setAcceptFilter] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempDateValue, setTempDateValue] = useState(null);
  const [tempAcceptFilter, setTempAcceptFilter] = useState("all");

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserCoursesReserve();
      setMyCoursesReserve(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const clearDateFilter = () => {
    setDateValue(null);
  };

  const clearTempDateFilter = () => {
    setTempDateValue(null);
  };

  const toggleAcceptFilter = (value) => {
    setAcceptFilter((prev) => (prev === value ? "all" : value));
  };

  const toggleTempAcceptFilter = (value) => {
    setTempAcceptFilter((prev) => (prev === value ? "all" : value));
  };

  const openFilterModal = () => {
    setTempSearchTerm(searchTerm);
    setTempDateValue(dateValue);
    setTempAcceptFilter(acceptFilter);
    setIsFilterModalOpen(true);
  };

  const handleApplyMobileFilter = () => {
    setSearchTerm(tempSearchTerm);
    setDateValue(tempDateValue);
    setAcceptFilter(tempAcceptFilter);
    setIsFilterModalOpen(false);
  };

  const jalaliToGregorian = (jy, jm, jd) => {
    const salPar = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gy = jy <= 979 ? 621 : 1600;
    jy -= jy <= 979 ? 0 : 979;
    let days = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
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

  const filteredCourses = myCoursesReserve.filter((item) => {
    const search = searchTerm.toLowerCase().trim();
    
    const title = item.courseName || item.courseTitle || item.course?.courseTitle || item.course?.title || "";
    const teacherName = item.teacher || item.teacheName || item.teacherName || item.course?.teacherName || "";

    const matchesSearch = !search || title.toLowerCase().includes(search) || teacherName.toLowerCase().includes(search);
    
    let matchesDate = true;
    if (dateValue && (dateValue.start || dateValue.end)) {
      const rawDateStr = item.insertDate || item.reserDate || item.startDate || item.startTime;
      
      if (rawDateStr) {
        const itemDate = new Date(rawDateStr);
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

    let matchesAccept = true;
    if (acceptFilter !== "all") {
      matchesAccept = item.accept === (acceptFilter === "true");
    }

    return matchesSearch && matchesDate && matchesAccept;
  });

  return (
    <div className="h-full w-full flex flex-col pb-0 p-4 md:p-6 gap-6 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">{t("myReserve.title")}</h3>
        <button type="button" onClick={openFilterModal} className="md:hidden w-[83px] h-[41px] rounded-[64px] bg-accent text-sm text-accent-foreground flex items-center justify-center font-medium cursor-pointer hover:opacity-90 active:scale-95 transition-all">
          {t("myReserve.filter") || "فیلتر"}
        </button>
      </div>

      <div className="hidden md:flex justify-start items-center gap-5 flex-shrink-0 flex-wrap">
        <div>
          <div className="flex justify-start items-center gap-2">
            <HugeiconsIcon icon={Search01Icon} className="m-0 w-5 h-5 text-foreground" />
            <span className="text-sm text-foreground">{t("myReserve.searchCourse")}</span>
          </div>
          <div className="relative mt-3">
            <input type="text" placeholder={t("myReserve.searchPlaceholder")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-[289px] h-12 bg-default text-sm text-foreground indent-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-border" />
            <div className="absolute top-0 left-0 cursor-pointer w-12 h-12 rounded-2xl bg-accent flex justify-center items-center">
              <HugeiconsIcon icon={Search01Icon} className="m-0 w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-foreground">
              <span><HugeiconsIcon icon={Calendar02Icon} className="m-0 w-5 h-5" /></span>
              <span>{t("myReserve.startDate")}</span>
            </div>
            {dateValue && (
              <button type="button" onClick={clearDateFilter} className="w-7 h-7 bg-danger hover:bg-danger/80 text-danger-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <I18nProvider locale="fa-IR">
              <DateRangePicker 
                aria-label="بازه تاریخی برگزاری" 
                className="w-full" 
                endName="endDate" 
                startName="startDate" 
                value={dateValue}
                onChange={setDateValue}
              >
                <DateField.Group fullWidth className="bg-default rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm">
                  <DateField.Input slot="start" className="outline-none bg-transparent text-foreground">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                  <DateRangePicker.RangeSeparator className="mx-2 text-muted" />
                  <DateField.Input slot="end" className="outline-none bg-transparent text-foreground">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
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
                        {(date) => <RangeCalendar.Cell date={date} className="p-1 text-center data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-lg text-foreground cursor-pointer" />}
                      </RangeCalendar.GridBody>
                    </RangeCalendar.Grid>
                  </RangeCalendar>
                </DateRangePicker.Popover>
              </DateRangePicker>
            </I18nProvider>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <label className="font-bold text-sm text-foreground">{t("myReserve.filterBy")} :</label>
          <div className="flex justify-center items-center gap-2">
            <div onClick={() => toggleAcceptFilter("true")} className={`h-[41px] w-[101px] cursor-pointer rounded-[64px] text-sm flex justify-center items-center transition-all ${acceptFilter === "true" ? "bg-accent text-accent-foreground" : "border border-border text-foreground hover:bg-default/50"}`}>
              {t("myReserve.accepted")}
            </div>
            <div onClick={() => toggleAcceptFilter("false")} className={`h-[41px] w-[101px] cursor-pointer rounded-[64px] text-sm flex justify-center items-center transition-all ${acceptFilter === "false" ? "bg-accent text-accent-foreground" : "border border-border text-foreground hover:bg-default/50"}`}>
              {t("myReserve.notAccepted")}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-overlay rounded-2xl border border-border p-4 overflow-hidden flex-col min-h-90">
        <div className="grid grid-cols-7 gap-2 h-12 bg-default rounded-2xl p-3 text-sm text-muted flex-shrink-0">
          <span className="col-span-1">#</span>
          <span className="col-span-1">{t("myReserve.courseName")}</span>
          <span className="col-span-1">{t("myReserve.courseTeacher")}</span>
          <span className="col-span-1">{t("myReserve.startDate")}</span>
          <span className="col-span-1">{t("myReserve.coursePrice")}</span>
          <span className="col-span-1">{t("myReserve.registerStatus")}</span>
          <span className="col-span-1"></span>
        </div>
        <div className="flex-1 overflow-y-auto mt-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full"><Spinner /></div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center text-muted py-10">{searchTerm || dateValue || acceptFilter !== "all" ? t("myReserve.noCoursesFound") : t("myReserve.noReservedCourse")}</div>
          ) : (
            filteredCourses.map((course) => <RowCourseCard key={course.id} course={course} />)
          )}
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-20"><Spinner /></div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-muted py-10">{searchTerm || dateValue || acceptFilter !== "all" ? t("myReserve.noCoursesFound") : t("myReserve.noFavCourses")}</div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="w-full h-[90px] p-3 flex gap-3 items-center bg-background border border-border rounded-2xl shadow-xs">
              <img src={course.image} alt="" className="w-[27%] h-[82px] rounded-xl bg-default object-cover" />
              <Link to={`/courses/${course.courseId}`} className="w-[70%]">
                <span className="block text-sm font-semibold text-foreground truncate">{course.courseName}</span>
                <span className="block text-sm truncate my-1 text-muted">{course.teacher}</span>
                <Chip variant="soft" color={course.accept ? "success" : "danger"} className="font-bold px-2 py-1 text-xs">{course.accept ? t("myReserve.accepted") : t("myReserve.notAccepted")}</Chip>
              </Link>
            </div>
          ))
        )}
      </div>

      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in duration-200 p-4">
          <div className="w-full bg-white dark:bg-background rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-border max-h-[85vh] overflow-y-auto mb-14 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-muted/40 rounded-full self-center" />
            
            <div className="flex justify-between items-center">
              <button type="button" onClick={() => setIsFilterModalOpen(false)} className="flex items-center gap-1.5 border border-danger/60 text-danger rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-danger/10 active:scale-95 transition-all">
                <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                <span>{t("myReserve.close") || "بستن"}</span>
              </button>
              <h3 className="text-xl font-bold text-foreground">{t("myReserve.filter") || "فیلتر"}</h3>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-end gap-2 text-foreground font-semibold text-sm">
                <span>{t("myReserve.searchCourse") || "جستجو دوره"}</span>
                <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-foreground" />
              </div>
              <div className="relative flex items-center">
                <input type="text" placeholder={t("myReserve.searchPlaceholder") || "جست جو کنید ..."} value={tempSearchTerm} onChange={(e) => setTempSearchTerm(e.target.value)} className="w-full h-12 bg-default text-sm text-foreground pr-4 pl-14 rounded-2xl focus:outline-none border border-border" />
                <div className="absolute left-0 w-12 h-12 rounded-2xl bg-accent flex justify-center items-center">
                  <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm mb-1 text-foreground">
                  <span><HugeiconsIcon icon={Calendar02Icon} className="m-0 w-5 h-5" /></span>
                  <span>{t("myReserve.startDate") || "تاریخ برگزاری"}</span>
                </div>
                {tempDateValue && (
                  <button type="button" onClick={clearTempDateFilter} className="w-7 h-7 bg-danger hover:bg-danger/80 text-danger-foreground rounded-full flex items-center justify-center cursor-pointer transition-colors">
                    <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <I18nProvider locale="fa-IR">
                  <DateRangePicker 
                    aria-label="بازه تاریخی برگزاری" 
                    className="w-full" 
                    endName="endDate" 
                    startName="startDate" 
                    value={tempDateValue}
                    onChange={setTempDateValue}
                  >
                    <DateField.Group fullWidth className="bg-default rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm">
                      <DateField.Input slot="start" className="outline-none bg-transparent text-foreground">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                      <DateRangePicker.RangeSeparator className="mx-2 text-muted" />
                      <DateField.Input slot="end" className="outline-none bg-transparent text-foreground">{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
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
                            {(date) => <RangeCalendar.Cell date={date} className="p-1 text-center data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-lg text-foreground cursor-pointer" />}
                          </RangeCalendar.GridBody>
                        </RangeCalendar.Grid>
                      </RangeCalendar>
                    </DateRangePicker.Popover>
                  </DateRangePicker>
                </I18nProvider>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm text-foreground text-right">{t("myReserve.filterBy") || "فیلتر بر اساس"} :</label>
              <div className="flex justify-center items-center gap-3">
                <div onClick={() => toggleTempAcceptFilter("true")} className={`h-[41px] flex-1 cursor-pointer rounded-[64px] text-sm flex justify-center items-center transition-all ${tempAcceptFilter === "true" ? "bg-accent text-accent-foreground" : "border border-border text-foreground hover:bg-default/50"}`}>
                  {t("myReserve.accepted") || "تایید شده"}
                </div>
                <div onClick={() => toggleTempAcceptFilter("false")} className={`h-[41px] flex-1 cursor-pointer rounded-[64px] text-sm flex justify-center items-center transition-all ${tempAcceptFilter === "false" ? "bg-accent text-accent-foreground" : "border border-border text-foreground hover:bg-default/50"}`}>
                  {t("myReserve.notAccepted") || "تایید نشده"}
                </div>
              </div>
            </div>

            <button type="button" onClick={handleApplyMobileFilter} className="w-full h-12 mt-2 bg-accent text-accent-foreground font-bold rounded-2xl text-base flex justify-center items-center cursor-pointer hover:opacity-90 active:scale-98 transition-all">
              {t("myReserve.apply") || "اعمال"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReserve;