import WorkoutCard from "../components/WorkoutCard";
import { useWorkouts } from "../context/WorkoutContext";
import CreateWorkoutForm from "../components/CreateWorkoutForm";
import { useEffect } from "react";
export default function WorkoutsView() {
  const { state, removeWorkout, updateWorkout, fetchWorkouts } = useWorkouts();

  useEffect(() => {
    async function fetch() {
      await fetchWorkouts();
    }
    fetch();
  }, [fetchWorkouts]);

  const handleToggleLiked = (id) => {
    console.log("workouts", state.workouts);
    let updatedWorkout = state.workouts.find(
      (workout) => workout.workoutId === id
    );

    updatedWorkout = {
      ...updatedWorkout,
      isLiked: !updatedWorkout.isLiked,
      updatedAt: new Date().toISOString(),
    };

    updateWorkout(id, updatedWorkout);
  };

  const handleRemoveWorkout = (id) => {
    removeWorkout(id);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <CreateWorkoutForm />
      <div className="justify-start grid grid-cols-2 px-4 gap-4 mt-8 mb-6 sm:grid-cols-2 md:grid-cols-3">
        {state.workouts.length > 0 ? (
          state.workouts.map((workout) => (
            <WorkoutCard
              key={workout.workoutId}
              workout={workout}
              onToggleLiked={handleToggleLiked}
              onRemoveWorkout={handleRemoveWorkout}
              className="flex-shrink-0" // Ensure each workout card doesn't shrink
            />
          ))
        ) : (
          <p className="text-xl mt-4 dark:text-white col-span-3">
            You don&rsquo;t have any workouts yet.
          </p>
        )}
      </div>
    </div>
  );
}
