import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import spinner from "../assets/spinner.gif";
import { toast } from "sonner";

const LoginView = () => {
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
    await login(formData.userName, formData.password);
    return;
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
    <div className="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative shadow-slate-400 bg-[#395756] dark:bg-[#10192E] dark:shadow-slate-700">
      <form className="flex flex-col relative" onSubmit={loginHandler}>
        <div className="flex items-center relative mb-4">
          <FontAwesomeIcon
            icon={faUser}
            className="text-md text-white absolute"
          />
          <input
            className="h-10 pl-6 w-full border-b-2 mb-2 focus:outline-none text-white bg-[#395756] dark:bg-[#10192E]"
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
            className="text-md text-white absolute"
          />
          <input
            className="h-10 pl-6 pr-6 w-full border-b-2 mb-2 focus:outline-none bg-[#395756] dark:bg-[#10192E] text-white"
            value={formData.password}
            onChange={handleInputChange}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <FontAwesomeIcon
            icon={passwordVisibilityIcon}
            onClick={togglePasswordVisibility}
            className="text-md text-white absolute cursor-pointer right-4"
          />
        </div>
        {formErrors.password && (
          <p className="text-red-500 text-xs mb-4 absolute top-[6.5rem]">
            {formErrors.password}
          </p>
        )}
        <button
          className="h-10  bg-[#639796] text-white mb-14 hover:bg-[#7abbba] disabled:bg-[#4a6063] dark:bg-[#0D2247] dark:hover:bg-[#2f354d] dark:disabled:bg-[#63666c]"
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
      <p className="text-center text-xs text-gray-300">
        Don&apos;t have an account yet?{" "}
        <Link
          to="/register"
          className=" text-white font-semibold hover:cursor-pointer"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
