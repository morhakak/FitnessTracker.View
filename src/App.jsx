import About from "./components/About";
import Contact from "./components/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkoutsView from "./views/WorkoutsView";
import WorkoutView from "./views/WorkoutView";
import { WorkoutProvider } from "./context/WorkoutContext";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import AuthProvider from "./context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "sonner";
import WelcomeView from "./views/WelcomeView";
import ProtectedRoute from "./components/ProtectedRoute";
import Initializer from "./components/Initializer";
import DashboardView from "./views/DashboardView";
import ManageUsersView from "./views/ManageUsersView";
import StatisticsView from "./views/StatisticsView";
import { DashboardProvider } from "./context/DashboardContext";
import Layout from "./components/Layout";

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
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <WorkoutProvider>
            <Initializer />
            <Layout>
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
                <Route path="/Dashboard" element={<DashboardView />} />
                <Route path="/Dashboard/users" element={<ManageUsersView />} />
                <Route path="/Dashboard/workout" element={<WorkoutsView />} />
                <Route path="/Dashboard/stats" element={<StatisticsView />} />
              </Routes>
            </Layout>
            <Toaster visibleToasts={1} richColors position="bottom-right" />
          </WorkoutProvider>
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
