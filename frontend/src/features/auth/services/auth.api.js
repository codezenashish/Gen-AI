import axiosClient from "../../../utils/axiosClient.js";

const handleApiError = (error, apiName) => {
  const errorMessage = error.response?.data?.message || error.message;
  console.error(`${apiName} failed:`, errorMessage);
  throw new Error(errorMessage);
};

export const registerUser = async (registrationData) => {
  try {
    const apiResponse = await axiosClient.post(
      "/auth/register",
      registrationData,
    );

    return apiResponse.data.data;
  } catch (apiError) {
    handleApiError(apiError, "User Registration API");
  }
};

export const loginUser = async (loginCredentials) => {
  try {
    const apiResponse = await axiosClient.post("/auth/login", loginCredentials);
    return apiResponse.data.data;
  } catch (apiError) {
    handleApiError(apiError, "User Login API");
  }
};

export const logoutUser = async () => {
  try {
    const apiResponse = await axiosClient.post("/auth/logout");
    return apiResponse.data;
  } catch (apiError) {
    handleApiError(apiError, "User Logout API");
  }
};

export const getCurrentUser = async (getmeData) => {
  try {
    const apiResponse = await axiosClient.get("/auth/get-me");
    return apiResponse.data.data;
  } catch (apiError) {
    handleApiError(apiError, "get me data");
  }
};
