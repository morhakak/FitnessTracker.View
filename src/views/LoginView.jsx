import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import spinner from "../assets/spinner.gif";
import { toast, Toaster } from "sonner";

const LoginView = () => {
  const navigate = useNavigate();
  const { login, errors, resetErrors, isLoading } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const userNameInput = useRef(null);

  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [formErrors, setFormErrors] = useState({ userName: "", password: "" });

  useEffect(() => {
    if (errors.length > 0) {
      setFormErrors((prevErrors) => ({ ...prevErrors, form: errors[0] }));
    }
  }, [errors]);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors[0]);
    }
  }, [errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    resetErrors();
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    resetErrors();
    setFormErrors({ userName: "", password: "", form: "" });

    if (!validateInputs()) return;

    const response = await login(formData.userName, formData.password);
    if (response) {
      toast.success(`${formData.userName} logged in successfully`);
      navigate("/");
    }
  };

  const validateInputs = () => {
    const { userName, password } = formData;
    const newErrors = {};
    if (!userName || userName.length < 3) {
      newErrors.userName = "Please enter a valid username.";
    }
    if (!password || password.length < 8) {
      newErrors.password = "Password should contain at least 8 characters.";
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordVisibilityIcon = isPasswordVisible ? faEye : faEyeSlash;

  return (
    <div className="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative shadow-slate-400 dark:bg-blue-950 dark:shadow-slate-700">
      <Toaster richColors position="top-right" />
      <form className="flex flex-col relative" onSubmit={loginHandler}>
        <div className="flex items-center relative mb-4">
          <FontAwesomeIcon
            icon={faUser}
            className="text-md text-blue-500 absolute dark:text-blue-100"
          />
          <input
            className="h-10 pl-6 w-full border-b-2 mb-2 focus:outline-none dark:bg-blue-950 dark:text-white"
            value={formData.userName}
            onChange={handleInputChange}
            type="text"
            placeholder="User Name"
            name="userName"
            ref={userNameInput}
          />
        </div>
        {formErrors.userName && (
          <p className="text-red-500 text-xs mb-4 absolute top-[2.5rem]">
            {formErrors.userName}
          </p>
        )}
        <div className="flex items-center relative mb-4">
          <FontAwesomeIcon
            icon={faLock}
            className="text-md text-blue-500 absolute dark:text-blue-100"
          />
          <input
            className="h-10 pl-6 pr-6 w-full border-b-2 mb-2 focus:outline-none dark:bg-blue-950 dark:text-white"
            value={formData.password}
            onChange={handleInputChange}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <FontAwesomeIcon
            icon={passwordVisibilityIcon}
            onClick={togglePasswordVisibility}
            className="text-md text-blue-500 absolute cursor-pointer right-4 dark:text-blue-100"
          />
        </div>
        {formErrors.password && (
          <p className="text-red-500 text-xs mb-4 absolute top-[6.5rem]">
            {formErrors.password}
          </p>
        )}
        <button
          className="h-10 bg-blue-500 text-white mb-4 hover:bg-blue-300 disabled:bg-blue-200 dark:bg-blue-800 dark:disabled:bg-blue-500"
          disabled={!formData.userName || !formData.password || isLoading}
          type="submit"
        >
          {isLoading && (
            <img
              className="w-6 h-6 inline-block absolute left-2"
              src={spinner}
              alt="spinner"
            />
          )}
          Login
        </button>
      </form>
      {formErrors.form && (
        <p className="text-red-500 text-sm font-semibold mb-4">
          {formErrors.form}
        </p>
      )}
      <p className="text-center text-xs dark:text-blue-100">
        Don&apos;t have an account yet?{" "}
        <Link
          to="/register"
          className="text-blue-900 font-semibold hover:cursor-pointer hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-50"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
