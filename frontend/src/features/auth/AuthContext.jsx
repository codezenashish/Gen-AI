import { createContext, useState } from "react";
import { registerUser } from "../auth/services/auth.api.js"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      if (response.user) {
        setUser(response.user);
        if (response.accessToken) {
          localStorage.setItem("token", response.accessToken);
        }
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
