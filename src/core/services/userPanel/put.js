import apiClient from "../../interceptor/interceptor";

export const putPersonalProfile = (values) => {
    return apiClient.put(`/SharePanel/UpdateProfileInfo`, values);
}

export const putEditSecurityInfo = (values) => {
    return apiClient.put(`/SharePanel/EditSecurity`, values);
}

export const putChangePassword = (values) => {
    return apiClient.put(`/SharePanel/ChangePassword`, values);
}