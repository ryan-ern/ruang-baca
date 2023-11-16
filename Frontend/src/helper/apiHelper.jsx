import axiosDefault from 'axios';
import Cookies from 'js-cookie';

// Set default axios settings.
const axios = axiosDefault.create({
    baseURL: "http://192.168.198.216:8000",
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
