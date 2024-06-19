import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useWorkouts } from "../context/WorkoutContext";
import { Helmet } from "react-helmet-async";
import DashboardCard from "../components/dashboard/DashboardCard";
import { useDashboard } from "../context/DashboardContext";

const Stats = () => {
  const { workouts } = useWorkouts();
  const { users } = useDashboard();

  return (
    <>
      <Helmet>
        <title>Stats - Fitness Tracker</title>
      </Helmet>
      <div className="flex flex-col w-full mt-12 h-[300px] justify-center items-center gap-14 py-6 px-4 dark:text-white">
        <div className="flex flex-col sm:flex-row gap-10">
          <DashboardCard>
            <div className="flex flex-col items-center text-center">
              <p>Total Users</p>
              <FontAwesomeIcon icon={faUser} className="text-3xl mb-2" />
              <p>{users.length}</p>
            </div>
          </DashboardCard>
          <DashboardCard>
            <div className="flex flex-col items-center text-center">
              <p>Total Workouts</p>
              <FontAwesomeIcon icon={faDumbbell} className="text-3xl mb-2" />
              <p>{workouts.length}</p>
            </div>
          </DashboardCard>
          <DashboardCard>
            <div className="flex flex-col items-center text-center">
              <p>Liked Workouts</p>
              <FontAwesomeIcon icon={faHeart} className="text-3xl mb-2" />
              <p>{workouts.filter((w) => w.isLiked).length}</p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </>
  );
};

export default Stats;
