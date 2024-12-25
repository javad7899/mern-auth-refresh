import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// Create an axios instance with a base URL and credentials
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your environment variable
  withCredentials: true, // Ensures cookies are sent with requests
});

// Add a request interceptor to attach the access token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error); // Log request errors
    return Promise.reject(error); // Forward the error
  }
);

// Add a response interceptor to handle token refresh and retry on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response, // Forward successful responses
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized error: Attempting token refresh");

      try {
        const { refreshAccessToken, logout } = useAuthStore.getState();

        // Refresh the access token
        await refreshAccessToken();

        // Retry the failed request with the new token
        const retryConfig = { ...error.config };
        const newAccessToken = useAuthStore.getState().accessToken;

        if (newAccessToken) {
          retryConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.info("Retrying request with new access token");
          return axiosInstance(retryConfig); // Retry the failed request
        } else {
          console.error("New access token not found");
          await logout(); // Logout if token refresh fails
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        const { logout } = useAuthStore.getState();
        await logout(); // Logout user on token refresh failure
      }
    }

    console.error("Response error:", error); // Log other response errors
    return Promise.reject(error); // Forward the error
  }
);

export default axiosInstance;
