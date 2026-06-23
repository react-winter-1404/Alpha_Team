import apiClient from "../../interceptor/interceptor";


export const postNewsComment = (data) => {
  return apiClient.post("/News/CreateNewsComment", data, {
    headers: { "Content-Type": "application/json" }
  });
};
export const postAddReplyNewsComment = (values) => {
  return apiClient.post(`/News/CreateNewsReplyComment`, values, {
    headers: { "Content-Type": "application/json" }
  });
};