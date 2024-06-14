import { useState, useEffect, useCallback } from "react";
import { useWorkouts } from "../context/WorkoutContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
// import spinner from "../assets/spinner.gif";
// import { toast } from "sonner";

export default function ExerciseList({ workoutId }) {
  const { state, saveWorkoutToDB } = useWorkouts();

  // const [localWorkout, setLocalWorkout] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const toastIdRef = useRef(null);
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const existingWorkout = state.workouts.find(
      (workout) => workout.workoutId === workoutId
    );

    setWorkout({ ...existingWorkout });

    // return () => {
    //   toast.dismiss();
    // };
  }, [state.workouts, workoutId]);

  // useEffect(() => {
  //   const workout = state.workouts.find(
  //     (workout) => workout.workoutId === workoutId
  //   );
  //   setLocalWorkout(workout ? { ...workout } : null);

  //   return () => {
  //     toast.dismiss();
  //   };
  // }, [state.workouts, workoutId]);

  const handleExerciseNameChange = (exerciseId, name) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) =>
        exercise.exerciseId === exerciseId ? { ...exercise, name } : exercise
      );
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  };

  const handleSetChange = useCallback((exerciseId, setId, field, value) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.exerciseId === exerciseId) {
          const updatedSets = exercise.sets.map((set) =>
            set.setId === setId ? { ...set, [field]: value } : set
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  }, []);

  const handleAddSet = useCallback((exerciseId) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.exerciseId === exerciseId) {
          const newSet = {
            setId: `${Date.now().toString()}temp`,
            reps: 0,
            weight: 0,
          };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  }, []);

  const handleDeleteSet = useCallback((exerciseId, setId) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.exerciseId === exerciseId) {
          const updatedSets = exercise.sets.filter(
            (set) => set.setId !== setId
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  }, []);

  // const handleSave = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const promises = localWorkout.exercises.map((exercise) =>
  //       updateExerciseInDB(exercise.exerciseId, exercise)
  //     );
  //     await Promise.all(promises);

  //     await saveWorkoutToDB(localWorkout);
  //     toast.success("Workout was saved successfully!");

  //     // Update originalWorkout state after saving changes
  //     setLocalWorkout((prev) => ({ ...prev }));
  //   } catch (error) {
  //     toast.error("Failed to save workout", error);
  //     console.error("Failed to save workout", error);
  //   } finally {
  //     setIsLoading(false);
  //     setIsChanged(false);
  //     toast.dismiss(toastIdRef.current); // Dismiss the specific toast
  //   }
  // }, [localWorkout, saveWorkoutToDB, updateExerciseInDB]);

  // const handleDiscard = useCallback(() => {
  //   const originalWorkout = state.workouts.find(
  //     (workout) => workout.workoutId === workoutId
  //   );
  //   setLocalWorkout(originalWorkout ? { ...originalWorkout } : null);
  //   setIsChanged(false);
  //   toast.dismiss(toastIdRef.current); // Dismiss the specific toast
  // }, [state.workouts, workoutId]);

  const handleDeleteExercise = useCallback((exerciseId) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.filter(
        (exercise) => exercise.exerciseId !== exerciseId
      );
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  }, []);

  // // Show toast only once when isChanged changes to true
  // useEffect(() => {
  //   if (isChanged) {
  //     toastIdRef.current = toast(
  //       <>
  //         <button
  //           className="w-[48%] py-2 px-2 bg-green-500 rounded-md text-center text-white hover:bg-green-300"
  //           onClick={handleSave}
  //         >
  //           {isLoading && (
  //             <img className="w-6 absolute top-[0.5rem] left-3" src={spinner} />
  //           )}
  //           Save Changes
  //         </button>
  //         <button
  //           className="w-[48%] py-2 px-2 bg-red-500 rounded-md text-center text-white hover:bg-red-300"
  //           onClick={handleDiscard}
  //         >
  //           Discard Changes
  //         </button>
  //       </>,
  //       { duration: Infinity }
  //     );
  //   } else if (!isChanged && toastIdRef.current) {
  //     toast.dismiss(toastIdRef.current);
  //     toastIdRef.current = null;
  //   }
  // }, [handleSave, handleDiscard, isChanged, isLoading]);

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

  if (!workout) {
    return null;
  }

  // if (!localWorkout && isLoading) {
  //   return (
  //     <div>
  //       <img className="w-4 absolute top-1" src={spinner} />
  //     </div>
  //   );
  // }

  return (
    <div>
      {workout.exercises.length > 0 ? (
        workout.exercises.map((exercise) => (
          <div
            key={exercise.exerciseId}
            className="flex flex-col bg-white shadow-md rounded-md p-4 mb-8 dark:bg-[#10192E] dark:shadow-slate-800"
          >
            <div className="flex justify-between border-b-2 items-center mb-2 pb-2">
              <input
                className="text-xl font-semibold text-center mr-2 dark:text-white dark:bg-transparent "
                type="text"
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseNameChange(exercise.exerciseId, e.target.value)
                }
              />
              <button
                className="text-white text-xs py-1 px-2 rounded-md bg-[#191C29] hover:bg-[#2f354d] font-bold focus:outline-none  focus:ring-opacity-50 disabled:bg-slate-300 dark:bg-[#0D2247] hover:dark:bg-[#122e60] dark:disabled:bg-slate-500 disabled:cursor-not-allowed"
                onClick={() => handleDeleteExercise(exercise)}
              >
                <FontAwesomeIcon className="text-xs" icon={faTrashCan} />
              </button>
            </div>
            <div className="mb-2">
              <span className="ml-[18%] font-semibold text-sm dark:text-white">
                Reps
              </span>
              <span className="ml-[20%] font-semibold text-sm dark:text-white">
                Weight
              </span>
            </div>
            {exercise.sets.map((set) => (
              <div
                key={set.setId}
                className="mb-2 flex justify-evenly relative border-b-2 pb-4 pt-2"
              >
                <input
                  className="font-semibold border-2 ml-4 text-sm text-center w-12 py-1 mx-2 placeholder:text-gray-700 border-gray-300 focus:outline-none  focus:border-gray-300 dark:placeholder:text-gray-500 dark:text-white dark:bg-slate-700"
                  type="number"
                  value={set.reps}
                  min={0}
                  onChange={(e) => {
                    handleSetChange(
                      exercise.exerciseId,
                      set.setId,
                      "reps",
                      parseInt(e.target.value)
                    );
                  }}
                />
                <input
                  className="font-semibold border-2 ml-4 text-sm text-center w-12 mx-2 py-1 placeholder:text-gray-700 border-gray-300 focus:outline-none  focus:border-gray-300 dark:placeholder:text-gray-500 dark:text-white dark:bg-slate-700"
                  type="number"
                  value={set.weight}
                  min={0}
                  onChange={(e) => {
                    handleSetChange(
                      exercise.exerciseId,
                      set.setId,
                      "weight",
                      parseInt(e.target.value)
                    );
                  }}
                />
                <button
                  className="ml-4"
                  onClick={() => {
                    handleDeleteSet(exercise.exerciseId, set.setId);
                  }}
                >
                  <FontAwesomeIcon
                    className="text-sm dark:text-white"
                    icon={faTrashCan}
                  />
                </button>
              </div>
            ))}
            <button
              className="w-6 mt-4 self-center rounded-md text-center text-white  bg-[#191C29] hover:bg-[#2f354d] font-bold focus:outline-none  focus:ring-opacity-50 disabled:bg-slate-300 dark:bg-[#0D2247] hover:dark:bg-[#122e60] dark:disabled:bg-slate-500 disabled:cursor-not-allowed"
              onClick={() => {
                handleAddSet(exercise.exerciseId);
              }}
            >
              +
            </button>
          </div>
        ))
      ) : (
        <p className="dark:text-white">No exercises available</p>
      )}
      {isChanged && (
        <button
          onClick={() => saveWorkoutToDB(workout)}
          className="bg-green-500 py-4 px-2 text-xl"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

ExerciseList.propTypes = {
  workoutId: PropTypes.string.isRequired,
};
