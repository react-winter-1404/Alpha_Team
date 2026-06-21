import apiClient from "../../interceptor/interceptor";


export const postAddProfileImage = (values) =>{
    return apiClient.post(`/SharePanel/AddProfileImage`, values);
}
export const postSelectProfileImage = (values) =>{
    return apiClient.post(`/SharePanel/SelectProfileImage`, values);
}