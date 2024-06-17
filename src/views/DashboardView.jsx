import {
  faUsers,
  faChartPie,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { Helmet } from "react-helmet-async";

const DashboardView = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Dashboard - Fitness Tracker</title>
      </Helmet>
      <div className="flex flex-col md:flex-row text-white w-full h-[400px] justify-center items-center gap-10 py-6 px-4 dark:text-white">
        <DashboardCard
          text="Manage Users"
          icon={faUsers}
          action={() => navigate("/Dashboard/users")}
        />
        <DashboardCard
          text="Manage Workouts"
          icon={faDumbbell}
          action={() => navigate("/Dashboard/workout")}
        />
        <DashboardCard
          text="Statistics"
          icon={faChartPie}
          action={() => navigate("/Dashboard/stats")}
        />
      </div>
    </>
  );
};

export default DashboardView;
