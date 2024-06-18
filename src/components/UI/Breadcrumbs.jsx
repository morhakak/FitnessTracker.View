import { Link, useLocation } from "react-router-dom";
import { useWorkouts } from "../../context/WorkoutContext";

export default function Breadcrumbs() {
  const location = useLocation();
  const { state } = useWorkouts();

  let currentLink = "";

  function firstLetterToUpperCase(string) {
    if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const getWorkoutName = (id) => {
    const workout = state.workouts.find((w) => w.workoutId === id);
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
              className="dark:text-gray-300 text-[#395756] hover:text-gray-500"
            >
              {crumbLabel}
            </Link>
            {index < array.length - 1 && (
              <span className="mx-2 text-gray-400">&gt;</span>
            )}
          </div>
        );
    });

  return <div className="max-w-4xl ml-4 my-5 flex ">{crumbs}</div>;
}
