import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

// Interface for the AuthContext value
interface AuthContextValue {
  token?: string; // Optional token, allowing for initial unauthenticated state
  setToken: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string | undefined>(localStorage.getItem("token") || "");

  // Function to set the authentication token
  const setToken: React.Dispatch<React.SetStateAction<string | undefined>> = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
    console.log("Token: ", token);
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
