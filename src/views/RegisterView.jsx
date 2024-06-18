import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as regularCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
  faSpinner,
  faCheckCircle as solidCircle,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const RegisterView = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading, errors, resetErrors } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    imageUrl: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    resetErrors();
    console.log(e);

    if (!validateInputs()) return;

    const success = await register(formData);
    if (success) {
      navigate("/login");
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.username || formData.username.length < 3)
      newErrors.username = "User name is required  with at least 3 characters";
    if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!validPassword(formData.password))
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/;
    return regex.test(password);
  };

  const isValidInputs = () => {
    return validateEmail(formData.email) && validPassword(formData.password);
  };

  const isValidPasswordLength = () => {
    return formData.password.length >= 8;
  };

  const hasUppercaseAndLowercase = () => {
    const lowerRegex = /[a-z]/;
    const upperRegex = /[A-Z]/;
    return (
      lowerRegex.test(formData.password) && upperRegex.test(formData.password)
    );
  };

  const hasNumberAndSpecialChar = () => {
    const specialCharacters = /[`!@#$%^&*()_\-+=\\[\]{};':"\\|,.<>\\/?~ ]/;
    const containsNumber = /[0-9]/.test(formData.password);
    const containsSpecialCharacter = specialCharacters.test(formData.password);
    return containsSpecialCharacter && containsNumber;
  };

  const getPasswordLengthIcon = () => {
    return isValidPasswordLength() ? solidCircle : regularCircle;
  };

  const getLetterCaseIcon = () => {
    return hasUppercaseAndLowercase() ? solidCircle : regularCircle;
  };

  const getNumberAndSymbolIcon = () => {
    return hasNumberAndSpecialChar() ? solidCircle : regularCircle;
  };

  const getPasswordVisibilityIcon = () => {
    return isPasswordVisible ? faEye : faEyeSlash;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Register - Fitness Tracker</title>
      </Helmet>
      <div className="relative">
        <div className="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative bg-[#395756] dark:bg-[#10192E]  dark:shadow-slate-700">
          <form
            className="flex flex-col relative justify-center"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex items-center relative">
              <FontAwesomeIcon
                icon={faUser}
                className="text-md text-white mb-4 absolute dark:text-blue-100"
              />
              <input
                className="text-white h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 bg-[#395756] dark:bg-[#10192E]"
                value={formData.username}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="User Name"
                name="username"
                autoComplete="off"
              />
            </div>
            {formErrors.username && (
              <p className="text-red-500 text-xs absolute top-[42px]">
                {formErrors.username}
              </p>
            )}
            <div className="flex items-center relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-md text-white mb-4 absolute dark:text-blue-100"
              />
              <input
                className="text-white h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 bg-[#395756] dark:bg-[#10192E]"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="off"
              />
            </div>
            {formData.email.length > 0 && (
              <p className="text-red-500 text-xs absolute top-[100px]">
                {formErrors.email}
              </p>
            )}
            <div className="flex items-center relative">
              <FontAwesomeIcon
                icon={faImage}
                className="text-md text-white mb-4 absolute dark:text-blue-100"
              />
              <input
                className="text-white h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 bg-[#395756] dark:bg-[#10192E]"
                value={formData.imageUrl}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Image URL"
                name="imageUrl"
                autoComplete="off"
              />
            </div>
            <div className="flex items-center relative">
              <FontAwesomeIcon
                icon={faLock}
                className="text-md text-white mb-4 absolute dark:text-blue-100"
              />
              <input
                className="text-white h-10 mb-4 focus:outline-none pl-6 pr-6 w-full border-b-2 bg-[#395756] dark:bg-[#10192E] "
                value={formData.password}
                onChange={(e) => handleChange(e)}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
              />
              <FontAwesomeIcon
                icon={getPasswordVisibilityIcon()}
                onClick={togglePasswordVisibility}
                className="text-md text-white mb-4 absolute left-[96%] dark:text-blue-100"
              />
            </div>
            <div className="text-xs mb-4">
              <ul>
                <li
                  className={`mb-1 transition duration-200 ease-in ${
                    isValidPasswordLength()
                      ? "text-green-500"
                      : "text-white  dark:text-gray-200"
                  }`}
                >
                  <FontAwesomeIcon icon={getPasswordLengthIcon()} />
                  &nbsp;At least 8 characters
                </li>
                <li
                  className={` mb-1 transition duration-200 ease-in ${
                    hasUppercaseAndLowercase()
                      ? "text-green-500"
                      : "text-white  dark:text-gray-200"
                  }`}
                >
                  <FontAwesomeIcon icon={getLetterCaseIcon()} />
                  &nbsp;Lowercase (a-z) and uppercase (A-Z)
                </li>
                <li
                  className={`mb-1 transition duration-200 ease-in ${
                    hasNumberAndSpecialChar()
                      ? "text-green-500"
                      : "text-white dark:text-gray-200"
                  }`}
                >
                  <FontAwesomeIcon icon={getNumberAndSymbolIcon()} />
                  &nbsp;At least one number (0-9) and one symbol
                </li>
              </ul>
            </div>
            <button
              className="hover:cursor-pointer h-10 bg-[#639796] dark:bg-[#0D2247] dark:hover:bg-[#2f354d] text-white mb-14 hover:bg-[#7abbba] disabled:bg-[#4a6063] w-full dark:disabled:bg-[#63666c]"
              disabled={!isValidInputs()}
              type="submit"
            >
              {isLoading && (
                <FontAwesomeIcon
                  className="w-6 h-6 inline-block absolute left-10"
                  icon={faSpinner}
                  alt="loading"
                />
              )}
              Register
            </button>
          </form>
          {errors.length > 0 && (
            <p className="text-red-500 text-sm font-semibold absolute px-2 bottom-10">
              Registration failed: {errors[0]}
            </p>
          )}
          <p className="text-center font-medium text-xs text-gray-300">
            Already registered?{" "}
            <Link
              to="/login"
              className=" text-white font-semibold hover:cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterView;
