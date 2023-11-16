import axiosDefault from 'axios';

// Set default axios settings.
const axios = axiosDefault.create({
    baseURL: "https://54da-116-206-39-100.ngrok-free.app",
});

// Set access token.
// axios.defaults.headers.common.Authorization = token;

export default axios;
