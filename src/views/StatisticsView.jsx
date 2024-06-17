import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWorkouts } from "../context/WorkoutContext";
import { Helmet } from "react-helmet-async";

const Stats = () => {
  const { state } = useWorkouts();

  return (
    <>
      <Helmet>
        <title>Stats - Fitness Tracker</title>
      </Helmet>
      <div className="flex flex-col w-full h-[400px] justify-center items-center gap-14 py-6 px-4 dark:text-white">
        <h1 className="text-3xl">Stats</h1>
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="p-4 h-40 w-40 text-white bg-[#395756] flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md">
            <p className="text-lg">Total Workouts</p>
            <div className="flex justify-center items-center gap-2 mt-10 text-xl">
              <p>{state?.workouts.length}</p>
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-3xl text-white"
              />
            </div>
          </div>
          <div className="p-4 h-40 w-40 text-white bg-[#395756] flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md">
            <p className="text-lg">Liked Workouts</p>
            <div className="flex justify-center items-center gap-2 mt-10 text-xl">
              <p>{state?.workouts.filter((w) => w.isLiked).length}</p>
              <FontAwesomeIcon
                icon={faHeart}
                className=" text-red-500 text-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
