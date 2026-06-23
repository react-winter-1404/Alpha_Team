import { useState, useEffect } from "react";
import { getUserFavoriteCourses } from "../../../core/services/userPanel/get";
import { Spinner } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { Calendar02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { DateRangePicker, DateField, RangeCalendar } from "@heroui/react";
import { I18nProvider } from "@heroui/react";

const FavCourses = () => {
  const [myFavoriteCourses, setMyFavoriteCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserFavoriteCourses();
      setMyFavoriteCourses(response.data.favoriteCourseDto || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleDateChange = (range) => {
    setDateRange(range || { start: null, end: null });
  };

  const clearDateFilter = () => {
    setDateRange({ start: null, end: null });
  };

  const filteredCourses = myFavoriteCourses.filter((course) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !search ||
      course.courseTitle?.toLowerCase().includes(search) ||
      course.teacheName?.toLowerCase().includes(search);

    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const courseDate = new Date(course.course.startTime);
      if (dateRange.start) {
        matchesDate = matchesDate && courseDate >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        matchesDate = matchesDate && courseDate <= new Date(dateRange.end);
      }
    }

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <div className="hidden md:block">
        <h3 className="text-[32px] text-[#272727] mt-5">علاقه‌مندی دوره</h3>

        <div className="flex justify-start items-center gap-5 mt-7">
          <div>
            <div className="flex justify-start items-center gap-2">
              <img
                src="/public/icons/search-01-stroke-rounded 1.png"
                alt=""
                className="w-[24px] h-[24px]"
              />
              <span className="text-[16px] text-[#272727]">جستجوِی دوره</span>
            </div>

            <div className="relative mt-3">
              <input
                type="text"
                placeholder="جستجو کنید ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[289px] h-[48px] bg-[#bebebe] text-[14px] text-[#787878] indent-3 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#3772ff]"
              />
              <div className="absolute top-[-1px] left-0 cursor-pointer w-[48px] h-[48px] rounded-[16px] bg-[#3772ff] flex justify-center items-center">
                <img
                  src="/public/icons/search-01-stroke-rounded 2.png"
                  alt=""
                  className="h-[24px] w-[24px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                <span>
                  <HugeiconsIcon icon={Calendar02Icon} className="m-0 w-5 h-5" />
                </span>
                <span>تاریخ برگزاری</span>
              </div>

              {(dateRange.start || dateRange.end) && (
                <button
                  onClick={clearDateFilter}
                  className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
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
                  onChange={handleDateChange}
                >
                  <DateField.Group fullWidth className="bg-[#bebebe] rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm text-[#787878]">
                    <DateField.Input slot="start" className="outline-none bg-transparent">
                      {(segment) => <DateField.Segment segment={segment} />}
                    </DateField.Input>
                    <DateRangePicker.RangeSeparator className="mx-2 text-gray-400" />
                    <DateField.Input slot="end" className="outline-none bg-transparent">
                      {(segment) => <DateField.Segment segment={segment} />}
                    </DateField.Input>
                    <DateField.Suffix className="mr-auto">
                      <DateRangePicker.Trigger>
                        <DateRangePicker.TriggerIndicator className="text-gray-400" />
                      </DateRangePicker.Trigger>
                    </DateField.Suffix>
                  </DateField.Group>

                  <DateRangePicker.Popover className="bg-overlay rounded-2xl shadow-xl border p-2">
                    <RangeCalendar aria-label="انتخاب تاریخ برگزاری">
                      <RangeCalendar.Header className="flex items-center justify-between pb-2">
                        <RangeCalendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-muted">
                          <RangeCalendar.YearPickerTriggerHeading />
                          <RangeCalendar.YearPickerTriggerIndicator />
                        </RangeCalendar.YearPickerTrigger>
                        <div className="flex gap-1">
                          <RangeCalendar.NavButton slot="previous" className="p-1 rounded-lg hover:bg-gray-100" />
                          <RangeCalendar.NavButton slot="next" className="p-1 rounded-lg hover:bg-gray-100" />
                        </div>
                      </RangeCalendar.Header>
                      <RangeCalendar.Grid>
                        <RangeCalendar.GridHeader>
                          {(day) => <RangeCalendar.HeaderCell className="text-gray-400 font-normal p-1">{day}</RangeCalendar.HeaderCell>}
                        </RangeCalendar.GridHeader>
                        <RangeCalendar.GridBody>
                          {(date) => <RangeCalendar.Cell date={date} className="p-1 text-center data-[selected=true]:bg-blue-600 data-[selected=true]:text-white rounded-lg" />}
                        </RangeCalendar.GridBody>
                      </RangeCalendar.Grid>
                    </RangeCalendar>
                  </DateRangePicker.Popover>
                </DateRangePicker>
              </I18nProvider>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full h-[681px] rounded-[16px] bg-[#fefdff] p-3 flex flex-col justify-start items-center">
          <div className="w-full h-[48px] text-muted bg-[#f0f0f0] rounded-[16px] flex justify-between items-center p-3">
            <span className="w-[15%] flex justify-center">#</span>
            <span className="w-[15%] flex justify-center">نام دوره</span>
            <span className="w-[15%] flex justify-center">استاد دوره</span>
            <span className="w-[15%] flex justify-center">شروع دوره</span>
            <span className="w-[15%] flex justify-center">قیمت دوره</span>
            <span className="w-[10%] flex justify-center"></span>
          </div>

          <div className="border-black flex flex-col gap-4 w-full h-full py-4 px-3 overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full text-[#787878] text-lg">
                <Spinner />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="flex justify-center items-center h-full text-[#787878] text-lg">
                {searchTerm || dateRange.start || dateRange.end
                  ? "دوره‌ای با شرایط انتخابی یافت نشد"
                  : "دوره‌ای در لیست علاقه‌مندی‌ها یافت نشد"}
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="w-full h-25 flex items-center justify-between">
                  <img src={course.imageAddress} className="w-[15%] h-full flex justify-center bg-muted rounded-2xl object-cover" />
                  <div className="w-[15%] text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                    {course.courseTitle}
                  </div>
                  <div className="w-[15%] flex justify-center">{course.teacheName}</div>
                  <div className="w-[15%] flex justify-center">
                    {new Date(course.course.startTime).toLocaleDateString("fa-IR", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="w-[15%] flex justify-center">
                    {course.cost && course.cost.toLocaleString("fa-IR")} تومان
                  </div>
                  <div className="w-[10%] flex justify-center">
                    <Link to={`/courses/${course.courseId}`}>
                      <HugeiconsIcon className="cursor-pointer" icon={ViewIcon} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex justify-between items-center">
          <h3 className="text-[32px] text-[#272727]">علاقه‌مندی دوره</h3>
          <button className="w-[83px] h-[41px] rounded-[64px] bg-[#3772ff] text-[16px] text-[#fefdff]">فیلتر</button>
        </div>

        <div className="mt-10 w-full p-3 rounded-[16px] bg-[#fefdff] flex flex-col items-center justify-center gap-2">
          {
            isLoading ? (
              <div className="flex justify-center items-center h-full text-[#787878] text-lg">
                <Spinner />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="flex justify-center items-center h-full text-[#787878] text-lg">
                {searchTerm || dateRange.start || dateRange.end
                  ? "دوره‌ای با شرایط انتخابی یافت نشد"
                  : "دوره‌ای در لیست علاقه‌مندی‌ها یافت نشد"}
              </div>
            ) : (
            myFavoriteCourses.map((course) => (
              <div key={course.id}  className="w-full h-[90px] p-3 flex justify-between items-center">
                <img src={course.imageAddress} alt="" className="w-[115px] h-[82px] rounded-[8px] bg-[#d9d9d9]"/>
                <Link to={`/courses/${course.courseId}`}>
                  <span className="block text-[16px] text-[#272727]">{course.courseTitle}</span>
                  <span className="block text-[16px] text-[#787878]">{course.teacheName}</span>
                  <span className="block text-[16px] text-[#787878]"></span>
                </Link>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default FavCourses;