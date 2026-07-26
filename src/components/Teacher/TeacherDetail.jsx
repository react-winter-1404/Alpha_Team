import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination } from "@heroui/react";
import { useTranslation } from "react-i18next";
import NavbarHeader from "../landing/NavbarHeader";
import Footer from "../landing/Footer";
import fallbackImg from "../../assets/Courses/images.png";
import teacherFallbackImg from "../../assets/Courses/teachers-icon-18094.png";

const BASE_URL = "http://162.19.253.202:3001";
const PAGE_SIZE = 6;

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("news");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/Home/GetTeacherDetails?TeacherId=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between bg-overlay">
        <NavbarHeader />
        <div className="flex justify-center items-center my-auto font-sans">
          <div className="text-lg text-muted">در حال بارگذاری...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between bg-overlay">
        <NavbarHeader />
        <div className="flex justify-center items-center my-auto font-sans">
          <div className="text-lg text-danger">خطا در دریافت اطلاعات: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  const coursesList = data?.courses || [];
  const totalItems = coursesList.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentCourses = coursesList.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-overlay">
      <NavbarHeader />

      <main className="p-10 max-w-6xl mx-auto font-sans w-full flex-1" style={{ direction: "rtl" }}>
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 bg-default hover:bg-default-foreground/10 text-foreground px-5 py-2 rounded-lg font-bold shadow-sm transition-all"
        >
          بازگشت به لیست
        </button>

        <div className="flex flex-col md:flex-row items-center bg-overlay rounded-2xl shadow-md p-8 mb-12 gap-8 border border-border">
          <img 
            src={data.pictureAddress || teacherFallbackImg} 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = teacherFallbackImg;
            }}
            alt={data.fullName} 
            className="w-40 h-40 rounded-full object-cover border-4 border-default shadow-sm"
          />
          <div className="text-center md:text-right flex-1">
            <h1 className="text-3xl font-extrabold text-foreground mb-3">{data.fullName}</h1>
            <p className="text-muted text-lg mb-4">دپارتمان: {data.departaman?.name || "نامشخص"}</p>
            {data.linkedinProfileLink && (
              <a 
                href={data.linkedinProfileLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block text-accent-foreground bg-accent hover:bg-accent/80 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all"
              >
                پروفایل لینکدین
              </a>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-separator">دوره‌های ارائه شده</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <div 
              key={course.courseId} 
              onClick={() => navigate(`/courses/${course.courseId}`)}
              className="bg-overlay rounded-xl shadow-sm border border-border overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all group"
            >
              <img 
                src={course.imageAddress ? `${BASE_URL}${course.imageAddress}` : fallbackImg} 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImg;
                }}
                alt={course.title} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-muted text-sm line-clamp-3">{course.miniDescribe}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-separator flex items-center justify-between text-xs text-muted">
                  <span>شناسه دوره: {course.courseId}</span>
                  <span className="text-primary font-bold">مشاهده جزئیات</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination className="w-full flex flex-col items-center gap-3" style={{ direction: 'rtl' }}>
              <Pagination.Summary className="text-muted text-sm font-medium">
                {t("listing.showing")} {startItem} {t("listing.to")} {endItem} {t("listing.of")} {totalItems} {t("listing.newsFound")}
              </Pagination.Summary>
              
              <Pagination.Content className="flex items-center gap-1" style={{ direction: 'ltr' }}>
                <Pagination.Item>
                  <Pagination.Previous 
                    isDisabled={currentPage === 1} 
                    onPress={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 text-sm bg-default rounded-xl hover:bg-default-foreground/10 text-foreground"
                  >
                    <Pagination.PreviousIcon className="mr-1" />
                    <span>{t("listing.previous")}</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis className="text-muted" />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link 
                        isActive={p === currentPage} 
                        onPress={() => handlePageChange(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold ${
                          p === currentPage ? 'bg-accent text-accent-foreground' : 'bg-default hover:bg-default-foreground/10 text-foreground'
                        }`}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  )
                )}

                <Pagination.Item>
                  <Pagination.Next 
                    isDisabled={currentPage === totalPages} 
                    onPress={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 text-sm bg-default rounded-xl hover:bg-default-foreground/10 text-foreground"
                  >
                    <span>{t("listing.next")}</span>
                    <Pagination.NextIcon className="ml-1" />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDetail;