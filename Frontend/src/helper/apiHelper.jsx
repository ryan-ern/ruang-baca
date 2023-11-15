import axiosDefault from 'axios';

// Set default axios settings.
const axios = axiosDefault.create({
    baseURL: import.meta.env.REACT_APP_AXIOS_BASE_URL,
});

// Set access token.
// axios.defaults.headers.common.Authorization = token;

export default axios;
