import { useState } from "react";
import PropTypes from "prop-types";
import { useWorkouts } from "../context/WorkoutContext";

export default function AddExerciseForm({ workoutId }) {
  const [exerciseName, setExerciseName] = useState("");
  const { addExercise } = useWorkouts();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExercise(workoutId, exerciseName);
    setExerciseName("");
  };

  return (
    <div className="max-w-md mx-auto mb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 dark:bg-blue-950  dark:shadow-slate-800"
      >
        <h2 className="text-xl text-center font-semibold mb-4 dark:text-white">
          Add New Exercise
        </h2>
        <div className="flex items-center mb-4">
          <input
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md mr-4 outline-none focus:shadow-md dark:text-white dark:bg-slate-700"
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            placeholder="Exercise Name"
            required
          />
          <button
            type="submit"
            className="px-2 bg-blue-500 text-white text-xl rounded-md hover:bg-blue-600 transition duration-300"
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
}
AddExerciseForm.propTypes = {
  workoutId: PropTypes.string,
};
