import apiClient from "../../interceptor/interceptor";

export const patchCoursePaymentStep1 = async (reserveId, callbackUrl) => {
  return await apiClient.patch(`NewVersion/CoursePayment/StepOneToPay/${reserveId}`, {
    callbackUrl: callbackUrl,
    CallbackUrl: callbackUrl,
  });
};

export const patchCoursePaymentStep2 = async (reserveId, authority) => {
  return await apiClient.patch(`NewVersion/CoursePayment/StepTwoToPay/${reserveId}`, {
    Authority: authority,
  });
};

export const patchActiveAccount = async (id) => {
  return await apiClient.patch(`/v2/multiAccount/activeAccount/${id}`);
};

export const patchRemoveAccount = async (id) => {
  return await apiClient.patch(`/v2/multiAccount/removeAccount/${id}`);
};