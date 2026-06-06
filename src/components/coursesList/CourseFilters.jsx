"use client";

import { useState } from 'react';
import { 
  Label, 
  Slider, 
  SearchField, 
  DateRangePicker, 
  DateField, 
  RangeCalendar,
  Select,
  ListBox
} from "@heroui/react";

export default function CourseFilters({ filters, setFilters }) {
 
  const [localPrice, setLocalPrice] = useState([10000, 1000000]);

  
const updateFilter = (name, value) => {
  
  let finalValue = value;
  if (value instanceof Set || (value && typeof value === 'object' && 'anchorKey' in value)) {
    finalValue = Array.from(value)[0] || null;
  }

  setFilters(prev => ({
    ...prev,
    [name]: finalValue,
    PageNumber: 1 
  }));
};

  return (
    <div 
      className="w-[321px] min-h-[602px] bg-[#F5F5F5] rounded-[30px] p-6 flex flex-col gap-6 shadow-sm"
      style={{ direction: 'rtl' }}
    >
      
      
      <div className="flex flex-col gap-2">
        <SearchField 
          fullWidth 
          name="search"
          value={filters.Query}
          onValueChange={(val) => updateFilter("Query", val)}
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
            <span>🔍</span>
            <Label>جو دوره جست</Label>
          </div>
          <SearchField.Group className="bg-white rounded-2xl border-none shadow-sm h-12 px-3">
            <SearchField.SearchIcon className="text-gray-400" />
            <SearchField.Input placeholder="... جست جو کنید" className="text-right text-sm" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

   
      <div className="flex flex-col gap-2">
        <Select 
          fullWidth 
          placeholder="انتخاب کنید"
          value={filters.CourseTypeId ? [filters.CourseTypeId] : []}
          onChange={(keys) => updateFilter("CourseTypeId", keys)}
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
            <span>⬢</span>
            <Label>بندی‌دسته</Label>
          </div>
          <Select.Trigger className="bg-white rounded-2xl h-12 px-4 shadow-sm border-none">
            <Select.Value className="text-sm" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="frontend" textValue="فرانت اند">
                فرانت اند <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="backend" textValue="بک اند">
                بک اند <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="mobile" textValue="موبایل">
                موبایل <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

     
      <div className="flex flex-col gap-2">
        <Select 
          fullWidth 
          placeholder="انتخاب کنید"
          value={filters.courseLevelId ? [filters.courseLevelId] : []}
          onChange={(keys) => updateFilter("courseLevelId", keys)}
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
            <span>📚</span>
            <Label>سطح آموزشی</Label>
          </div>
          <Select.Trigger className="bg-white rounded-2xl h-12 px-4 shadow-sm border-none">
            <Select.Value className="text-sm" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="1" textValue="مبتدی">
                مبتدی <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="2" textValue="متوسط">
                متوسط <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="3" textValue="پیشرفته">
                پیشرفته <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

  
      <div className="flex flex-col gap-2">
        <Select 
          fullWidth 
          placeholder="انتخاب کنید"
          value={filters.TeacherId ? [filters.TeacherId] : []}
          onChange={(keys) => updateFilter("TeacherId", keys)}
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-1">
            <span>👨‍🏫</span>
            <Label>اساتید</Label>
          </div>
          <Select.Trigger className="bg-white rounded-2xl h-12 px-4 shadow-sm border-none">
            <Select.Value className="text-sm" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="10" textValue="استاد اسفندیاری">
                استاد اسفندیاری <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="11" textValue="استاد اصغری">
                استاد اصغری <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>


      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <span>💵</span>
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
          <span>📅</span>
          <Label>تاریخ برگزاری</Label>
        </div>
        
        <DateRangePicker
        aria-label="بازه تاریخی دوره"
          className="w-full"
          endName="endDate"
          startName="startDate"
          onChange={(range) => {
            if (range) {
              setFilters(prev => ({
                ...prev,
                StartDate: range.start.toString(),
                EndDate: range.end.toString(),
                PageNumber: 1
              }));
            } else {
              setFilters(prev => ({ ...prev, StartDate: '', EndDate: '' }));
            }
          }}
        >
          <DateField.Group fullWidth className="bg-[#EAEAEA] rounded-2xl h-12 flex items-center justify-center px-3 border-none">
            <DateField.Input slot="start" className="text-sm">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator className="mx-2 text-gray-400" />
            <DateField.Input slot="end" className="text-sm">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>

          <DateRangePicker.Popover>
            <RangeCalendar aria-label="انتخاب تاریخ برگزاری">
              <RangeCalendar.Header>
                <RangeCalendar.YearPickerTrigger>
                  <RangeCalendar.YearPickerTriggerHeading />
                  <RangeCalendar.YearPickerTriggerIndicator />
                </RangeCalendar.YearPickerTrigger>
                <RangeCalendar.NavButton slot="previous" />
                <RangeCalendar.NavButton slot="next" />
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                <RangeCalendar.GridHeader>
                  {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => <RangeCalendar.Cell date={date} />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
            </RangeCalendar>
          </DateRangePicker.Popover>
        </DateRangePicker>
      </div>

    </div>
  );
}