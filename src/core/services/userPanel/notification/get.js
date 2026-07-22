import apiClient from "../../../interceptor/interceptor";


export const getUnseenNotifications = async () => {
  const response = await apiClient.get("/v2/notification/alert/mineNoSeen");
  return response;
};

export const markAllNotificationsAsRead = async () => {
  const response = await apiClient.get("/v2/notification/alert/mineAll");
  return response;
};