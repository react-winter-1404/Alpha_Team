import { useState, useEffect } from "react";
import { Spinner } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { getUserFavoriteNews } from "../../../core/services/userPanel/get";
import { Calendar02Icon, Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { DateRangePicker, DateField, RangeCalendar } from "@heroui/react";
import { I18nProvider } from "@heroui/react";

const FavMag = () => {
  const [myFavoriteNews, setMyFavoriteNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserFavoriteNews();
      setMyFavoriteNews(response.data.myFavoriteNews || []);
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

  const filteredNews = myFavoriteNews.filter((news) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !search ||
      news.title?.toLowerCase().includes(search) ||
      news.auther?.toLowerCase().includes(search) ||
      news.news?.miniDescribe?.toLowerCase().includes(search);

    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const newsDate = new Date(news.news.insertDate);
      if (dateRange.start) {
        matchesDate = matchesDate && newsDate >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        matchesDate = matchesDate && newsDate <= new Date(dateRange.end);
      }
    }

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <div className="hidden md:block">
        <h3 className="text-[32px] text-foreground mt-5">علاقه‌مندی مقالات</h3>

        <div className="flex justify-start items-center gap-5 mt-7">
          <div>
            <div className="flex justify-start items-center gap-2">
              <HugeiconsIcon icon={Search01Icon} className="m-0 w-5 h-5 text-foreground" />
              <span className="text-[16px] text-foreground">جستجوِی مقاله</span>
            </div>

            <div className="relative mt-3">
              <input
                type="text"
                placeholder="جستجو کنید ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[289px] h-[48px] bg-default text-[14px] text-foreground indent-3 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-accent border border-border"
              />
              <div className="absolute top-[-1px] left-0 cursor-pointer w-[48px] h-[48px] rounded-[16px] bg-accent flex justify-center items-center">
                <HugeiconsIcon icon={Search01Icon} className="m-0 w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm mb-1 text-foreground">
                <span>
                  <HugeiconsIcon icon={Calendar02Icon} className="m-0 w-5 h-5" />
                </span>
                <span>تاریخ انتشار</span>
              </div>

              {(dateRange.start || dateRange.end) && (
                <button
                  onClick={clearDateFilter}
                  className="w-7 h-7 bg-danger hover:bg-danger/80 text-danger-foreground rounded-full flex items-center justify-center transition-colors"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <I18nProvider locale="fa-IR">
                <DateRangePicker
                  aria-label="بازه تاریخی انتشار"
                  className="w-full"
                  endName="endDate"
                  startName="startDate"
                  onChange={handleDateChange}
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

                  <DateRangePicker.Popover className="bg-overlay rounded-2xl shadow-xl border border-border p-2">
                    <RangeCalendar aria-label="انتخاب تاریخ انتشار">
                      <RangeCalendar.Header className="flex items-center justify-between pb-2">
                        <RangeCalendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-muted">
                          <RangeCalendar.YearPickerTriggerHeading />
                          <RangeCalendar.YearPickerTriggerIndicator />
                        </RangeCalendar.YearPickerTrigger>
                        <div className="flex gap-1">
                          <RangeCalendar.NavButton slot="previous" className="p-1 rounded-lg hover:bg-default text-foreground" />
                          <RangeCalendar.NavButton slot="next" className="p-1 rounded-lg hover:bg-default text-foreground" />
                        </div>
                      </RangeCalendar.Header>
                      <RangeCalendar.Grid>
                        <RangeCalendar.GridHeader>
                          {(day) => <RangeCalendar.HeaderCell className="text-muted font-normal p-1">{day}</RangeCalendar.HeaderCell>}
                        </RangeCalendar.GridHeader>
                        <RangeCalendar.GridBody>
                          {(date) => <RangeCalendar.Cell date={date} className="p-1 text-center data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground rounded-lg text-foreground" />}
                        </RangeCalendar.GridBody>
                      </RangeCalendar.Grid>
                    </RangeCalendar>
                  </DateRangePicker.Popover>
                </DateRangePicker>
              </I18nProvider>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full h-[681px] rounded-[16px] bg-overlay p-3 flex flex-col justify-start items-center">
          <div className="w-full h-[48px] text-muted bg-default rounded-[16px] flex justify-between items-center p-3">
            <span className="w-[15%] flex justify-center">#</span>
            <span className="w-[15%] flex justify-center">عنوان</span>
            <span className="w-[15%] flex justify-center">منتشر کننده</span>
            <span className="w-[15%] flex justify-center">درباره مقاله</span>
            <span className="w-[15%] flex justify-center">تاریخ انتشار</span>
            <span className="w-[10%] flex justify-center"></span>
          </div>

          <div className="flex flex-col gap-4 w-full h-full py-4 px-3 overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full text-muted text-lg">
                <Spinner />
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="flex justify-center items-center h-full text-muted text-lg">
                {searchTerm || dateRange.start || dateRange.end
                  ? "مقاله‌ای با شرایط انتخابی یافت نشد"
                  : "مقاله‌ای در لیست علاقه‌مندی‌ها یافت نشد"}
              </div>
            ) : (
              filteredNews.map((news) => (
                <div key={news.id} className="w-full h-25 flex items-center justify-between">
                  <img src={news.currentImageAddressTumb} className="w-[15%] h-full flex justify-center bg-muted rounded-2xl object-cover" />
                  <div className="w-[15%] text-lg text-foreground overflow-hidden whitespace-nowrap text-ellipsis">{news.title}</div>
                  <div className="w-[15%] flex justify-center text-foreground">{news.auther}</div>
                  <div className="w-[15%] text-foreground overflow-hidden whitespace-nowrap text-ellipsis">{news.news.miniDescribe}</div>
                  <div className="w-[15%] flex justify-center text-foreground">
                    {new Date(news.news.insertDate).toLocaleDateString("fa-IR", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="w-[10%] flex justify-center">
                    <Link to={`/news/${news.newsId}`}>
                      <HugeiconsIcon className="cursor-pointer text-foreground" icon={ViewIcon} />
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
          <h3 className="text-[32px] text-foreground">علاقه‌مندی مقاله</h3>
          <button className="w-[83px] h-[41px] rounded-[64px] bg-accent text-[16px] text-accent-foreground">فیلتر</button>
        </div>

        <div className="mt-10 w-full p-3 rounded-[16px] bg-overlay flex flex-col items-center justify-center gap-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-muted text-lg"><Spinner /></div>
          ) : filteredNews.length === 0 ? (
            <div className="flex justify-center items-center h-full text-muted text-lg">
              {searchTerm || dateRange.start || dateRange.end
                ? "مقاله‌ای با شرایط انتخابی یافت نشد"
                : "مقاله‌ای در لیست علاقه‌مندی‌ها یافت نشد"}
            </div>
          ) : (
            myFavoriteNews.map((news) => (
              <div key={news.id} className="w-full h-[90px] p-3 flex gap-3 items-center">
                <img src={news.currentImageAddressTumb} alt="" className="w-[115px] h-[82px] rounded-[8px] bg-muted" />
                <Link to={`/news/${news.newsId}`}>
                  <span className="block text-[16px] text-foreground">{news.title}</span>
                  <span className="block text-[16px] text-muted">{news.auther}</span>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FavMag;