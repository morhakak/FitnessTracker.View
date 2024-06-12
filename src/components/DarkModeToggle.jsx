import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../DarkModeToggle.css";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") == "dark");
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
    if (isDark) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark:bg-slate-950");
    } else {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark:bg-slate-950");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div>
      <button
        onClick={toggleDark}
        className="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
      >
        <TransitionGroup component={null}>
          <CSSTransition
            key={isDark ? "sun" : "moon"}
            classNames="icons"
            timeout={100}
            nodeRef={isDark ? sunRef : moonRef}
          >
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              className="text-white h-5 w-5"
              ref={isDark ? sunRef : moonRef}
            />
          </CSSTransition>
        </TransitionGroup>
      </button>
    </div>
  );
};

export default DarkModeToggle;
