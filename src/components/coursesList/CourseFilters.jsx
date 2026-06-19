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

import searchIcon from '../../assets/Courses/search-01-stroke-rounded 1.png';
import cellsIcon from '../../assets/Courses/cells-stroke-rounded 1.png';
import layersIcon from '../../assets/Courses/layers-01-stroke-rounded 2.png';
import teacherIcon from '../../assets/Courses/teacher-stroke-rounded 1.png';
import moneyIcon from '../../assets/Courses/money-04-stroke-rounded 2.png';
import calendarIcon from '../../assets/Courses/calendar-02-stroke-rounded 2.png';

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
      className="w-[321px] min-h-[602px] bg-[#F5F5F5] rounded-[30px] p-6 flex flex-col gap-6 shadow-sm"
      style={{ direction: 'rtl' }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
          <span>
            <img src={searchIcon} alt="search" />
          </span>
          <span>جستجوی دوره</span>
        </div>
        <SearchField 
          name="search" 
          defaultValue={filters.Query || ""}
          onSubmit={handleSearchSubmit} 
          onClear={() => handleSearchSubmit("")}
        >
          <SearchField.Group className="bg-white rounded-2xl border-none shadow-sm h-12 px-3 flex items-center">
            <SearchField.Input placeholder="... جستجو کنید" className="w-full text-right text-sm bg-transparent border-none outline-none text-gray-800" />
            <SearchField.ClearButton className="text-gray-400" />
            <SearchField.SearchIcon className="text-blue-600 w-5 h-5 mr-auto cursor-pointer" />
          </SearchField.Group>
        </SearchField>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
          <span>
            <img src={cellsIcon} alt="categories" />
          </span>
          <span>دسته بندی</span>
        </div>
        <Popover isOpen={isCatOpen} onOpenChange={setIsCatOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-white border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-gray-700 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {categories.find(c => String(c.id) === String(filters.CourseTypeId))?.categoryName || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-white rounded-xl shadow-lg border border-gray-100 w-[273px] p-1 max-h-[220px] overflow-y-auto">
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
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-gray-700 select-none
                      ${isSelected ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"}`}
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
        <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
          <span>
            <img src={layersIcon} alt="levels" />
          </span>
          <span>سطح آموزشی</span>
        </div>
        <Popover isOpen={isLevelOpen} onOpenChange={setIsLevelOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-white border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-gray-700 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {levels.find(l => String(l.id) === String(filters.courseLevelId))?.name || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-white rounded-xl shadow-lg border border-gray-100 w-[273px] p-1 overflow-y-auto">
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
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-gray-700 select-none
                      ${isSelected ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"}`}
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
        <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
          <span>
            <img src={teacherIcon} alt="teachers" />
          </span>
          <span>اساتید</span>
        </div>
        <Popover isOpen={isTeacherOpen} onOpenChange={setIsTeacherOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-white border-none rounded-2xl h-12 px-4 flex items-center justify-between shadow-sm text-sm text-gray-700 font-normal">
              <span className="truncate max-w-[220px] text-right w-full">
                {teachers.find(t => String(t.id) === String(filters.TeacherId))?.name || "انتخاب کنید"}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-white rounded-xl shadow-lg border border-gray-100 w-[273px] p-1 overflow-y-auto">
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
                    className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-gray-700 select-none
                      ${isSelected ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"}`}
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
        <div className="flex justify-between items-center text-sm font-bold text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <span>
              <img src={moneyIcon} alt="price" />
            </span>
            <span className="text-gray-700 font-bold text-sm">قیمت</span>
          </div>
          <div className="text-xs font-semibold text-gray-600 flex gap-1" style={{ direction: 'ltr' }}>
            <span>{localPrice[1].toLocaleString()}</span>
            <span className="text-gray-400">تا</span>
            <span>{localPrice[0].toLocaleString()}</span>
            <span className="text-gray-400">از</span>
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
          <Slider.Track className="bg-gray-200 h-1">
            {({ state }) => (
              <>
                <Slider.Fill className="bg-blue-600" />
                {state.values.map((_, i) => (
                  <Slider.Thumb 
                    key={i} 
                    index={i} 
                    className="bg-blue-600 w-5 h-5 border-2 border-white shadow-md cursor-pointer" 
                  />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
          <span>
            <img src={calendarIcon} alt="calendar" />
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
          <DateField.Group fullWidth className="bg-[#EAEAEA] rounded-2xl h-12 flex items-center justify-between px-3 border-none text-sm text-gray-600">
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

          <DateRangePicker.Popover className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
            <RangeCalendar aria-label="انتخاب تاریخ برگزاری">
              <RangeCalendar.Header className="flex items-center justify-between pb-2">
                <RangeCalendar.YearPickerTrigger className="flex items-center gap-1 font-medium text-gray-700">
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
      </div>
    </div>
  );
}