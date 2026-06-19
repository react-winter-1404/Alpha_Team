import apiClient from "../../interceptor/interceptor";


export const postNewsComment = (values) =>{
    return apiClient.post(`/News/CreateNewsComment`, values);
}
export const postAddReplyNewsComment = (values) =>{
    return apiClient.post(`/News/CreateNewsReplyComment`, values);
}