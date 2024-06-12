import { useState } from "react";
import { useWorkouts } from "../context/WorkoutContext";

export default function NewWorkoutView() {
  const [workoutName, setWorkoutName] = useState("");
  const { createWorkout } = useWorkouts();

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!workoutName) return;
    createWorkout(workoutName);
    setWorkoutName("");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form className="flex flex-col rounded-md h-[12rem] p-6 justify-center w-[25rem] shadow-md bg-white mt-8 dark:bg-blue-950">
        <input
          maxLength={50}
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          type="text"
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-gray-300 dark:placeholder:text-gray-500 dark:text-white dark:bg-slate-700"
          placeholder="workout name"
        />
        <button
          disabled={!workoutName}
          onClick={handleAddWorkout}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Create Workout
        </button>
      </form>
    </div>
  );
}
