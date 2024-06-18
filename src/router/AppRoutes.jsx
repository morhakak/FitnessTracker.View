import { Route, Routes } from "react-router-dom";
import WorkoutsView from "../views/WorkoutsView";
import WorkoutView from "../views/WorkoutView";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import AboutView from "../views/AboutView";
import ContactView from "../views/ContactView";
import WelcomeView from "../views/WelcomeView";
import DashboardView from "../views/DashboardView";
import ManageUsersView from "../views/ManageUsersView";
import StatisticsView from "../views/StatisticsView";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={WorkoutsView} />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/contact" element={<ContactView />} />
      <Route
        path="/workouts"
        element={<ProtectedRoute component={WorkoutsView} />}
      />
      <Route
        path="/workouts/:id"
        element={<ProtectedRoute component={WorkoutView} />}
      />
      <Route path="/welcome" element={<WelcomeView />} />
      <Route path="/dashboard" element={<DashboardView />} />
      <Route path="/dashboard/user-managament" element={<ManageUsersView />} />
      <Route path="/dashboard/workouts" element={<WorkoutsView />} />
      <Route path="/dashboard/stats" element={<StatisticsView />} />
    </Routes>
  );
};

export default AppRoutes;
