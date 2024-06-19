import ExercisesList from "../components/workout/ExercisesList";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkouts } from "../context/WorkoutContext";
import { toast } from "sonner";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

export default function WorkoutView() {
  const { id } = useParams();
  const { workouts, workoutsLoading } = useWorkouts();
  const navigate = useNavigate();

  const workout = workouts.find((workout) => workout.workoutId === id);

  useEffect(() => {
    if (!workoutsLoading && !workout) {
      navigate("/404");
    }
  }, [workoutsLoading, workout, navigate]);

  // const workout = workouts.find((workout) => workout.workoutId === id);

  if (workoutsLoading && !workout) {
    toast(
      <>
        <FontAwesomeIcon icon={faSpinner} className="text-md text-black " />
        <span className="text-xs font-medium text-black">loading...</span>
      </>,
      { duration: 1500 }
    );
  }

  return (
    <>
      <Helmet>
        <title>Workout - Fitness Tracker</title>
      </Helmet>
      <div className="flex flex-col items-center mt-8">
        {workout && (
          <>
            <h1 className="text-3xl bg-[#395756] dark:bg-[#10192E] border-2 shadow-md dark:border-2 text-white py-2 px-2 tracking-wider mb-8 first-letter:uppercase font-semibold dark:text-white">
              {workout.name}
            </h1>
            <ExercisesList workoutId={id} />
          </>
        )}
      </div>
    </>
  );
}
