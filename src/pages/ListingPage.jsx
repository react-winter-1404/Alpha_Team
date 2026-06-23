import { useState, useEffect } from 'react';
import apiClient from '../core/interceptor/interceptor';
import { Spinner } from '@heroui/react';
import NavbarHeader from './components/landing/NavbarHeader';
import Footer from './components/landing/Footer';
import CourseFilters from '../components/coursesList/CourseFilters';
import CourseCard from '../components/coursesList/CourseCard';
import CoursePagination from '../components/coursesList/CoursePagination';
import CourseSorting from '../components/coursesList/CourseSorting';
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GridViewIcon,
  ViewAgendaIcon,
  FilterIcon,
} from "@hugeicons/core-free-icons";

const ListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    PageNumber: 1,
    RowsOfPage: 9,
    SortingCol: null,
    SortType: null,
    Query: null,
    CostDown: null,
    CostUp: null,
    TechCount: null,
    ListTech: null,
    courseLevelId: null,
    CourseTypeId: null,
    StartDate: null,
    EndDate: null,
    TeacherId: null
  });

  const fetchCoursesData = async () => {
    setLoading(true);
    try {
      const cleanedParams = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'CostDown' && (value === 10000 || value === 1000000)) return;
          if (key === 'CostUp' && (value === 4960000 || value === 1000000)) return;
          cleanedParams[key] = value;
        }
      });

      const response = await apiClient.get('/Home/GetCoursesWithPagination', { params: cleanedParams });
      if (response.data) {
        const courseList = response.data.courseFilterDtos || [];
        const total = response.data.totalCount || courseList.length || 0;
        setCourses(courseList);
        setTotalCount(Number(total));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, [filters]);

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, PageNumber: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sortingCol, sortType) => {
    setFilters(prev => ({ ...prev, SortingCol: sortingCol, SortType: sortType, PageNumber: 1 }));
  };

  const totalPages = Math.ceil(totalCount / filters.RowsOfPage) || 1;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between" style={{ direction: 'rtl' }}>
      <div>
        <NavbarHeader />
        
        <div className="max-w-[1380px] w-full min-h-[500px] pb-[60px] rounded-[24px] md:rounded-[40px] dark:bg-surface-secondary border-4 overflow-hidden mx-auto my-6 md:my-10 p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 relative">
          
          <div className="col-span-1 lg:col-span-9 flex flex-col justify-between order-last lg:order-first">
            <div className="flex flex-col gap-4">
              
              <div className="flex flex-row justify-end sm:justify-between items-center gap-4 w-full">
  
              <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 h-10 rounded-xl font-bold text-sm shadow-sm cursor-pointer transition-all active:scale-[0.98]"
  >
              <span>ترتیب و فیلتر</span>
              <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
              </button>

                <div className="hidden lg:block w-full sm:flex-1">
                  <CourseSorting 
                    currentSortingCol={filters.SortingCol}
                    currentSortType={filters.SortType}
                    onSortChange={handleSortChange}
                  />
                </div>
                
                <div className="hidden sm:flex items-center gap-2 border-r border-gray-500 pr-4 mr-4">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-accent shadow-sm text-accent-foreground ' : 'opacity-50'}`}>
                    <HugeiconsIcon icon={GridViewIcon} className="m-0 w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode('row')} className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'row' ? 'bg-accent shadow-sm text-accent-foreground ' : 'opacity-50'}`}>
                    <HugeiconsIcon icon={ViewAgendaIcon} className="m-0 w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-2 min-h-[400px] justify-start">
                {loading ? (
                  <div className="w-full flex justify-center py-40">
                    <Spinner size="lg" color="primary" />
                  </div>
                ) : courses.length === 0 ? (
                  <div className="w-full text-center py-20 text-gray-400 font-medium">دوره‌ای با فیلترهای انتخاب شده یافت نشد.</div>
                ) : (
                  <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center" : "flex flex-col gap-6 w-full"}>
                    {courses.map((course, index) => (
                      <div key={course.id || course.courseId || index} className={viewMode === 'grid' ? "w-full flex justify-center" : "relative w-full min-h-[288px]"}>
                        <CourseCard
                          viewMode={viewMode}
                          imageURL={course.tumbImageAddress || course.imageAddress || "https://via.placeholder.com/315x225"}
                          title={course.title || course.courseName || ""}
                          discribtion={course.describe || course.shortDescribe || ""}
                          teacher={course.teacherName || "مدرس دوره"}
                          date={course.lastUpdate || course.startDate || ""}
                          number={course.capacity || 0}
                          price={course.cost?.toLocaleString() || "0"}
                          id={course.courseId}
                          likeCount={course.likeCount}
                          dissLikeCount={course.dissLikeCount}
                          technologyList={course.technologyList}
                          levelName={course.levelName}
                          userLikedId={course.userLikedId}
                          userIsLiked={course.userIsLiked}
                          currentUserDissLike={course.currentUserDissLike}
                          isUserFavorite={course.isUserFavorite}
                          onUpdate={fetchCoursesData}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full flex justify-center mt-12 overflow-x-auto">
              {!loading && totalPages > 1 && (
                <CoursePagination
                  page={filters.PageNumber}
                  totalPages={totalPages}
                  itemsPerPage={filters.RowsOfPage}
                  totalItems={totalCount}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
          
          <div className="hidden lg:block col-span-1 lg:col-span-3 w-full lg:max-w-[321px] mx-auto">
            <CourseFilters filters={filters} setFilters={setFilters} isMobile={false} />
          </div>

        </div>
      </div>

      <CourseFilters 
        filters={filters} 
        setFilters={setFilters} 
        isMobile={true} 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        currentSortingCol={filters.SortingCol}
        currentSortType={filters.SortType}
        onSortChange={handleSortChange}
      />

      <Footer />
    </div>
  );
};

export default ListingPage;