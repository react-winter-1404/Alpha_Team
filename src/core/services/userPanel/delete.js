import apiClient from "../../interceptor/interceptor";


export const DeleteProfileImage = (values) =>{
    return apiClient.delete(`/SharePanel/DeleteProfileImage`, {
        data: values,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}