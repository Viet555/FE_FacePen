import axios from "../utils/customizeAxios";

const handleLogin = (dataLogin) => {
  return axios.post("/api/login-user", dataLogin);
};
const handleRegister = (dataRegister) => {
  return axios.post("/api/CreateUser", dataRegister);
};
//user
const updateUser = (_id, gender, avatar) => {
  return axios.put(`/api/update-user`, { _id, gender, avatar });
};
//Post
const getPostsService = (userId) => {
  return axios.get(`/api/get-Post?id=${userId}`);
};
const getFriendSuggestion = (userId) => {
  return axios.get(`/api/friend-suggestion?id=${userId}`);
};
const createPost = (formData) => {
  return axios.post("/api/Create-Post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const likePost = (postId, userId) => {
  return axios.post(`/api/like-post?postId=${postId}&&userId=${userId}`);
};

//relationship
const SendFriendRequest = (requesterId, recipientId) => {
  return axios.post("/api/friend-Request", { requesterId, recipientId });
};
const friendAccept = (requesterId, recipientId) => {
  return axios.post("/api/friend-accept", { requesterId, recipientId });
};
const friendReject = (requesterId, recipientId) => {
  return axios.post("/api/friend-reject", { requesterId, recipientId });
};

//Notifications
const getNotifications = (userId) => {
  return axios.get(`/api/get-notification-user?userId=${userId}`);
};
const markAsReadNotifi = (notiId) => {
  return axios.post(`/api/markAsRead-notification?notiId=${notiId}`);
};

export {
  handleLogin,
  handleRegister,
  getPostsService,
  getFriendSuggestion,
  createPost,
  updateUser,
  SendFriendRequest,
  getNotifications,
  friendAccept,
  friendReject,
  markAsReadNotifi,
  likePost,
};
