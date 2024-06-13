import { useState } from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faBars,
  faX,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext.jsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isLoggedIn, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-500 relative sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 shadow-slate-300  dark:bg-[#10192E]">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <h1 className="text-white text-2xl">
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
            ? "block absolute top-18 bg-blue-500 z-10 w-full sm:w-auto shadow-slate-400 shadow-lg"
            : "hidden"
        }`}
      >
        <DarkModeToggle />
        {isLoggedIn && user && (
          <p className="block px-2 mb-2 text-white rounded sm:px-0 sm:mr-3 sm:mb-0">
            <img
              className="rounded-full w-10 inline-block mr-2"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            />
            Hi,&nbsp;
            <span className="font-semibold">{user.firstName}</span>
            <span className="hidden sm:inline-block"> &nbsp; &nbsp;|</span>
          </p>
        )}
        {isAdmin && (
          <NavLink
            className="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        )}
        {isLoggedIn && !isAdmin && (
          <NavLink
            className="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
            to="/workouts"
          >
            Workouts
          </NavLink>
        )}
        <NavLink
          className="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
          to="/about"
        >
          About
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink
              className="block px-2 mb-2 text-md text-white hover:text-gray-200 sm:px-0 sm:mb-0"
              to="/login"
            >
              Login
            </NavLink>
            <span className="text-white hidden text-xs px-2 py-1 sm:block sm:mb-0">
              /
            </span>
            <NavLink
              className="block px-2 mb-2 text-md text-white hover:text-gray-200 sm:px-0 sm:mb-0"
              to="/register"
            >
              Register
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <NavLink
            onClick={logout}
            className="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mb-0"
            to="/login"
          >
            <FontAwesomeIcon icon={faDoorOpen} className="text-white" />
            Log Out
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
