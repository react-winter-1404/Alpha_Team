"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Spinner } from "@heroui/react";
import NavbarHeader  from "./components/landing/NavbarHeader";
import Footer from "./components/landing/Footer";
import NewsFilter from "../components/newsList/NewsFilter";
import NewsSort from "../components/newsList/NewsSort";
import NewsCard from "../components/newsList/newsCard";
import NewsPagination from "../components/newsList/NewsPagination";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      let url = "http://188.121.104.25:3001/News";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between" style={{ direction: 'rtl' }}>
      <div>
        <NavbarHeader />
        
        <div className="max-w-[1380px] w-full min-h-[500px] pb-[60px] rounded-[24px] md:rounded-[40px] dark:bg-surface-secondary border-4 overflow-hidden mx-auto my-6 md:my-10 p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 relative">
          
          <div className="col-span-1 lg:col-span-9 flex flex-col justify-between order-last lg:order-first">
            <div className="flex flex-col gap-4">
              
              <div className="flex flex-row justify-end lg:justify-between items-center gap-4 w-full">
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 h-10 rounded-xl font-bold text-sm shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>ترتیب و فیلتر</span>
                  <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
                </button>

                <div className="hidden lg:block w-full">
                  <NewsSort currentSort={currentSort} onSortChange={handleSortChange} />
                </div>
              </div>
              
              <div className="flex flex-col gap-6 mt-2 min-h-[400px] justify-start">
                {isLoading ? (
                  <div className="w-full flex justify-center py-40">
                    <Spinner size="lg" color="primary" />
                  </div>
                ) : newsList.length > 0 ? (
                  <div className="flex flex-col gap-6 w-full">
                    {newsList.map((news) => (
                      <div key={news.id} className="relative w-full min-h-[288px]">
                        <NewsCard
                          imageURL={news.currentImageAddress || news.currentImageAddressTumb || "https://via.placeholder.com/427x287"}
                          title={news.title}
                          discribtion={news.miniDescribe}
                          publisher={news.addUserFullName}
                          number={news.currentView}
                          date={new Date(news.insertDate).toLocaleDateString("fa-IR")}
                          like={news.currentLikeCount}
                          dislike={news.currentDissLikeCount}
                          id={news.id}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center py-20 text-gray-400 dark:text-gray-500 font-medium">
                    خبری با فیلترهای انتخاب شده پیدا نشد.
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex justify-center mt-12 overflow-x-auto">
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

          <div className="hidden lg:block col-span-1 lg:col-span-3 w-full lg:max-w-[321px] mx-auto">
            <NewsFilter 
              currentFilters={currentFilters} 
              onFilterChange={handleFilterChange} 
              isMobile={false} 
            />
          </div>

        </div>
      </div>

      <NewsFilter 
        currentFilters={currentFilters} 
        onFilterChange={handleFilterChange} 
        isMobile={true} 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />

      <Footer />
    </div>
  );
};

export default NewsPage;