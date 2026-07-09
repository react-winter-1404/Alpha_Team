import NavbarHeader from "../components/landing/NavbarHeader";
import Footer from "../components/landing/Footer";
import CourseCard from "../components/coursesList/CourseCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoBox from "../components/courseDetail/InfoBox";
import DetailSection from "../components/courseDetail/DetailSection";
import { Skeleton } from "@heroui/react";
import {
  getAllTechs,
  getCourseDetails,
  getCoursesWithPagination,
} from "../core/services/Course/get";

const DetailPageSkeleton = () => {
  return (
    <div className="w-[90.5%] flex flex-col lg:flex-row items-start gap-10 lg:gap-[4.75%] pt-16">
      <div className="w-full lg:w-[35%] space-y-6 p-6 rounded-2xl bg-overlay border border-border">
        <Skeleton className="h-8 w-3/4 rounded-lg bg-default" />
        <Skeleton className="h-5 w-1/2 rounded-lg bg-default" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-2/3 rounded-lg bg-default" />
        </div>
        <Skeleton className="h-12 w-full rounded-xl mt-6 bg-default" />
      </div>

      <div className="w-full lg:w-[60%] space-y-6 p-6 rounded-2xl bg-overlay border border-border">
        <Skeleton className="h-[300px] w-full rounded-2xl bg-default" />
        <Skeleton className="h-8 w-2/4 rounded-lg bg-default" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-full rounded-lg bg-default" />
          <Skeleton className="h-4 w-4/5 rounded-lg bg-default" />
        </div>
      </div>
    </div>
  );
};

const CourseDetailPage = () => {
  const Params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [courseDetail, setCourseDetail] = useState([]);
  const [courses, setCourses] = useState([]);

  let techsList = [];
  const fetchCourseDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getCourseDetails({ courseId: Params.id });
      setCourseDetail(response.data);
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (courseDetail.courseTech) {
    for (let i of courseDetail.courseTech) {
      techsList.push(i.tech.techName);
    }
  }

  const [techIdList, setTechIdList] = useState([]);
  const [techs, setTechs] = useState([]);

  const fetchTechs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTechs();
      setTechs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function addTechId() {
    let technologysList = [];
    if (techs) {
      for (let i of techs) {
        for (let j of techsList) {
          if (i.techName == j) {
            technologysList.push(i.id);
          }
        }
      }
    }
    setTechIdList(technologysList.join(","));
  }

  const fetchCourse = async () => {
    if (techIdList != "") {
      setIsLoading(true);
      try {
        const response = await getCoursesWithPagination({
          rowsOfPage: 4,
          pageNumber: 1,
          techCount: 1,
          listTech: techIdList,
        });
        setCourses(response.data.courseFilterDtos);
      } catch (error) {
        console.error(error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCourseDetail();
  }, [Params.id]);

  useEffect(() => {
    fetchTechs();
  }, []);

  useEffect(() => {
    addTechId();
  }, [techsList]);

  useEffect(() => {
    fetchCourse();
  }, [techIdList]);

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center bg-overlay">
        <NavbarHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl text-danger">خطا در بارگذاری اطلاعات</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-overlay">
      <NavbarHeader />

      {isLoading ? (
        <DetailPageSkeleton />
      ) : (
        <div className="w-full flex flex-col items-center transition-opacity duration-700 ease-in-out opacity-100 dynamic-fade-in">
          <div className="flex flex-col lg:flex-row items-start w-[90.5%] gap-10 lg:gap-[4.75%] pt-16">
            <InfoBox
              title={courseDetail.title}
              courseLevelName={courseDetail.courseLevelName}
              capacity={courseDetail.capacity}
              startTime={courseDetail.startTime}
              endTime={courseDetail.endTime}
              cost={courseDetail.cost}
              isActive={courseDetail.isActive}
              courseRate={courseDetail.courseRate}
              courseTech={[...techsList]}
              courseId={courseDetail.courseId}
              isFavorite={courseDetail.isUserFavorite}
              userIsLiked={courseDetail.userIsLiked}
              currentUserDissLike={courseDetail.currentUserDissLike}
            />
            <DetailSection
              title={courseDetail.title}
              courseId={courseDetail.courseId}
              imageAddress={courseDetail.imageAddress}
              teacherId={courseDetail.teacherId}
              teacherName={courseDetail.teacherName}
              miniDescribe={courseDetail.miniDescribe}
              describe={courseDetail.describe}
            />
          </div>

          {courses.length >= 1 && (
            <div className="mt-10 flex flex-col w-[90.5%] gap-10 lg:gap-15 pt-16 px-5">
              <div className="text-5xl text-foreground">دوره های دیگر</div>
              <div className="flex flex-wrap gap-5.75 justify-center">
                {courses.map((course, index) => (
                  <CourseCard
                    key={course.id || course.courseId || index}
                    viewMode={"gird"}
                    imageURL={
                      course.tumbImageAddress ||
                      course.imageAddress ||
                      "https://via.placeholder.com/315x225"
                    }
                    title={course.title || course.courseName || ""}
                    discribtion={course.describe || course.shortDescribe || ""}
                    teacher={course.teacherName || "مدرس دوره"}
                    date={course.lastUpdate || course.startDate || ""}
                    number={course.capacity || 0}
                    price={
                      course.cost !== undefined && course.cost !== null
                        ? course.cost.toLocaleString()
                        : "0"
                    }
                    rating={course.courseRate?.avg || 0}
                    id={course.courseId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dynamic-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default CourseDetailPage;