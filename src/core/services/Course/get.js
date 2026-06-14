import apiClient from "../../interceptor/interceptor";

export const getCourseDetails =({courseId})=>{
    return apiClient.get('/Home/GetCourseDetails',{
        params:{
            CourseId:courseId,
        }
    })
}
export const getCourseComments =(id)=>{
    return apiClient.get(`/Course/GetCourseCommnets/${id}`);
}
export const getCourseReplyComment =(CourseId, CommentId)=>{
    return apiClient.get(`Course/GetCourseReplyCommnets/${CourseId}/${CommentId}`);
}
export const getAllTechs = ()=>{
    return apiClient.get('/Home/GetTechnologies');
};
export const getCoursesWithPagination = ({rowsOfPage,pageNumber,listTech,techCount,CourseLevelId,Query})=>{
    return apiClient.get('/Home/GetCoursesWithPagination',{
        params:{
            RowsOfPage:rowsOfPage,
            PageNumber:pageNumber,
            ListTech:listTech,
            TechCount:techCount,
            courseLevelId:CourseLevelId,
            Query:Query,
        },
    });
};
