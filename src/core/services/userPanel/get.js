import apiClient from "../../interceptor/interceptor";

// export const getCourseDetails =({courseId})=>{
//     return apiClient.get('/Home/GetCourseDetails',{
//         params:{
//             CourseId:courseId,
//         }
//     })
// }
// export const getCourseComments =(id)=>{
//     return apiClient.get(`/Course/GetCourseCommnets/${id}`);
// }

export const getUserProfile =()=>{
    return apiClient.get(`/SharePanel/GetProfileInfo`);
}
export const getUserCoursesReserve =()=>{
    return apiClient.get(`/SharePanel/GetMyCoursesReserve`);
}