import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as regularCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as solidCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import spinner from "../assets/spinner.gif";

const RegisterView = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailInput = useRef(null);
  const navigate = useNavigate();
  const { register, isLoading, errors, resetErrors } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
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
    if (!formData.firstName || formData.firstName.length < 3)
      newErrors.firstName =
        "First Name is required with at least 3 characters.";
    if (!formData.lastName || formData.lastName.length < 3)
      newErrors.lastName = "Last Name is required  with at least 3 characters.";
    if (!formData.username || formData.username.length < 3)
      newErrors.username = "Username is required  with at least 3 characters.";
    if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email.";
    if (!validPassword(formData.password))
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.";

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

  // const computedEmail = () => {
  //   return !validateEmail(formData.email) ? "Please enter a valid email" : "";
  // };

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

  const passwordLengthIcon = () => {
    return isValidPasswordLength() ? solidCircle : regularCircle;
  };

  const letterCaseIcon = () => {
    return hasUppercaseAndLowercase() ? solidCircle : regularCircle;
  };

  const numberAndSymbolIcon = () => {
    return hasNumberAndSpecialChar() ? solidCircle : regularCircle;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordVisibilityIcon = () => {
    return isPasswordVisible ? faEye : faEyeSlash;
  };

  return (
    <div className="relative">
      <div className="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative dark:bg-blue-950 dark:shadow-slate-700">
        <form
          className="flex flex-col relative justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
            />
            <input
              className="h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="First Name"
              ref={emailInput}
              name="firstName"
            />
          </div>
          {formErrors.firstName && (
            <p className="text-red-500 text-xs absolute top-[2.5rem]">
              {formErrors.firstName}
            </p>
          )}
          <div className="flex items-center relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
            />
            <input
              className="h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Last Name"
              ref={emailInput}
              name="lastName"
            />
          </div>
          {formErrors.lastName && (
            <p className="text-red-500 text-xs absolute top-[6rem]">
              {formErrors.lastName}
            </p>
          )}
          <div className="flex items-center relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
            />
            <input
              className="h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="User Name"
              name="username"
            />
          </div>
          {formErrors.username && (
            <p className="text-red-500 text-xs absolute top-[152px]">
              {formErrors.username}
            </p>
          )}
          <div className="flex items-center relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
            />
            <input
              className="h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              type="email"
              placeholder="Email"
              name="email"
            />
          </div>
          {formData.email.length > 0 && (
            <p className="text-red-500 text-xs absolute top-[152px]">
              {formErrors.email}
            </p>
          )}
          <div className="flex items-center relative">
            <FontAwesomeIcon
              icon={faLock}
              className="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
            />
            <input
              className="h-10 mb-4 focus:outline-none pl-6 pr-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
            />
            <FontAwesomeIcon
              icon={passwordVisibilityIcon()}
              onClick={togglePasswordVisibility}
              className="text-md text-blue-500 mb-4 absolute left-[96%] dark:text-blue-100"
            />
          </div>
          <div className="text-xs mb-4">
            <ul>
              <li
                className={`mb-1 transition duration-200 ease-in ${
                  isValidPasswordLength()
                    ? "text-green-500"
                    : "text-gray-500  dark:text-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={passwordLengthIcon()} />
                &nbsp;At least 8 characters
              </li>
              <li
                className={`mb-1 transition duration-200 ease-in ${
                  hasUppercaseAndLowercase()
                    ? "text-green-500"
                    : "text-gray-500  dark:text-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={letterCaseIcon()} />
                &nbsp;Lowercase (a-z) and uppercase (A-Z)
              </li>
              <li
                className={`mb-1 transition duration-200 ease-in ${
                  hasNumberAndSpecialChar()
                    ? "text-green-500"
                    : "text-gray-500 dark:text-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={numberAndSymbolIcon()} />
                &nbsp;At least one number (0-9) and one symbol
              </li>
            </ul>
          </div>
          <button
            className="hover:cursor-pointer h-10 bg-blue-500 text-white mb-14 hover:bg-blue-300 disabled:bg-blue-200 w-full dark:bg-blue-800 dark:disabled:bg-blue-500"
            disabled={!isValidInputs()}
            type="submit"
          >
            {isLoading && (
              <img
                className="w-6 h-6 inline-block absolute left-10"
                src={spinner}
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
        <p className="text-center text-xs dark:text-blue-100">
          Already registered?
          <Link
            to="/login"
            className="text-blue-900 font-semibold hover:cursor-pointer hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-50"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
