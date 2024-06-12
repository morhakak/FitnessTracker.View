import About from "./components/About";
import Contact from "./components/Contact";
import NewNavbar from "./components/NewNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkoutsView from "./views/WorkoutsView";
import WorkoutView from "./views/WorkoutView";
import { WorkoutProvider } from "./context/WorkoutContext";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";

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
              <Route path="/" element={<WorkoutsView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/workouts" element={<WorkoutsView />} />
              <Route path="/workouts/:id" element={<WorkoutView />} />
            </Routes>
          </BrowserRouter>
        </WorkoutProvider>
      </AuthProvider>
    </>
  );
}

export default App;
