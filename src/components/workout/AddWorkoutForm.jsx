import { useState } from "react";
import { useWorkouts } from "../../context/WorkoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function AddWorkoutForm() {
  const [workoutName, setWorkoutName] = useState("");
  const { createWorkout, loader } = useWorkouts();

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!workoutName) return;
    createWorkout(workoutName);
    setWorkoutName("");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form className="flex flex-col text-white rounded-md h-[8rem] py-1 px-6 justify-center w-[25rem] shadow-md bg-[#395756] mt-8 dark:bg-[#10192E]">
        <input
          maxLength={50}
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          type="text"
          className="w-full mb-2 px-4 py-2 border text-white bg-[#395756] placeholder:text-gray-300 border-gray-300 rounded-lg focus:outline-none  focus:border-gray-300 dark:placeholder:text-gray-300 dark:text-white dark:bg-slate-700"
          placeholder="workout name"
        />
        <button
          disabled={!workoutName}
          onClick={handleAddWorkout}
          className="w-full relative bg-[#191C29] hover:bg-[#2f354d] text-white font-bold py-2 px-4 rounded-lg focus:outline-none  focus:ring-opacity-50 disabled:bg-slate-300 dark:bg-[#0D2247] hover:dark:bg-[#122e60] dark:disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          {loader.addWorkout && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-md text-black absolute left-3 top-3"
            />
          )}
          Create Workout
        </button>
      </form>
    </div>
  );
}
