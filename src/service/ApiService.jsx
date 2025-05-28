import axios from "../utils/customizeAxios";

const handleLogin = (dataLogin) => {
  return axios.post("/api/login-user", dataLogin);
};
const handleRegister = (dataRegister) => {
  return axios.post("/api/CreateUser", dataRegister);
};

const getPostsService = (userId) => {
  return axios.get(`/api/get-Post?id=${userId}`);
};
const getFriendSuggestion = (userId) => {
  return axios.get(`/api/friend-suggestion?id=${userId}`);
};

const createPost = (dataCreatePost) => {
  return axios.post(`/api/Create-Post`, dataCreatePost)
}
export { handleLogin, handleRegister, getPostsService, getFriendSuggestion, createPost };
