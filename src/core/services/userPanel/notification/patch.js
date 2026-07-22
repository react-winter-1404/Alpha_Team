import apiClient from "../../../interceptor/interceptor";

export const markNotificationAsSeen = async (id) => {
  const response = await apiClient.patch(`/v2/notification/alert/see/${id}`);
  return response;
};