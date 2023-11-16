import axiosDefault from 'axios';
import Cookies from 'js-cookie';

// Set default axios settings.
const axios = axiosDefault.create({
    baseURL: "https://6bd0-116-206-39-71.ngrok-free.app",
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
