"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  SearchField, 
  DateRangePicker, 
  DateField, 
  RangeCalendar,
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
} from "@hugeicons/core-free-icons";



export default function CourseFilters({ filters, setFilters }) {
  const [localPrice, setLocalPrice] = useState([10000, 5000000]);
  const [categories, setCategories] = useState([]);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);

  const levels = [
    { id: "1", name: "مبتدی" },
    { id: "2", name: "متوسط" },
    { id: "3", name: "پیشرفته" }
  ];

  const teachers = [
    { id: "10", name: "taha null" },
    { id: "11", name: "kian null" }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://188.121.104.25:3001/News/GetListNewsCategory");
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchSubmit = (value) => {
    setFilters(prev => ({
      ...prev,
      Query: value || null,
      PageNumber: 1
    }));
  };

  const handleSelectField = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value || null,
      PageNumber: 1
    }));
  };

  const handleDateChange = (range) => {
    setFilters(prev => ({
      ...prev,
      StartDate: range?.start ? new Date(range.start.year, range.start.month - 1, range.start.day).toISOString() : null,
      EndDate: range?.end ? new Date(range.end.year, range.end.month - 1, range.end.day).toISOString() : null,
      PageNumber: 1
    }));
  };

  return (
    <div 
      className="w-[321px] min-h-[602px] bg-default dark:bg-surface rounded-[30px] p-6 flex flex-col gap-6 shadow-sm"
      style={{ direction: 'rtl' }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <span>
            <HugeiconsIcon icon={CellsIcon} className=" m-0 w-5 h-5 " />
          </span>
          <span>جستجوی دوره</span>
        </div>
        <SearchField 
          name="search" 
          defaultValue={filters.Query || ""}
          onSubmit={handleSearchSubmit} 
          onClear={() => handleSearchSubmit("")}
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
          <span>
            <HugeiconsIcon icon={Search01Icon} className=" m-0 w-5 h-5 " />
          </span>
          <span>دسته بندی</span>
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
          <span>
            <HugeiconsIcon icon={Layers01Icon} className=" m-0 w-5 h-5 " />
          </span>
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
          <span>
            <HugeiconsIcon icon={TeacherIcon} className=" m-0 w-5 h-5 " />
          </span>
          <span>اساتید</span>
        </div>
        <Popover isOpen={isTeacherOpen} onOpenChange={setIsTeacherOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-overlay border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-muted dark:text-gray-300 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {teachers.find(t => String(t.id) === String(filters.TeacherId))?.name || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[273px] p-1 overflow-y-auto">
            <div className="flex flex-col w-full">
              {teachers.map((t) => {
                const isSelected = String(t.id) === String(filters.TeacherId);
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      handleSelectField("TeacherId", isSelected ? null : t.id);
                      setIsTeacherOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-muted dark:text-gray-300 select-none
                      ${isSelected ? "bg-accent-soft text-accent font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                  >
                    <span>{t.name}</span>
                    {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                  </div>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold  mb-1">
          <div className="flex items-center gap-2">
            <span>
              <HugeiconsIcon icon={Money03Icon} className=" m-0 w-5 h-5 " />
            </span>
            <span className=" font-bold text-sm">قیمت</span>
          </div>
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex gap-1" style={{ direction: 'ltr' }}>
            <span>{localPrice[1].toLocaleString()}</span>
            <span className="text-gray-400 dark:text-gray-500">تا</span>
            <span>{localPrice[0].toLocaleString()}</span>
            <span className="text-gray-400 dark:text-gray-500">از</span>
          </div>
        </div>

        <Slider
          className="w-full"
          aria-label="محدوده قیمت"
          value={localPrice}
          minValue={10000}
          maxValue={5000000}
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
                    className="bg-blue-600 w-5 h-5 border-2 border-overbg-overlay dark:border-gray-800 shadow-md cursor-pointer" 
                  />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <span>
            <HugeiconsIcon icon={Calendar02Icon} className=" m-0 w-5 h-5 " />
          </span>
          <span>تاریخ برگزاری</span>
        </div>
        
        <DateRangePicker
          aria-label="بازه تاریخی دوره"
          className="w-full"
          endName="endDate"
          startName="startDate"
          onChange={handleDateChange}
        >
          <DateField.Group fullWidth className="bg-overlay rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm text-gray-600 dark:text-gray-300">
            <DateField.Input slot="start" className="outline-none bg-transparent dark:text-white">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator className="mx-2 text-gray-400 dark:text-gray-500" />
            <DateField.Input slot="end" className="outline-none bg-transparent dark:text-white">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix className="mr-auto">
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator className="text-gray-400 dark:text-gray-500" />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>

          <DateRangePicker.Popover className="bg-overlay rounded-2xl shadow-xl border p-2">
            <RangeCalendar aria-label="انتخاب تاریخ برگزاری">
              <RangeCalendar.Header className="flex items-center justify-between pb-2">
                <RangeCalendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-muted dark:text-gray-300">
                  <RangeCalendar.YearPickerTriggerHeading />
                  <RangeCalendar.YearPickerTriggerIndicator />
                </RangeCalendar.YearPickerTrigger>
                <div className="flex gap-1">
                  <RangeCalendar.NavButton slot="previous" className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" />
                  <RangeCalendar.NavButton slot="next" className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" />
                </div>
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                <RangeCalendar.GridHeader>
                  {(day) => <RangeCalendar.HeaderCell className="text-gray-400 dark:text-gray-500 font-normal p-1">{day}</RangeCalendar.HeaderCell>}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => <RangeCalendar.Cell date={date} className="p-1 text-center data-[selected=true]:bg-blue-600 data-[selected=true]:text-overbg-overlay dark:text-gray-300 rounded-lg" />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
            </RangeCalendar>
          </DateRangePicker.Popover>
        </DateRangePicker>
      </div>
    </div>
  );
}