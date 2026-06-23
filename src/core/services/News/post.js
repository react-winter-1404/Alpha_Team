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

export const addNewsLike = async (newsId) => {
  const response = await apiClient.post(`/News/NewsLike/${newsId}`);
  return response.data;
};

export const addNewsDislike = async (newsId) => {
  const response = await apiClient.post(`/News/NewsDissLike/${newsId}`);
  return response.data;
};

export const deleteNewsLike = async (newsId) => {
  const response = await apiClient.delete(`/News/DeleteNewsLike/${newsId}`);
  return response.data;
};

export const addNewsFavorite = async (newsId) => {
  const response = await apiClient.post(`/News/AddFavoriteNews?NewsId=${newsId}`);
  return response.data;
};

export const postAddNewsRate = (newsId, count) => {
  return apiClient.post(`/News/NewsRate?NewsId=${newsId}&RateNumber=${count}`);
};

export const postAddNewsCommentLike = (values) => {
  return apiClient.post('/News/AddNewsCommentLike', values);
};