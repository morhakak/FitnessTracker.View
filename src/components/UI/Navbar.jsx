import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext.jsx";
import defaultImage from "../../assets/user.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout, getToken } = useAuth();

  useEffect(() => {
    getToken();
  }, []);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function firstLetterToUpperCase(string) {
    if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <header className="bg-[#395756] relative sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 shadow-slate-300  dark:bg-[#10192E]">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <h1
          onClick={() => {
            if (!user) return;
            navigate("/workouts");
          }}
          className="text-white text-2xl cursor-pointer"
        >
          <FontAwesomeIcon icon={faDumbbell} className="text-white mr-2" />
          Fitness Tracker
        </h1>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faX} className="text-white h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="text-white h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <nav
        className={`px-4 pt-2 pb-4 sm:flex items-center sm:p-0 sm:static sm:top-0 sm:shadow-none dark:bg-[#10192E] dark:shadow-slate-700 ${
          isOpen
            ? "block absolute top-18 bg-[#395756] z-10 w-full sm:w-auto shadow-slate-400 shadow-lg"
            : "hidden"
        }`}
      >
        <DarkModeToggle />
        {isLoggedIn && user && (
          <p className="block px-2 mb-2 text-sm text-gray-300 rounded sm:px-0 sm:mr-3 sm:mb-0">
            <img
              className="rounded-full w-10 inline-block mr-2"
              src={user && user.imageUrl ? user.imageUrl : defaultImage}
            />
            Hi,&nbsp;
            <span className="font-semibold">
              {firstLetterToUpperCase(user.username)}
            </span>
            <span className="hidden sm:inline-block"> &nbsp; &nbsp;|</span>
          </p>
        )}
        {isLoggedIn && user && user.isAdmin && (
          <NavLink
            className="block px-2 mb-2 text-sm text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        )}
        {isLoggedIn && user && !user.isAdmin && (
          <NavLink
            className="block px-2 text-gray-300 hover:text-white mb-2 text-sm sm:px-0 sm:mr-3 sm:mb-0"
            to="/workouts"
          >
            Workouts
          </NavLink>
        )}
        <NavLink
          className="block px-2 text-gray-300 hover:text-white mb-2 text-sm sm:px-0 sm:mr-3 sm:mb-0"
          to="/about"
        >
          About
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink
              className="block px-2 mb-2 text-sm text-md text-gray-300 hover:text-white sm:px-0 sm:mb-0"
              to="/login"
            >
              Login
            </NavLink>
            <span className="text-white hidden text-xs px-2 py-1 sm:block sm:mb-0">
              |
            </span>
            <NavLink
              className="block px-2 mb-2 text-sm text-md text-gray-300 hover:text-white sm:px-0 sm:mb-0"
              to="/register"
            >
              Register
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <NavLink
            onClick={logout}
            className="block px-2 mb-2 text-sm text-gray-300 hover:text-white sm:px-0 sm:mb-0"
            to="/welcome"
          >
            Log out
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
