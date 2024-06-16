import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStickyNote,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DashboardView = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[70vh] justify-center items-center gap-10 py-6 px-4 dark:text-white">
      <div
        onClick={() => navigate("/Dashboard/users")}
        className="p-4 h-40 w-40 flex flex-col text-white bg-[#395756] justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
      >
        <FontAwesomeIcon
          icon={faUsers}
          className="text-5xl mb-10 absolute text-white dark:text-blue-100"
        />
        <p className="mt-14 text-lg">Manage Users</p>
      </div>
      <div
        onClick={() => navigate("/Dashboard/workout")}
        className="p-4 h-40 w-40 flex justify-center text-white bg-[#395756] items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
      >
        <FontAwesomeIcon
          icon={faStickyNote}
          className="text-5xl mb-10 absolute text-white dark:text-blue-100"
        />
        <p className="mt-14 text-lg">Manage Workouts</p>
      </div>
      <div
        onClick={() => console.log("stats")}
        className="p-4 h-40 w-40 flex justify-center text-white bg-[#395756] items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
      >
        <FontAwesomeIcon
          icon={faChartPie}
          className="text-5xl mb-10 absolute text-white dark:text-blue-100"
        />
        <p className="mt-14 text-lg">Statistics</p>
      </div>
    </div>
  );
};

export default DashboardView;
