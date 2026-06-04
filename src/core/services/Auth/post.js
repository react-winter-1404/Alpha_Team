import apiClient from "../../interceptor/interceptor";


export const postRgisterDataStpOne = (values)=>{
    return apiClient.post('/Sign/SendVerifyMessage',values);
};
export const postRgisterDataStpTwo = (values)=>{
    return apiClient.post('/Sign/VerifyMessage',values);
};
export const postRgisterDataStpThree = (values)=>{
    return apiClient.post('/Sign/Register',values);
};

export const postLogin = (values)=>{
    return apiClient.post('/Sign/Login',values);
};

export const postForgotPasswordStpOne = (values)=>{
    return apiClient.post('/Sign/ForgetPassword',values);
};
export const postForgotPasswordStpTwo = (values)=>{
    return apiClient.post('/Sign/Reset',values);
};

