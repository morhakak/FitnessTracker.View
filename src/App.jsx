import { BrowserRouter } from "react-router-dom";
import { WorkoutProvider } from "./context/WorkoutContext";
import AuthProvider from "./context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Initializer from "./components/Initializer";
import { DashboardProvider } from "./context/DashboardContext";
import Layout from "./components/UI/Layout";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./router/AppRoutes";

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
                <AppRoutes />
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
