import { useWorkouts } from "../context/WorkoutContext";
import PropTypes from "prop-types";

export default function SaveWorkoutButton({ workoutId }) {
  const { saveWorkout } = useWorkouts();

  return (
    <button
      className="bg-blue-500 text-white rounded-md py-2 px-4 mt-5  hover:bg-blue-300"
      onClick={() => saveWorkout(workoutId)}
    >
      Save Workout
    </button>
  );
}

SaveWorkoutButton.propTypes = {
  workoutId: PropTypes.string,
};
