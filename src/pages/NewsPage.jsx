"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Spinner } from "@heroui/react";
import NewsFilter from "../components/newsList/NewsFilter";
import NewsSort from "../components/newsList/NewsSort";
import NewsCard from "../components/newsList/newsCard";
import NewsPagination from "../components/newsList/NewsPagination";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  const [currentFilters, setCurrentFilters] = useState({
    query: "",
    categoryIds: [],
    startDate: null,
    endDate: null,
  });

  const [currentSort, setCurrentSort] = useState({
    sortingCol: "",
    sortType: "",
  });

  const fetchNews = useCallback(async (page, filters, sort) => {
    try {
      setIsLoading(true);
      let url = "http://188.121.111.8:3001/News";
      const params = new URLSearchParams();

      params.append("PageNumber", String(page));
      params.append("RowsOfPage", String(itemsPerPage));

      if (filters.query) {
        params.append("Query", filters.query);
      }

      if (filters.categoryIds && filters.categoryIds.length > 0) {
        filters.categoryIds.forEach((id) => {
          params.append("NewsCategoryId", id);
        });
      }

      if (sort.sortingCol) {
        params.append("SortingCol", sort.sortingCol);
      }
      if (sort.sortType) {
        params.append("SortType", sort.sortType);
      }

      const response = await axios.get(url, { params });

      if (response.data && response.data.news) {
        let filteredData = response.data.news;

        if (filters.startDate || filters.endDate) {
          filteredData = filteredData.filter((item) => {
            const itemDate = new Date(item.insertDate).getTime();
            if (filters.startDate && filters.endDate) {
              return itemDate >= new Date(filters.startDate).getTime() && itemDate <= new Date(filters.endDate).getTime();
            }
            if (filters.startDate) {
              return itemDate >= new Date(filters.startDate).getTime();
            }
            if (filters.endDate) {
              return itemDate <= new Date(filters.endDate).getTime();
            }
            return true;
          });
        }

        setNewsList(filteredData);
        setTotalItems(response.data.totalCount || filteredData.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(currentPage, currentFilters, currentSort);
  }, [currentPage, currentFilters, currentSort, fetchNews]);

  const handleFilterChange = (newFilters) => {
    setCurrentPage(1);
    setCurrentFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setCurrentPage(1);
    setCurrentSort(newSort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="w-[1380px] h-[2737px] rounded-[40px] bg-[#fefdff] border-4 border-[#e4e4e4] overflow-hidden mx-auto my-10 p-[32px] grid grid-cols-12 gap-10 relative">
      
      <div className="col-span-9 flex flex-col gap-4">
        <NewsSort onSortChange={handleSortChange} />
        
        <div className="flex flex-col gap-6 mt-2 min-h-[400px] justify-center">
          {isLoading ? (
            <div className="w-full flex justify-center py-40">
              <Spinner size="lg" label="در حال بارگذاری اخبار..." color="primary" labelColor="primary" />
            </div>
          ) : newsList.length > 0 ? (
            newsList.map((news) => (
              <div key={news.id} className="relative w-full h-[288px]">
                <NewsCard
                  imageURL={news.currentImageAddress || news.currentImageAddressTumb}
                  title={news.title}
                  discribtion={news.miniDescribe}
                  publisher={news.addUserFullName}
                  number={news.currentView}
                  date={new Date(news.insertDate).toLocaleDateString("fa-IR")}
                  like={news.currentLikeCount}
                  dislike={news.currentDissLikeCount}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-20 text-gray-400 font-medium">
              خبری با فیلترهای انتخاب شده پیدا نشد.
            </div>
          )}
        </div>
      </div>

      <div className="col-span-3 w-[321px]">
        <NewsFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="absolute bottom-[40px] right-[32px] w-[985px] flex justify-center">
        {!isLoading && totalPages > 1 && (
          <NewsPagination
            page={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default NewsPage;