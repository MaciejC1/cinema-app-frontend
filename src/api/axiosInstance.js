import axios from "axios";

const apiWithoutToken = axios.create({
  baseURL: "http://localhost:8081/api/",
});

const apiWithToken = axios.create({
  baseURL: "http://localhost:8081/api/",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = () => {
  failedQueue.forEach((cb) => cb());
  failedQueue = [];
};

apiWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(apiWithToken(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiWithoutToken.post(
          "/auth/public/refresh-token",
          {},
          { withCredentials: true }
        );

        isRefreshing = false;
        processQueue();

        return apiWithToken(originalRequest);

      } catch (refreshError) {
        isRefreshing = false;
        failedQueue = [];

        window.dispatchEvent(new Event("force-logout"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { apiWithoutToken, apiWithToken };
