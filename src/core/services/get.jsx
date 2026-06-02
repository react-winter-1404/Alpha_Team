import apiClient from "../interceptor/interceptor";

export const BestCourses = ({count}) => {
    return apiClient.get("Home/GetCoursesTop", {
        params:{
            Count:count
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

