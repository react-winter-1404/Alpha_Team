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
