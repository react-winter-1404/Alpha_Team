import apiClient from "../../interceptor/interceptor";


export const postAddCourseCommentLike = (values)=>{
    return apiClient.post('/Course/AddCourseCommentLike',values);
};
export const postCourseComment = (values) =>{
    return apiClient.post(`Course/AddCommentCourse`, values);
}
export const postAddReplyCourseComment = (values) =>{
    return apiClient.post(`/Course/AddReplyCourseComment`, values);
}
export const postAddCourseFavorite = (values) =>{
    return apiClient.post(`/Course/AddCourseFavorite`, {courseId:values});
}
export const postAddCourseRate = (courseId,count) =>{
    return apiClient.post(`/Course/AddCourseLike?CourseId=${courseId}&RateNumber=${count}`);
}

export const addCourseLike = async (courseId) => {
  const response = await apiClient.post(`/Course/AddCourseLike?CourseId=${courseId}`);
  return response.data;
};

export const addCourseDislike = async (courseId) => {
  const response = await apiClient.post(`/Course/AddCourseDissLike?CourseId=${courseId}`);
  return response.data;
};

export const deleteCourseLike = async (id) => {
  const response = await apiClient.delete("/Course/DeleteCourseLike", {
    data: { courseId: id }
  });
  return response.data;
};

export const addCourseFavorite = async (courseId) => {
  try {
    const response = await apiClient.post("/Course/AddCourseFavorite", { courseId });
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
    throw error;
  }
};