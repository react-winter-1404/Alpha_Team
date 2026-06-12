"use client";

import React, { useState } from "react";

const NewsSort = ({ onSortChange }) => {
  const [activeTab, setActiveTab] = useState("default");

  const tabs = [
    { key: "default", title: "جدیدترین‌ها", col: "insertDate", type: "DESC" },
    { key: "view", title: "پرطرفدارترین ", col: "currentView", type: "DESC" },
    { key: "rate", title: "محبوب‌ترین ", col: "newsRate", type: "DESC" },
    { key: "like", title: "پرامتیازترین ", col: "currentLikeCount", type: "DESC" },
  ];

  const handleTabChange = (key, sortingCol, sortType) => {
    setActiveTab(key);
    onSortChange({ sortingCol, sortType });
  };

  return (
    <div dir="rtl" className="w-full bg-[#e4e4e4]/40 rounded-[16px] p-2 backdrop-blur-sm flex items-center gap-4 select-none">
      <span className="text-gray-700 font-medium text-xs mr-2">ترتیب</span>
      
      <div className="flex gap-2 bg-transparent rounded-xl p-0.5">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key, tab.col, tab.type)}
              className={`h-8 text-xs font-medium px-4 rounded-xl transition-all duration-200 cursor-pointer outline-none border-none
                ${isSelected 
                  ? "bg-blue-600 text-white shadow-sm font-semibold" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
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