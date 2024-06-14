import About from "./components/About";
import Contact from "./components/Contact";
import NewNavbar from "./components/NewNavbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WorkoutsView from "./views/WorkoutsView";
import WorkoutView from "./views/WorkoutView";
import { WorkoutProvider } from "./context/WorkoutContext";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "sonner";
import PropTypes from "prop-types";
import WelcomeView from "./views/WelcomeView";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <>
      <AuthProvider>
        <WorkoutProvider>
          <BrowserRouter>
            <NewNavbar />
            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute component={WorkoutsView} />}
              />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/workouts"
                element={<ProtectedRoute component={WorkoutsView} />}
              />
              <Route
                path="/workouts/:id"
                element={<ProtectedRoute component={WorkoutView} />}
              />
              <Route path="/welcome" element={<WelcomeView />} />
            </Routes>
            <Toaster visibleToasts={1} richColors position="bottom-right" />
          </BrowserRouter>
        </WorkoutProvider>
      </AuthProvider>
    </>
  );
}

const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component /> : <Navigate to="/welcome" />;
};

export default App;

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
