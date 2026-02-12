import axiosInstance from "./axiosInstance";

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
