import { Route, Routes } from "react-router-dom";
import WorkoutsView from "../views/WorkoutsView";
import WorkoutView from "../views/WorkoutView";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import AboutView from "../views/AboutView";
import WelcomeView from "../views/WelcomeView";
import DashboardView from "../views/DashboardView";
import ManageUsersView from "../views/ManageUsersView";
import StatisticsView from "../views/StatisticsView";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import GuestRoute from "./GuestRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={WorkoutsView} />} />
      <Route
        path="/register"
        element={<GuestRoute component={RegisterView} />}
      />
      <Route path="/login" element={<GuestRoute component={LoginView} />} />
      <Route path="/about" element={<AboutView />} />
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
        element={<ProtectedAdminRoute component={ManageUsersView} />}
      />
      <Route
        path="/dashboard/workouts"
        element={<ProtectedAdminRoute component={WorkoutsView} />}
      />
      <Route
        path="/dashboard/stats"
        element={<ProtectedAdminRoute component={StatisticsView} />}
      />
    </Routes>
  );
};

export default AppRoutes;
