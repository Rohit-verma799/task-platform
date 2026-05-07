import { createContext, useContext, useState } from "react";
import { login as loginAPI, signup as signupAPI, logout as logoutAPI } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      setError("");
      await loginAPI({ email, password });
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
    } catch (err) {
      const msg = err.response?.data?.Error || err.response?.data?.msg || "Login failed";
      setError(msg);
      throw new Error(msg);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setError("");
      await signupAPI({ name, email, password });
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
    } catch (err) {
      const msg = err.response?.data?.Error || err.response?.data?.msg || "Signup failed";
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch {
     
    }
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
