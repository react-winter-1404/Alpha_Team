import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BASE_URL = "http://162.19.253.202:3001/";

const TeacherList = () => {
  const { t } = useTranslation("teachers");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/Home/GetTeachers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen font-sans bg-overlay">
        <div className="text-lg text-muted">{t("list.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen font-sans bg-overlay">
        <div className="text-lg text-danger">{t("list.error")}: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto font-sans bg-overlay" style={{ direction: "rtl" }}>
      <h1 className="text-center text-3xl font-bold mb-10 text-foreground">{t("list.title")}</h1>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {teachers.map((teacher) => (
          <div 
            key={teacher.teacherId} 
            className="group relative rounded-xl overflow-hidden shadow-md aspect-[3/4] cursor-pointer bg-default"
            onClick={() => navigate(`/teachers/${teacher.teacherId}`)}
          >
            <img 
              src={teacher.pictureAddress || "https://via.placeholder.com/300x400?text=Teacher"} 
              alt={teacher.fullName} 
              className="w-full h-full object-cover transition-all duration-400 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-[0.3]"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 transition-all duration-400 p-5 text-center group-hover:opacity-100">
              <h3 className="text-white text-2xl font-extrabold mb-2 drop-shadow-md">{teacher.fullName}</h3>
              <p className="text-accent text-lg font-medium drop-shadow-sm">{t("list.coursesCount")}: {teacher.courseCounts}</p>
              {teacher.linkedinProfileLink && (
                <a 
                  href={teacher.linkedinProfileLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-5 text-accent bg-white hover:bg-gray-100 px-5 py-2 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("list.linkedinProfile")}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;