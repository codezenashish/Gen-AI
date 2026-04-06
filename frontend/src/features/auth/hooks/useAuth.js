import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../services/auth.api";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const { user, setUser, isLoading, setIsLoading } = authContext;
  const handleLogin = async (loginCredentials) => {
    try {
      setIsLoading(true);
      console.log("🔄 Login API call starting...");

      const loginResponse = await loginUser(loginCredentials);
      console.log("📦 Login Response received:", loginResponse);

      if (!loginResponse || !loginResponse.user) {
        console.error("❌ User data missing in response:", loginResponse);
        throw new Error("User data not found in response");
      }

      setUser(loginResponse.user);
      console.log("✅ User set in state:", loginResponse.user);
    } catch (loginError) {
      console.error("❌ Login failed:", loginError);
      throw loginError;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      setIsLoading(true);
      console.log("🔄 Registration API call starting...");

      const registerResponse = await registerUser(registrationData);
      console.log("📦 Registration Response received:", registerResponse);

      if (!registerResponse || !registerResponse.user) {
        console.error("❌ User data missing in response:", registerResponse);
        throw new Error("User data not found in response");
      }

      setUser(registerResponse.user);
      console.log("✅ User set in state:", registerResponse.user);
    } catch (registrationError) {
      console.error("❌ Registration failed:", registrationError);
      throw registrationError;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await logoutUser();

      setUser(null);
    } catch (logoutError) {
      console.error("Logout failed:", logoutError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuthenticatedUser = async () => {
    try {
      setIsLoading(true);

      const currentUserResponse = await getCurrentUser();

      setUser(currentUserResponse.user);
    } catch (fetchError) {
      console.error("Fetch user failed:", fetchError.message);
    } finally {
      setIsLoading(false);
    }
  };
  
   useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getCurrentUser();
      setUser(data.user);
      setIsLoading(false);
    };
    getAndSetUser();
  }, []);

  return {
    user,
    isLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchAuthenticatedUser,
  };
};
