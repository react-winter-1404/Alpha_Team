import apiClient from "../../interceptor/interceptor";

export const BestCourses = ({count}) => {
    return apiClient.get("Home/GetCoursesTop", {
        params:{
            Count:count
        }
    })
}

export const Courses = ({pageNumber, rowsOfPage}) => {
    return apiClient.get("Course/CourseList", {
        params:{
            PageNumber:pageNumber,
            RowsOfPage:rowsOfPage
        }
    })
}

export const Teachers = ({pageNumber, rowsOfPage}) => {
    return apiClient.get("Course", {
        params:{
            PageNumber:pageNumber,
            RowsOfPage:rowsOfPage
        }
    })
}

export const News = ({pageNumber, rowsOfPage}) => {
    return apiClient.get("News", {
        params:{
            PageNumber:pageNumber,
            RowsOfPage:rowsOfPage
        }
    })
}

