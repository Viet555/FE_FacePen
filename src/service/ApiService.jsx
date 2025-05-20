import axios from "../utils/customizeAxios"

const handleLogin = (dataLogin) => {
    return axios.post('/api/login-user', dataLogin)
}
const handleRegister = async (dataRegister) => {
    try {
        const response = await axios.post('/api/CreateUser', dataRegister)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
}

export {handleLogin, handleRegister}