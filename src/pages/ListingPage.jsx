import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@heroui/react';
import CourseFilters from '../components/coursesList/CourseFilters';
import  CourseCard  from '../components/coursesList/CourseCard';
import  CoursePagination  from '../components/coursesList/CoursePagination';
import  CourseSorting  from '../components/coursesList/CourseSorting';

const ListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

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

  useEffect(() => {
    const fetchCoursesData = async () => {
      setLoading(true);
      try {
        const cleanedParams = {};
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== '' && value !== null && value !== undefined) {
            if (key === 'CostDown' && (value === 10000 || value === 1000000)) {
              return;
            }
            if (key === 'CostUp' && (value === 4960000 || value === 1000000)) {
              return;
            }
            cleanedParams[key] = value;
          }
        });

        const response = await axios.get('http://188.121.111.8:3001/Home/GetCoursesWithPagination', {
          params: cleanedParams
        });
        
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

    fetchCoursesData();
  }, [filters]);

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      PageNumber: page
    }));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalCount / filters.RowsOfPage) || 1;

  const handleSortChange = (sortingCol, sortType) => {
    setFilters(prev => ({
      ...prev,
      SortingCol: sortingCol,
      SortType: sortType,
      PageNumber: 1
    }));
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <section 
        className="max-w-[1380px] mx-auto px-4 flex flex-row-reverse gap-6" 
        style={{ direction: 'rtl' }}
      >
        
        <div className="flex-1 flex flex-col justify-between min-h-[602px]">
          
          <div className="flex justify-between items-center bg-[#F5F5F5] px-6 py-2 rounded-[20px] shadow-sm mb-6 w-full" style={{ direction: 'rtl' }}>
            <div className="flex-1">
              <CourseSorting 
                currentSortingCol={filters.SortingCol}
                currentSortType={filters.SortType}
                onSortChange={handleSortChange}
              />
            </div>

            <div className="flex items-center gap-2 border-r border-gray-300 pr-4 mr-4">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm border border-gray-200' : 'opacity-50'}`}
              >
                <img src="/src/assets/grid-view-stroke-rounded 1.png" alt="Grid View" className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('row')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'row' ? 'bg-white shadow-sm border border-gray-200' : 'opacity-50'}`}
              >
                <img src="/src/assets/layout-3-row-stroke-rounded 1.png" alt="Row View" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center flex-1">
              <Spinner size="lg" color="primary" />
            </div>
          ) : courses.length === 0 ? (
            <div className="flex justify-center items-center flex-1 text-gray-400 font-medium">
              دوره ای با فیلترهای انتخاب شده یافت نشد.
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center" : "flex flex-col gap-6 w-full"}>
              {courses.map((course, index) => (
                <CourseCard
                  key={course.id || course.courseId || index}
                  viewMode={viewMode}
                  imageURL={course.tumbImageAddress || course.imageAddress || "https://via.placeholder.com/315x225"}
                  title={course.title || course.courseName || ""}
                  discribtion={course.describe || course.shortDescribe || ""}
                  teacher={course.teacherName || "مدرس دوره"}
                  date={course.lastUpdate || course.startDate || ""}
                  number={course.capacity || 0}
                  price={course.cost !== undefined && course.cost !== null ? course.cost.toLocaleString() : "0"}
                  rating={course.courseRate?.avg || 0}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-12 w-full">
              <CoursePagination
                page={filters.PageNumber}
                totalPages={totalPages}
                itemsPerPage={filters.RowsOfPage}
                totalItems={totalCount}
                onPageChange={handlePageChange}
              />
            </div>
          )}

        </div>

        <div className="w-[321px] shrink-0 sticky top-6">
          <CourseFilters filters={filters} setFilters={setFilters} />
        </div>

      </section>
    </div>
  );
};

export default ListingPage;