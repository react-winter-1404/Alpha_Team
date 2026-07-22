import apiClient from "../../interceptor/interceptor";

export const getUserProfile = () => {
  return apiClient.get(`/SharePanel/GetProfileInfo`);
};

export const getUserCoursesReserve = () => {
  return apiClient.get(`/SharePanel/GetMyCoursesReserve`);
};

export const getUserFavoriteCourses = () => {
  return apiClient.get(`/SharePanel/GetMyFavoriteCourses`);
};

export const getUserFavoriteNews = () => {
  return apiClient.get(`/SharePanel/GetMyFavoriteNews`);
};

export const getUserCoursesComments = () => {
  return apiClient.get(`/SharePanel/GetMyCoursesComments`);
};

export const getUserNewsComments = () => {
  return apiClient.get(`/SharePanel/GetMyNewsComments`);
};

export const getUserMyCourses = (params = { PageNumber: 1, RowsOfPage: 1000 }) => {
  return apiClient.get(`/SharePanel/GetMyCourses`, { params });
};

export const getStudentUserPayList = (courseId = "") => {
  const url = courseId 
    ? `/CoursePayment/StudentUserPayList?CourseId=${courseId}`
    : `/CoursePayment/StudentUserPayList`;
  return apiClient.get(url);
};

export const getMyAccounts = () => {
  return apiClient.get(`/v2/multiAccount/myAccounts`);
};

export const getSecurityInfo = () => {
  return apiClient.get(`/SharePanel/GetSecurityInfo`);
};

export const getStudentHomeworkList = () => {
  return apiClient.get(`/Session/StudentHomeworkList`);
};

export const getSessionDetail = (sessionId) => {
  return apiClient.get(`/Session/SessionDetail?SessionId=${sessionId}`);
};

