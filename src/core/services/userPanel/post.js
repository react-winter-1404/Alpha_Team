import apiClient from "../../interceptor/interceptor";

export const postAddProfileImage = (values) => {
    return apiClient.post(`/SharePanel/AddProfileImage`, values);
}

export const postSelectProfileImage = (values) => {
    return apiClient.post(`/SharePanel/SelectProfileImage`, values);
}

export const postAddAccount = (values) => {
    return apiClient.post(`/v2/multiAccount/addAccount`, values);
}

export const postAddCourseUserHomeWork = (values) => {
  return apiClient.post(`/Session/AddCourseUserHomeWork`, values);
};

export const postAddExerciseFile = (values) => {
  return apiClient.post(`/Session/AddExerciseFile`, values, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const postStudentAP = (values) => {
  return apiClient.post(`/Session/Student_AP`, values);
};