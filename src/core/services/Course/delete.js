import apiClient from "../../interceptor/interceptor";


export const deleteCourseFavorite = (values) => {
  return apiClient.delete(`/Course/DeleteCourseFavorite`, {
    data: values,
    headers: { "Content-Type": "multipart/form-data" }
  });
};