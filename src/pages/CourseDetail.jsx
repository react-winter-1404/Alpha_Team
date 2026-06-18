import NavbarHeader from "./components/landing/NavbarHeader";
import Footer from "./components/landing/Footer";
import CourseCard from "../components/coursesList/CourseCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoBox from "../components/courseDetail/InfoBox";
import DetailSection from "../components/courseDetail/DetailSection";
import {
  getAllTechs,
  getCourseDetails,
  getCoursesWithPagination,
} from "../core/services/Course/get";

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

  console.log(courseDetail.courseTech);
  if (courseDetail.courseTech) {
    for (let i of courseDetail.courseTech) {
      techsList.push(i.tech.techName);
    }
    // console.log(techsList)
  }

  const [techIdList, setTechIdList] = useState([]);
  const [techs, setTechs] = useState([]);

  const fetchTechs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTechs();
      setTechs(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  function addTechId() {
    let technologysList = [];
    if (techs) {
      // console.log(techs)
      for (let i of techs) {
        // console.log(i.techName)
        for (let j of techsList) {
          // console.log(j)
          if (i.techName == j) {
            technologysList.push(i.id);
          }
        }
      }
    }
    setTechIdList(technologysList.join(","));
  }
  // console.log(techIdList)

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
        // console.log(response.data)
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
  // console.log(courses)

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center">
        <NavbarHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl">در حال بارگذاری...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center">
        <NavbarHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl text-red-500">خطا در بارگذاری اطلاعات</div>
        </div>
        <Footer />
      </div>
    );
  }
  if (!isLoading && !isError) {
    return (
      <div className=" w-full  flex flex-col items-center  ">
        <NavbarHeader />
        <div className=" border border-black flex flex-col lg:flex-row items-start w-[90.5%] gap-10 lg:gap-[4.75%] pt-16 ">
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
          <div className=" mt-10  flex flex-col  w-[90.5%] gap-10 lg:gap-15 pt-16 px-5 ">
            <div className=" text-5xl ">دوره های دیگر</div>
            <div className="  flex flex-wrap gap-5.75 justify-center  ">
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

        <Footer />
      </div>
    );
  }
};

export default CourseDetailPage;
