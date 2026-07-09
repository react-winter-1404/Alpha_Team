import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://188.121.104.25:3001";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex justify-center items-center min-h-screen font-sans bg-overlay">
        <div className="text-lg text-muted">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen font-sans bg-overlay">
        <div className="text-lg text-danger">خطا در دریافت اطلاعات: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto font-sans bg-overlay" style={{ direction: "rtl" }}>
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 bg-default hover:bg-default-foreground/10 text-foreground px-5 py-2 rounded-lg font-bold shadow-sm transition-all"
      >
        بازگشت به لیست
      </button>

      <div className="flex flex-col md:flex-row items-center bg-overlay rounded-2xl shadow-md p-8 mb-12 gap-8 border border-border">
        <img 
          src={data.pictureAddress || "https://via.placeholder.com/150?text=Teacher"} 
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
        {data.courses?.map((course) => (
          <div key={course.courseId} className="bg-overlay rounded-xl shadow-sm border border-border overflow-hidden flex flex-col">
            <img 
              src={course.imageAddress ? `${BASE_URL}${course.imageAddress}` : "https://via.placeholder.com/300x200?text=Course"} 
              alt={course.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{course.title}</h3>
                <p className="text-muted text-sm line-clamp-3">{course.miniDescribe}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-separator text-xs text-muted">
                شناسه دوره: {course.courseId}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDetail;