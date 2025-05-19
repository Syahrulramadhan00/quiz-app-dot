import axios from 'axios';

const api = axios.create({
    baseURL: 'https://opentdb.com/api.php',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, error => {
    if (error.response) {
        console.error('Response error:', error.response.data);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Request error:', error.message);
    }
    return Promise.reject(error);
});

/**
 * ✅ Function to fetch questions dynamically
 */
export const fetchQuestions = async ({ amount = 50, difficulty, type }) => {
    const url = `api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    return api.get(url);
};

export default api;
