import apiClient from "../../interceptor/interceptor";


export const putPersonalProfile = (values) =>{
    return apiClient.put(`/SharePanel/UpdateProfileInfo`, values);
}
