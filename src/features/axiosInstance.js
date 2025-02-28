import axios from "axios";
import { getToken } from "../utils/getToken";

const axiosInstance = axios.create({
    baseURL: "http://43.205.176.154:4100/api/v1/admin", // Client server endpoint
    // baseURL: "http://15.206.16.230:4100/api/v1/admin",   // Company server
});

let failedRequests = [];
let isRetrying = false;
const retryFailedRequests = () => {
    if (isRetrying || failedRequests.length === 0) return;
    isRetrying = true;

    console.log(" Retrying failed API requests...");

    failedRequests.forEach(({ config, resolve, reject }) => {
        axiosInstance.request(config)
            .then(resolve)
            .catch(reject);
    });

    failedRequests = [];
    isRetrying = false;
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken("ilineLogin", "token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (!navigator.onLine) {
            console.log(" No internet, storing request for retry...");

            return new Promise((resolve, reject) => {
                failedRequests.push({ config: originalRequest, resolve, reject });
                window.addEventListener("online", retryFailedRequests, { once: true });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
