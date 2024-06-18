import About from "./views/About";
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
import Layout from "./components/UI/Layout";
import GuestRoute from "./components/GuestRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { HelmetProvider } from "react-helmet-async";

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
    <HelmetProvider>
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
                  <Route
                    path="/register"
                    element={<GuestRoute component={RegisterView} />}
                  />
                  <Route
                    path="/login"
                    element={<GuestRoute component={LoginView} />}
                  />
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
                  <Route
                    path="/dashboard"
                    element={<ProtectedAdminRoute component={DashboardView} />}
                  />
                  <Route
                    path="/dashboard/user-managament"
                    element={
                      <ProtectedAdminRoute component={ManageUsersView} />
                    }
                  />
                  <Route
                    path="/dashboard/workout"
                    element={<ProtectedAdminRoute component={WorkoutsView} />}
                  />
                  <Route
                    path="/dashboard/stats"
                    element={<ProtectedAdminRoute component={StatisticsView} />}
                  />
                </Routes>
              </Layout>
              <Toaster visibleToasts={1} richColors position="bottom-right" />
            </WorkoutProvider>
          </DashboardProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
