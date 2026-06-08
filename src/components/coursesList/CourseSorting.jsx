"use client";

// import React from "react";
import { Tag, TagGroup } from "@heroui/react";

function CourseSorting({ currentSortingCol, currentSortType, onSortChange }) {
  
  const handleSelectionChange = (keys) => {
    const selectedId = Array.from(keys)[0];
    
    if (!selectedId) {
     
      onSortChange(null, null);
      return;
    }

  
    switch (selectedId) {
      case "price-desc":
        onSortChange("cost", "DESC"); 
        break;
      case "price-asc":
        onSortChange("cost", "ASC"); 
        break;
      case "rating":
        onSortChange("courseRate", "DESC"); 
        break;
      case "popularity":
        onSortChange("capacity", "DESC"); 
        break;
      default:
        onSortChange(null, null);
    }
  };


  let activeKey = [];
  if (currentSortingCol === "cost" && currentSortType === "DESC") activeKey = ["price-desc"];
  else if (currentSortingCol === "cost" && currentSortType === "ASC") activeKey = ["price-asc"];
  else if (currentSortingCol === "courseRate") activeKey = ["rating"];
  else if (currentSortingCol === "capacity") activeKey = ["popularity"];

  return (
    <div className="flex items-center gap-3 bg-[#F5F5F5] px-6 py-3 rounded-[20px] shadow-sm mb-6 w-full" style={{ direction: 'rtl' }}>
      <span className="text-gray-700 font-bold text-sm shrink-0">مرتب‌سازی بر اساس:</span>
      
      <TagGroup 
        aria-label="سورت کردن دوره‌ها" 
        selectionMode="single"
        selectedKeys={activeKey}
        onSelectionChange={handleSelectionChange}
      >
        <TagGroup.List className="flex gap-2">
          <Tag id="price-desc" className="cursor-pointer font-medium text-xs px-3 py-1 rounded-xl">
            گران‌ترین‌ها
          </Tag>
          <Tag id="price-asc" className="cursor-pointer font-medium text-xs px-3 py-1 rounded-xl">
            ارزان‌ترین‌ها
          </Tag>
          <Tag id="rating" className="cursor-pointer font-medium text-xs px-3 py-1 rounded-xl">
            بالاترین امتیاز
          </Tag>
          <Tag id="popularity" className="cursor-pointer font-medium text-xs px-3 py-1 rounded-xl">
            محبوب‌ترین‌ها
          </Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  );
}
export default CourseSorting;
