import { Link, useLocation } from "react-router-dom";
import { useWorkouts } from "../../context/WorkoutContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Breadcrumbs() {
  const location = useLocation();
  const { workouts, workoutsLoading } = useWorkouts();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!workoutsLoading) {
      setLoading(false);
    }
  }, [workoutsLoading]);

  let currentLink = "";

  function firstLetterToUpperCase(string) {
    if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const getWorkoutName = (id) => {
    const workout = workouts.find((w) => w.workoutId === id);
    return workout ? workout.name : id;
  };

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      let crumbLabel = crumb;
      if (array[0] === "workouts" && index === 1) {
        crumbLabel = getWorkoutName(crumb);
      } else if (crumb.includes("user")) {
        crumbLabel = "User Management";
      } else {
        crumbLabel = firstLetterToUpperCase(crumb);
      }
      if (array.length > 1)
        return (
          <div className="flex items-center" key={crumb}>
            <Link
              to={currentLink}
              className="dark:text-gray-300 text-sm border-b-[#395756] text-[#395756] hover:text-gray-500"
            >
              {firstLetterToUpperCase(crumbLabel)}
            </Link>
            {index < array.length - 1 && (
              <span className="mx-2 text-gray-400">&gt;</span>
            )}
          </div>
        );
    });

  if (loading) {
    return (
      <div className="max-w-4xl ml-4 my-5 flex items-center">
        <FontAwesomeIcon icon={faSpinner} className="mr-2" />
        Loading...
      </div>
    );
  }

  return <div className="max-w-4xl ml-4 my-5 flex ">{crumbs}</div>;
}
