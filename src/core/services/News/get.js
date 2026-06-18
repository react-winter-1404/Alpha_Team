import apiClient from "../../interceptor/interceptor";

export const getNewsDetails =({Id})=>{
    return apiClient.get(`/News/${Id}`)
}
export const getNewsReplyComment =(NewsId)=>{
    return apiClient.get(`/News/GetRepliesComments/${NewsId}`);
}