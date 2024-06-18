import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const BASE_URL = "https://localhost:7088/api/auth";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [errors, setErrors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setIsLoggedIn(true);

      const decodedToken = jwtDecode(tokenFromStorage);

      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      const username =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      const email =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      const imageUrl = decodedToken["image"];

      setUser((prev) => ({
        ...prev,
        userId,
        username,
        email,
        role,
        isAdmin: role == "admin",
        imageUrl,
      }));
    }
    setIsLoading(false);
  };

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  const resetErrors = () => {
    setErrors([]);
  };

  const register = async (userData) => {
    resetErrors();
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      console.log("response", response);
      if (response.status >= 200 && response.status <= 300) {
        return response.data;
      } else {
        console.log("register error, response.data:", response.data);
        addError(`Failed to register: ${response.data}`);
        return null;
      }
    } catch (error) {
      if (error.response) {
        addError(error.response.data);
      }
      console.log("register error, response.data:", error.message);
      addError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userName, password) => {
    resetErrors();
    setIsLoading(true);

    try {
      const response = await sendLoginRequest(userName, password);
      handleSuccessfulLogin(response, userName);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendLoginRequest = async (userName, password) => {
    return await axios.post(`${BASE_URL}/login`, {
      userName,
      password,
    });
  };

  const handleSuccessfulLogin = (response, userName) => {
    if (response.status >= 200 && response.status <= 300) {
      const resData = response.data;
      localStorage.setItem("token", resData.token);
      setToken(resData.token);
      setIsLoggedIn(true);
      console.log("data", resData);
      setUser({
        userId: resData.userId,
        username: resData.username,
        email: resData.email,
        isAdmin: resData.isAdmin,
        imageUrl: resData.imageUrl,
      });
      navigate("/");
      toast.success(`${userName} logged in successfully`);
    }
  };

  const handleLoginError = (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage =
        error.response.data.Message || error.response.statusText;

      switch (statusCode) {
        case 400:
          addError("Invalid request. Please check your input.");
          toast.error("Invalid request. Please check your input.");
          break;
        case 401:
          addError("Invalid credentials. Please try again.");
          toast.error("Invalid credentials. Please try again.");
          break;
        case 403:
          addError(
            "Access denied. You do not have permission to perform this action."
          );
          toast.error(
            "Access denied. You do not have permission to perform this action."
          );
          break;
        case 404:
          addError("User not found. Please check your username.");
          toast.error("User not found. Please check your username.");
          break;
        case 500:
          addError("Internal server error. Please try again later.");
          toast.error("Internal server error. Please try again later.");
          break;
        default:
          addError(`Unexpected error: ${errorMessage}`);
          toast.error(`Unexpected error: ${errorMessage}`);
          break;
      }
    } else if (error.request) {
      addError(
        "No response from server. Please check your network connection."
      );
      toast.error(
        "No response from server. Please check your network connection."
      );
    } else {
      addError(`Request error: ${error.message}`);
      toast.error(`Request error: ${error.message}`);
    }
    console.error("Failed to login", error.message);
  };

  const logout = () => {
    localStorage.removeItem("token");
    resetErrors();
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        isLoading,
        errors,
        resetErrors,
        token,
        isLoggedIn,
        setIsLoggedIn,
        user,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};
