import {
  faUsers,
  faChartPie,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/dashboard/DashboardCard";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardView = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Dashboard - Fitness Tracker</title>
      </Helmet>
      <div className="flex flex-col sm:flex-row text-white w-full sm:h-[400px] justify-center items-center gap-10 py-6 px-4 dark:text-white">
        <DashboardCard action={() => navigate("/dashboard/user-managament")}>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faUsers} className="text-5xl mb-2" />
            <p>Manage Users</p>
          </div>
        </DashboardCard>
        <DashboardCard action={() => navigate("/dashboard/workouts")}>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faDumbbell} className="text-5xl mb-2" />
            <p>Manage Workouts</p>
          </div>
        </DashboardCard>
        <DashboardCard action={() => navigate("/dashboard/stats")}>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faChartPie} className="text-5xl mb-2" />
            <p>Statistics</p>
          </div>
        </DashboardCard>
      </div>
    </>
  );
};

export default DashboardView;
