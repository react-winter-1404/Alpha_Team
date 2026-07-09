"use client";

import React from "react";

const NewsSort = ({ currentSort, onSortChange }) => {
  const tabs = [
    { key: "default", title: "جدیدترین‌ها", col: "insertDate", type: "DESC" },
    { key: "view", title: "پرطرفدارترین", col: "currentView", type: "DESC" },
    { key: "rate", title: "محبوب‌ترین", col: "newsRate", type: "DESC" },
    { key: "like", title: "پرامتیازترین", col: "currentLikeCount", type: "DESC" },
  ];

  const handleTabChange = (col, type) => {
    if (currentSort.sortingCol === col && currentSort.sortType === type) {
      onSortChange({ sortingCol: "", sortType: "" });
    } else {
      onSortChange({ sortingCol: col, sortType: type });
    }
  };

  return (
    <div dir="rtl" className="w-full bg-default rounded-[16px] p-2 backdrop-blur-sm flex items-center gap-4 select-none">
      <span className="text-foreground font-medium text-xs mr-2">ترتیب</span>
      
      <div className="flex gap-2 bg-transparent rounded-xl p-0.5">
        {tabs.map((tab) => {
          const isSelected = currentSort.sortingCol === tab.col && currentSort.sortType === tab.type;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.col, tab.type)}
              className={`h-8 text-xs font-medium px-4 rounded-xl transition-all duration-200 cursor-pointer outline-none border-none
                ${isSelected 
                  ? "bg-accent text-accent-foreground shadow-sm font-bold" 
                  : "text-muted hover:text-foreground hover:bg-default-foreground/10"
                }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NewsSort;