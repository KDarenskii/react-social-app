import axios from "axios";
import UserService from "../service/UserService";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const authApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer: ${localStorage.getItem("token")}`;
    return config;
});

authApi.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const currentRequest = error.config;
        if (error?.response.status === 401 && error.config && !error.config.isRetry) {
            currentRequest.isRetry = true;
            try {
                const response = await UserService.refresh();
                localStorage.setItem("token", response.data.accessToken);
                return authApi.request(currentRequest);
            } catch (error) {
                throw error;
            }
        }
    }
);
