"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  SearchField, 
  DateRangePicker, 
  DateField, 
  RangeCalendar,
  Popover,
  Button
} from "@heroui/react";

const NewsFilter = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatIds, setSelectedCatIds] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://188.121.111.8:3001/News/GetListNewsCategory");
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
    setSearchQuery(value);
    onFilterChange({
      query: value,
      categoryIds: selectedCatIds,
      startDate: dateRange?.start ? new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day).toISOString() : null,
      endDate: dateRange?.end ? new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day).toISOString() : null
    });
  };

  const handleCategoryClick = (id) => {
    let updatedIds = [...selectedCatIds];
    const stringId = String(id);

    if (updatedIds.includes(stringId)) {
      updatedIds = updatedIds.filter((item) => item !== stringId);
    } else {
      if (updatedIds.length < 2) {
        updatedIds.push(stringId);
      } else {
        return;
      }
    }

    setSelectedCatIds(updatedIds);

    onFilterChange({
      query: searchQuery,
      categoryIds: updatedIds,
      startDate: dateRange?.start ? new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day).toISOString() : null,
      endDate: dateRange?.end ? new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day).toISOString() : null
    });
  };

  const handleDateChange = (range) => {
    setDateRange(range);
    onFilterChange({
      query: searchQuery,
      categoryIds: selectedCatIds,
      startDate: range?.start ? new Date(range.start.year, range.start.month - 1, range.start.day).toISOString() : null,
      endDate: range?.end ? new Date(range.end.year, range.end.month - 1, range.end.day).toISOString() : null
    });
  };

  const getSelectedCategoriesLabel = () => {
    if (selectedCatIds.length === 0) return "انتخاب کنید";
    return categories
      .filter((cat) => selectedCatIds.includes(String(cat.id)))
      .map((cat) => cat.categoryName)
      .join("، ");
  };

  return (
    <div 
      dir="rtl" 
      className="w-[321px] h-[319px] bg-[#e4e4e4]/40 rounded-[24px] p-5 flex flex-col justify-between box-border backdrop-blur-sm"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm mb-1">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>جستجوی اخبار و مقالات</span>
        </div>
        <SearchField name="search" onSubmit={handleSearchSubmit} onClear={() => handleSearchSubmit("")}>
          <SearchField.Group className="bg-white/80 border-0 rounded-xl h-11 px-3 shadow-none flex items-center">
            <SearchField.Input 
              className="w-full text-right text-xs bg-transparent border-none outline-none text-gray-800 placeholder-gray-400" 
              placeholder="جستجو کنید..." 
            />
            <SearchField.ClearButton className="text-gray-400 hover:text-gray-600" />
            <SearchField.SearchIcon className="text-blue-600 w-5 h-5 mr-auto cursor-pointer" />
          </SearchField.Group>
        </SearchField>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm mb-1">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>دسته بندی</span>
        </div>

        <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-white/80 border-0 rounded-xl h-11 px-3 flex items-center justify-between shadow-none text-xs text-gray-700 font-normal normal-case">
              <span className="truncate max-w-[240px] text-right w-full">{getSelectedCategoriesLabel()}</span>
              <span className="text-gray-400 text-xxs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-white rounded-xl shadow-lg border border-gray-100 w-[281px] p-1 max-h-[220px] overflow-y-auto">
            <div className="flex flex-col w-full">
              {categories.map((cat) => {
                const isSelected = selectedCatIds.includes(String(cat.id));
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
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

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm mb-1">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>تاریخ انتشار</span>
        </div>
        <DateRangePicker 
          className="w-full" 
          endName="endDate" 
          startName="startDate"
          value={dateRange}
          onChange={handleDateChange}
        >
          <DateField.Group fullWidth className="bg-white/80 border-0 rounded-xl h-11 px-3 flex items-center justify-between shadow-none text-xs text-gray-600">
            <DateField.Input slot="start" className="outline-none bg-transparent">
              {(segment) => <DateField.Segment segment={segment} className="text-xs" />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator className="mx-1 text-gray-400" />
            <DateField.Input slot="end" className="outline-none bg-transparent">
              {(segment) => <DateField.Segment segment={segment} className="text-xs" />}
            </DateField.Input>
            <DateField.Suffix className="mr-auto">
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator className="text-gray-400" />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DateRangePicker.Popover className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
            <RangeCalendar aria-label="انتخاب بازه زمانی" className="text-xs">
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
              <RangeCalendar.YearPickerGrid className="mt-2 border-t pt-2">
                <RangeCalendar.YearPickerGridBody>
                  {({year}) => <RangeCalendar.YearPickerCell year={year} className="p-1 text-center hover:bg-gray-100 rounded-md" />}
                </RangeCalendar.YearPickerGridBody>
              </RangeCalendar.YearPickerGrid>
            </RangeCalendar>
          </DateRangePicker.Popover>
        </DateRangePicker>
      </div>
    </div>
  );
};

export default NewsFilter;