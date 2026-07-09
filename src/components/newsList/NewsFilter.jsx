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
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

const NewsFilter = ({ 
  currentFilters, 
  onFilterChange, 
  isMobile = false, 
  isOpen = false, 
  onClose,
  currentSort,
  onSortChange 
}) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.query || "");
  const [categories, setCategories] = useState([]);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

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

  useEffect(() => {
    setSearchTerm(currentFilters.query || "");
  }, [currentFilters.query]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({
        ...currentFilters,
        query: searchTerm || ""
      });
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleCategoryClick = (id) => {
    let updatedIds = [...currentFilters.categoryIds];
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

    onFilterChange({
      ...currentFilters,
      categoryIds: updatedIds
    });
  };

  const handleDateChange = (range) => {
    onFilterChange({
      ...currentFilters,
      startDate: range?.start ? new Date(range.start.year, range.start.month - 1, range.start.day).toISOString() : null,
      endDate: range?.end ? new Date(range.end.year, range.end.month - 1, range.end.day).toISOString() : null
    });
  };

  const getSelectedCategoriesLabel = () => {
    if (!currentFilters.categoryIds || currentFilters.categoryIds.length === 0) return "انتخاب کنید";
    return categories
      .filter((cat) => currentFilters.categoryIds.includes(String(cat.id)))
      .map((cat) => cat.categoryName)
      .join("، ");
  };

  const getSortLabel = () => {
    if (currentSort?.sortingCol === "insertDate") return "جدیدترین‌ها";
    if (currentSort?.sortingCol === "currentView") return "پرطرفدارترین";
    if (currentSort?.sortingCol === "newsRate") return "محبوب‌ترین";
    if (currentSort?.sortingCol === "currentLikeCount") return "پرامتیازترین";
    return "انتخاب کنید";
  };

  const renderFilterFields = () => (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-foreground font-medium text-sm mb-1">
          <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>جستجوی اخبار و مقالات</span>
        </div>
        <SearchField 
          name="search" 
          value={searchTerm} 
          onChange={(val) => setSearchTerm(val)} 
          onClear={() => setSearchTerm("")}
        >
          <SearchField.Group className="bg-overlay border-0 rounded-xl h-11 px-3 shadow-none flex items-center">
            <SearchField.Input 
              className="w-full text-right text-xs bg-transparent border-none outline-none text-foreground dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              placeholder="جستجو کنید..." 
            />
            <SearchField.ClearButton className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
            <SearchField.SearchIcon className="text-blue-600 w-5 h-5 mr-auto cursor-pointer" />
          </SearchField.Group>
        </SearchField>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-foreground font-medium text-sm mb-1">
          <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>دسته بندی</span>
        </div>

        <Popover isOpen={isCatOpen} onOpenChange={setIsCatOpen} placement="bottom-start">
          <Popover.Trigger>
            <Button className="w-full bg-overlay border-0 rounded-xl h-11 px-3 flex items-center justify-between shadow-none text-xs text-foreground dark:text-gray-300 font-normal normal-case">
              <span className="truncate max-w-[240px] text-right w-full">{getSelectedCategoriesLabel()}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xxs">▼</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[281px] p-1 max-h-[220px] overflow-y-auto">
            <div className="flex flex-col w-full">
              {categories.map((cat) => {
                const isSelected = currentFilters.categoryIds.includes(String(cat.id));
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
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
        <div className="flex items-center gap-2 text-foreground font-medium text-sm mb-1">
          <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>تاریخ انتشار</span>
        </div>
        <DateRangePicker 
          className="w-full" 
          endName="endDate" 
          startName="startDate"
          onChange={handleDateChange}
        >
          <DateField.Group fullWidth className="bg-overlay border-0 rounded-xl h-11 px-3 flex items-center justify-between shadow-none text-xs text-gray-600 dark:text-gray-300">
            <DateField.Input slot="start" className="outline-none bg-transparent dark:text-white">
              {(segment) => <DateField.Segment segment={segment} className="text-xs" />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator className="mx-1 text-gray-400 dark:text-gray-500" />
            <DateField.Input slot="end" className="outline-none bg-transparent dark:text-white">
              {(segment) => <DateField.Segment segment={segment} className="text-xs" />}
            </DateField.Input>
            <DateField.Suffix className="mr-auto">
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator className="text-gray-400 dark:text-gray-500" />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DateRangePicker.Popover className="bg-overlay rounded-2xl shadow-xl border p-2">
            <RangeCalendar aria-label="انتخاب بازه زمانی" className="text-xs">
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
                  {(date) => <RangeCalendar.Cell date={date} className="p-1 text-center data-[selected=true]:bg-blue-600 data-[selected=true]:text-white rounded-lg dark:text-gray-300" />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
            </RangeCalendar>
          </DateRangePicker.Popover>
        </DateRangePicker>
      </div>

      {isMobile && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            <span className="text-sm font-bold">ترتیب</span>
          </div>
          <Popover isOpen={isSortOpen} onOpenChange={setIsSortOpen} placement="bottom-start">
            <Popover.Trigger>
              <Button className="w-full bg-overlay border-none rounded-xl h-11 px-3 flex items-center justify-between shadow-none text-xs text-muted dark:text-gray-300 font-normal">
                <span className="text-right w-full">{getSortLabel()}</span>
                <span className="text-gray-400 text-xs">▼</span>
              </Button>
            </Popover.Trigger>
            <Popover.Content className="bg-overlay rounded-xl shadow-lg border w-[281px] p-1">
              <div className="flex flex-col w-full">
                {[
                  { id: "default", label: "جدیدترین‌ها", col: "insertDate", type: "DESC" },
                  { id: "view", label: "پرطرفدارترین", col: "currentView", type: "DESC" },
                  { id: "rate", label: "محبوب‌ترین", col: "newsRate", type: "DESC" },
                  { id: "like", label: "پرامتیازترین", col: "currentLikeCount", type: "DESC" }
                ].map((item) => {
                  const isAct = currentSort?.sortingCol === item.col && currentSort?.sortType === item.type;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (isAct) {
                          onSortChange({ sortingCol: "", sortType: "" });
                        } else {
                          onSortChange({ sortingCol: item.col, sortType: item.type });
                        }
                        setIsSortOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 my-0.5 text-xs rounded-lg cursor-pointer transition-colors text-muted dark:text-gray-300 select-none
                        ${isAct ? "bg-accent-soft text-accent font-bold" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
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
    </>
  );

  if (isMobile) {
    return (
      <div 
        className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ direction: 'rtl' }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all" onClick={onClose} />
        <div className={`relative w-full max-h-[90vh] bg-white dark:bg-surface-secondary rounded-t-[40px] p-6 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <span className="text-lg font-bold text-gray-800 dark:text-white">ترتیب و فیلتر</span>
            <button onClick={onClose} className="flex items-center gap-1 border border-red-500 text-red-500 px-4 py-1.5 rounded-full text-xs font-bold bg-red-50/50 hover:bg-red-50 transition-colors cursor-pointer">
              <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
              <span>بستن</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6 pb-20">
            {renderFilterFields()}
          </div>
          <div className="absolute bottom-4 left-6 right-6 bg-gradient-to-t from-white dark:from-surface-secondary pt-2">
            <Button onClick={onClose} className="w-full h-12 bg-blue-600 text-white font-bold text-base rounded-2xl shadow-md cursor-pointer transition-all active:scale-95">
              اعمال
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-[321px] min-h-[319px] bg-default dark:bg-surface rounded-[24px] p-5 flex flex-col gap-5 shadow-sm">
      {renderFilterFields()}
    </div>
  );
};

export default NewsFilter;