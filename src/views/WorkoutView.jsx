import AddExerciseForm from "../components/AddExerciseForm";
import ExerciseList from "../components/ExerciseList";
import { useParams } from "react-router-dom";
import { useWorkouts } from "../context/WorkoutContext";
import { toast } from "sonner";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";

export default function WorkoutView() {
  const { id } = useParams();
  const { state, loader } = useWorkouts();

  const workout = state.workouts.find((workout) => workout.workoutId === id);

  if (loader.loadWorkouts && !workout) {
    toast(
      <>
        <FontAwesomeIcon icon={faSpinner} className="text-md text-black " />
        <span className="text-xs font-medium text-black">loading...</span>
      </>,
      { duration: 1500 }
    );
  }

  // const handleAddExercise = useCallback(() => {
  //   setWorkout((prevWorkout) => {
  //     const newExercise = {
  //       exerciseId: Date.now().toString(), // Unique ID for the new exercise
  //       name: "New Exercise",
  //       sets: [],
  //       workoutId: workoutId,
  //       createdAt: new Date().toISOString(),
  //     };
  //     return {
  //       ...prevWorkout,
  //       exercises: [...prevWorkout.exercises, newExercise],
  //     };
  //   });
  // }, [workoutId]);

  return (
    <div className="flex flex-col items-center mt-8">
      {workout && (
        <>
          <h1 className="text-3xl tracking-wider mb-8 first-letter:uppercase font-semibold dark:text-white">
            {workout.name}
          </h1>
          {/* <AddExerciseForm workoutId={id} /> */}
          <ExerciseList workoutId={id} />
        </>
      )}
    </div>
  );
}
