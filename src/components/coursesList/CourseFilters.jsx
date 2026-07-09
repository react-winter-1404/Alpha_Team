"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  SearchField, 
  DatePicker, 
  DateField, 
  Calendar,
  Popover,
  Button,
  Slider
} from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  CellsIcon,
  Layers01Icon,
  TeacherIcon,
  Money03Icon,
  Calendar02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { I18nProvider } from "@react-aria/i18n";

export default function CourseFilters({ 
  filters, 
  setFilters, 
  isMobile = false, 
  isOpen = false, 
  onClose,
  currentSortingCol,
  currentSortType,
  onSortChange 
}) {
  const [searchTerm, setSearchTerm] = useState(filters.Query || "");
  const [localPrice, setLocalPrice] = useState([10000, 5000000]);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const levels = [
    { id: "cl1", name: "مبتدی" },
    { id: "cl2", name: "متوسط" },
    { id: "cl3", name: "پیشرفته" }
  ];

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [catResponse, teacherResponse] = await Promise.all([
          axios.get("http://188.121.104.25:3001/News/GetListNewsCategory"),
          axios.get("http://188.121.104.25:3001/Home/GetTeachers")
        ]);

        if (catResponse.data) setCategories(catResponse.data);
        if (teacherResponse.data) setTeachers(teacherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchFilterData();
  }, []);

  useEffect(() => {
    setSearchTerm(filters.Query || "");
  }, [filters.Query]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        Query: searchTerm || null,
        PageNumber: 1
      }));
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setFilters]);

  const handleSelectField = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value || null,
      PageNumber: 1
    }));
  };

  const handleSingleDateChange = (dateValue) => {
    if (!dateValue) {
      setFilters(prev => ({ ...prev, StartDate: null, PageNumber: 1 }));
      return;
    }
    
    const jsDate = dateValue.toDate('UTC');
    const year = jsDate.getUTCFullYear();
    const month = String(jsDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(jsDate.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;

    setFilters(prev => ({
      ...prev,
      StartDate: formattedDate,
      PageNumber: 1
    }));
  };

  const getSortLabel = () => {
    if (currentSortingCol === "cost" && currentSortType === "DESC") return "گران‌ترین‌ها";
    if (currentSortingCol === "cost" && currentSortType === "ASC") return "ارزان‌ترین‌ها";
    if (currentSortingCol === "courseRate") return "بالاترین امتیاز";
    if (currentSortingCol === "capacity") return "محبوب‌ترین‌ها";
    return "انتخاب کنید";
  };

  const renderFilterFields = () => (
    <I18nProvider locale="fa-IR-u-ca-persian">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <HugeiconsIcon icon={CellsIcon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span>جستجوی دوره</span>
        </div>
        <SearchField 
          name="search" 
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          onClear={() => setSearchTerm("")}
        >
          <SearchField.Group className="bg-overlay rounded-2xl border-none shadow-sm h-12 px-3 flex items-center">
            <SearchField.Input placeholder="... جستجو کنید" className="w-full text-right text-sm bg-transparent border-none outline-none dark:text-white dark:placeholder-gray-400" />
            <SearchField.ClearButton className="text-gray-400 dark:text-gray-500" />
            <SearchField.SearchIcon className="text-blue-600 w-5 h-5 mr-auto cursor-pointer" />
          </SearchField.Group>
        </SearchField>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span>دسته‌بندی</span>
        </div>
        <Popover isOpen={isCatOpen} onOpenChange={setIsCatOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-overlay border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-muted dark:text-gray-300 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {categories.find(c => String(c.id) === String(filters.CourseTypeId))?.categoryName || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[273px] p-1 max-h-[220px] overflow-y-auto">
            <div className="flex flex-col w-full">
              {categories.map((cat) => {
                const isSelected = String(cat.id) === String(filters.CourseTypeId);
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      handleSelectField("CourseTypeId", isSelected ? null : cat.id);
                      setIsCatOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-muted dark:text-gray-300 select-none
                      ${isSelected ? "bg-accent-soft text-accent font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                  >
                    <span>{cat.categoryName}</span>
                    {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                  </div>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <HugeiconsIcon icon={Layers01Icon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span>سطح آموزشی</span>
        </div>
        <Popover isOpen={isLevelOpen} onOpenChange={setIsLevelOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-overlay border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-muted dark:text-gray-300 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {levels.find(l => String(l.id) === String(filters.courseLevelId))?.name || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[273px] p-1 overflow-y-auto">
            <div className="flex flex-col w-full">
              {levels.map((lvl) => {
                const isSelected = String(lvl.id) === String(filters.courseLevelId);
                return (
                  <div
                    key={lvl.id}
                    onClick={() => {
                      handleSelectField("courseLevelId", isSelected ? null : lvl.id);
                      setIsLevelOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-muted dark:text-gray-300 select-none
                      ${isSelected ? "bg-accent-soft text-accent font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                  >
                    <span>{lvl.name}</span>
                    {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                  </div>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <HugeiconsIcon icon={TeacherIcon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span>اساتید</span>
        </div>
        <Popover isOpen={isTeacherOpen} onOpenChange={setIsTeacherOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-overlay border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-muted dark:text-gray-300 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {teachers.find(t => String(t.teacherId) === String(filters.TeacherId))?.fullName || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[273px] p-1 max-h-[220px] overflow-y-auto">
            <div className="flex flex-col w-full">
              {teachers.map((t) => {
                const isSelected = String(t.teacherId) === String(filters.TeacherId);
                return (
                  <div
                    key={t.teacherId}
                    onClick={() => {
                      handleSelectField("TeacherId", isSelected ? null : t.teacherId);
                      setIsTeacherOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-muted dark:text-gray-300 select-none
                      ${isSelected ? "bg-accent-soft text-accent font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                  >
                    <span>{t.fullName}</span>
                    {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                  </div>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold mb-1">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Money03Icon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="font-bold text-sm">قیمت</span>
          </div>
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex gap-1" style={{ direction: 'ltr' }}>
            <span>{localPrice[1].toLocaleString()}</span>
            <span className="text-gray-400 dark:text-gray-500">تا</span>
            <span className="text-gray-400 dark:text-gray-500">از</span>
            <span>{localPrice[0].toLocaleString()}</span>
          </div>
        </div>

        <Slider
          className="w-full"
          aria-label="محدوده قیمت"
          value={localPrice}
          minValue={10000}
          maxValue={15000000}
          step={50000}
          onChange={setLocalPrice}
          onChangeEnd={(val) => {
            setFilters(prev => ({
              ...prev,
              CostDown: val[0],
              CostUp: val[1],
              PageNumber: 1
            }));
          }}
        >
          <Slider.Track className="bg-gray-200 dark:bg-gray-600 h-1">
            {({ state }) => (
              <>
                <Slider.Fill className="bg-blue-600" />
                {state.values.map((_, i) => (
                  <Slider.Thumb 
                    key={i} 
                    index={i} 
                    className="bg-blue-600 w-5 h-5 border-2 border-overlay dark:border-gray-800 shadow-md cursor-pointer" 
                  />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <HugeiconsIcon icon={Calendar02Icon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span>تاریخ شروع برگزاری</span>
        </div>
        
        <DatePicker 
          className="w-full" 
          name="date"
          aria-label="تاریخ شروع دوره"
          onChange={handleSingleDateChange}
          placement="bottom-start"
          value={filters.StartDate ? null : undefined}
        >
          <DateField.Group fullWidth className="bg-overlay rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm text-gray-600 dark:text-gray-300">
            <DateField.Input className="outline-none bg-transparent dark:text-white">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix className="mr-auto flex items-center gap-2">
              {filters.StartDate && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSingleDateChange(null);
                  }}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                </button>
              )}
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator className="text-gray-400 dark:text-gray-500" />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover className="bg-overlay rounded-2xl shadow-xl border p-4 w-[320px] min-w-[320px] max-w-[320px] overflow-visible">
            <Calendar aria-label="Event date" className="w-full select-none overflow-visible">
              <Calendar.Header className="flex items-center justify-between pb-3 border-b mb-2">
                <Calendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-sm text-gray-700 dark:text-gray-300">
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>
                <div className="flex gap-2">
                  <Calendar.NavButton slot="previous" className="p-1.5 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white" />
                  <Calendar.NavButton slot="next" className="p-1.5 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white" />
                </div>
              </Calendar.Header>
              <Calendar.Grid className="w-full table-fixed border-collapse px-1">
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] p-0.5 text-center">{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => <Calendar.Cell date={date} className="p-0.5 text-center text-xs font-medium data-[selected=true]:bg-blue-600 data-[selected=true]:text-white dark:text-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" />}
                </Calendar.GridBody>
              </Calendar.Grid>
              <Calendar.YearPickerGrid className="w-full mt-2">
                <Calendar.YearPickerGridBody>
                  {({year}) => <Calendar.YearPickerCell year={year} className="p-1.5 text-center text-xs rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 cursor-pointer" />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>
      </div>

      {isMobile && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            <span className="text-sm font-bold">ترتیب</span>
          </div>
          <Popover isOpen={isSortOpen} onOpenChange={setIsSortOpen} placement="bottom-start">
            <Popover.Trigger>
              <Button className="w-full bg-overlay border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-muted dark:text-gray-300 font-normal">
                <span className="text-right w-full">{getSortLabel()}</span>
                <span className="text-gray-400 text-xs">▼</span>
              </Button>
            </Popover.Trigger>
            <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[273px] p-1">
              <div className="flex flex-col w-full">
                {[
                  { id: "price-desc", label: "گران‌ترین‌ها", col: "cost", type: "DESC" },
                  { id: "price-asc", label: "ارزان‌ترین‌ها", col: "cost", type: "ASC" },
                  { id: "rating", label: "بالاترین امتیاز", col: "courseRate", type: "DESC" },
                  { id: "popularity", label: "محبوب‌ترین‌ها", col: "capacity", type: "DESC" }
                ].map((item) => {
                  const isAct = currentSortingCol === item.col && currentSortType === item.type;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (isAct) {
                          onSortChange(null, null);
                        } else {
                          onSortChange(item.col, item.type);
                        }
                        setIsSortOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-muted dark:text-gray-300 select-none
                        ${isAct ? "bg-accent-soft text-accent font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                    >
                      <span>{item.label}</span>
                      {isAct && <span className="text-blue-600 font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
            </Popover.Content>
          </Popover>
        </div>
      )}
    </I18nProvider>
  );

  if (isMobile) {
    return (
      <div 
        className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ direction: 'rtl' }}
      >
        <div 
          className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all" 
          onClick={onClose}
        />

        <div 
          className={`relative w-full max-h-[90vh] bg-white dark:bg-surface-secondary rounded-t-[40px] p-6 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <span className="text-lg font-bold text-gray-800 dark:text-white">ترتیب و فیلتر</span>
            
            <button 
              onClick={onClose}
              className="flex items-center gap-1 border border-red-500 text-red-500 px-4 py-1.5 rounded-full text-xs font-bold bg-red-50/50 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
              <span>بستن</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6 pb-20">
            {renderFilterFields()}
          </div>

          <div className="absolute bottom-4 left-6 right-6 bg-gradient-to-t from-white dark:from-surface-secondary pt-2">
            <Button 
              onClick={onClose}
              className="w-full h-12 bg-blue-600 text-white font-bold text-base rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              اعمال
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-[321px] min-h-[602px] bg-default dark:bg-surface rounded-[30px] p-6 flex flex-col gap-6 shadow-sm"
      style={{ direction: 'rtl' }}
    >
      {renderFilterFields()}
    </div>
  );
}