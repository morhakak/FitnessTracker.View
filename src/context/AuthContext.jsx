import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const BASE_URL = "https://localhost:7088/api/auth";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      let decodedToken = jwtDecode(tokenFromStorage);
      setIsLoggedIn(true);
      updateUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setIsAdmin(user.role.toLocaleLowerCase() == "admin");
    }
  }, [token, user, isAdmin]);

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
      if (response.status >= 200 && response.status <= 300) {
        return response.data;
      } else {
        console.log("register error, response.data:", response.data);
        addError(`Failed to register: ${response.data}`);
        return null;
      }
    } catch (error) {
      console.log("register error, response.data:", error.message);
      addError(`Failed to register: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userName, password) => {
    resetErrors();
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/login`, {
        userName,
        password,
      });

      if (response.status >= 200 && response.status <= 300) {
        const jwtKey = await response.data.token;
        return handleLoginSuccess(jwtKey);
      } else {
        console.log("Login error, response.data:", response.data);
        addError(`Failed to login: ${response.data}`);
        return false;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        addError(`Failed to login: ${error.response.data.Message}`);
      } else {
        addError(`Failed to login: ${error.message}`);
      }
      console.error("Failed to login", error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    setIsLoggedIn(true);
    localStorage.setItem("token", jwtToken);
    const decodedToken = jwtDecode(jwtToken);
    updateUser(decodedToken);
    if (user.role) {
      setIsAdmin(user.role.toLocaleLowerCase() == "admin");
    }

    return true;
  };

  const updateUser = (decodedToken) => {
    const id =
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

    setUser({
      id,
      username,
      email,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    resetErrors();
    setToken(null);
    setUserName("");
    setIsAdmin(false);
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        isLoading,
        userName,
        isAdmin,
        errors,
        resetErrors,
        token,
        isLoggedIn,
        setIsLoggedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
