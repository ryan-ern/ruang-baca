import axiosDefault from 'axios';
import Cookies from 'js-cookie';

// Set default axios settings.
const axios = axiosDefault.create({
    baseURL: "https://d1de-116-206-39-78.ngrok-free.app",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
});

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('acctoken');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axios;
