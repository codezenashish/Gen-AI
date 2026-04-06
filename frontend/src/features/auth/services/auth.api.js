import axiosClient from "../../../api/axiosClient.js";

const handleApiError = (error, apiName) => {
  const errorMessage = error.response?.data?.message || error.message;
  console.error(`${apiName} failed:`, errorMessage);
  throw new Error(errorMessage);
};

export const registerUser = async (registrationData) => {
  try {
    const apiResponse = await axiosClient.post("/register", registrationData);
    console.log("api res from authapi",apiResponse);
    return apiResponse.data.data;
    
  } catch (apiError) {
    handleApiError(apiError, "User Registration API");
  }
};

export const loginUser = async (loginCredentials) => {
  try {
    const apiResponse = await axiosClient.post("/login", loginCredentials);
    return apiResponse.data.data;
  } catch (apiError) {
    handleApiError(apiError, "User Login API");
  }
};

export const logoutUser = async () => {
  try {
    const apiResponse = await axiosClient.post("/logout");
    return apiResponse.data;
  } catch (apiError) {
    handleApiError(apiError, "User Logout API");
  }
};

export const getCurrentUser = async (getmeData) => {
  try {
    const apiResponse = await axiosClient.get("/get-me");
    return apiResponse.data.data;
  } catch (apiError) {
    handleApiError(apiError, "get me data");
  }
};
