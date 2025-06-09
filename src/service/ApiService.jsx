import axios from "../utils/customizeAxios";

const handleLogin = (dataLogin) => {
  return axios.post("/api/login-user", dataLogin);
};
const handleRegister = (dataRegister) => {
  return axios.post("/api/CreateUser", dataRegister);
};
//user
const updateUser = (_id, gender) => {
  return axios.put(`/api/update-user`, { _id, gender });
};
//
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
//relationship
const SendFriendRequest = (requesterId, recipientId) => {
  return axios.post("/api/friend-Request", { requesterId, recipientId });
};

//
// const createPost = (dataCreatePost) => {
//   return axios.post(`/api/Create-Post`, dataCreatePost)
// }
export {
  handleLogin,
  handleRegister,
  getPostsService,
  getFriendSuggestion,
  createPost,
  updateUser,
  SendFriendRequest,
};
