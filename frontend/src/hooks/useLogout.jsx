import { useNavigate } from "react-router";
import axiosInstance from "../utils/axios";
import useAuthStore from "../store/useAuthStore";

const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try { 
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Logout failed");
      }

      logout();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed, please try again.");
    }
  };

  return handleLogout;
};

export default useLogout;
