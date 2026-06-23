import apiClient from "../../interceptor/interceptor";

export const getTeacherDetails =({TeacherId})=>{
    return apiClient.get('/Home/GetTeacherDetails',{
        params:{
            TeacherId:TeacherId,
        }
    })
}