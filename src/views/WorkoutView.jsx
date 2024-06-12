import AddExerciseForm from "../components/AddExerciseForm";
import ExerciseList from "../components/ExerciseList";
import SaveWorkoutButton from "../components/SaveWorkoutButton";
import { useParams } from "react-router-dom";
import { useWorkouts } from "../context/WorkoutContext";
import spinner from "../assets/spinner.gif";

export default function WorkoutView() {
  const { id } = useParams();
  const { state } = useWorkouts();

  const workout = state.workouts.find((workout) => workout.workoutId === id);

  if (!workout) {
    return (
      <div className="mx-auto">
        <img className="w-8 mx-auto mt-2" src={spinner} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl tracking-wider mb-8 first-letter:uppercase font-semibold dark:text-white">
        {workout.name}
      </h1>
      <AddExerciseForm workoutId={id} />
      <ExerciseList workoutId={id} />
      {/* <SaveWorkoutButton workoutId={id} /> */}
    </div>
  );
}
