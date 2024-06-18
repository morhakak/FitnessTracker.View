import { useState, useEffect, useCallback, useRef } from "react";
import { useWorkouts } from "../../context/WorkoutContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";

export default function ExercisesList({ workoutId }) {
  const { state, saveWorkoutToDB } = useWorkouts();
  const [isChanged, setIsChanged] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [exerciseName, setExerciseName] = useState("");
  const originalWorkoutRef = useRef(null);

  useEffect(() => {
    const existingWorkout = state.workouts.find(
      (workout) => workout.workoutId === workoutId
    );

    setWorkout({ ...existingWorkout });
    originalWorkoutRef.current = { ...existingWorkout };
  }, [state.workouts, workoutId]);

  const handleDiscardChanges = () => {
    setWorkout({ ...originalWorkoutRef.current });
    setIsChanged(false);
  };

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

  const handleDeleteExercise = useCallback((exerciseId) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.filter(
        (exercise) => exercise.exerciseId !== exerciseId
      );
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  }, []);

  const handleAddExercise = useCallback(
    (e) => {
      e.preventDefault();
      setWorkout((prevWorkout) => {
        const newExercise = {
          exerciseId: Date.now().toString() + "temp",
          name: exerciseName,
          sets: [],
          workoutId: workoutId,
        };
        return {
          ...prevWorkout,
          exercises: [...prevWorkout.exercises, newExercise],
        };
      });
      setExerciseName("");
      setIsChanged(true);
    },
    [workoutId, exerciseName]
  );

  if (!workout) {
    return null;
  }

  return (
    <>
      <div className="max-w-md mx-auto mb-10 relative">
        <form
          onSubmit={handleAddExercise}
          className="text-white shadow-md rounded-md p-6 bg-[#395756] dark:bg-[#10192E] dark:shadow-slate-800"
        >
          <h2 className="text-xl text-center font-semibold mb-4 dark:text-white">
            Add New Exercise
          </h2>
          <div className="flex items-center mb-4">
            <input
              className="flex-1 border bg-[#395756] text-white placeholder:text-gray-300 border-gray-300 px-4 py-2 rounded-md mr-4 outline-none focus:shadow-md dark:text-white  dark:placeholder:text-gray-500 dark:bg-slate-700"
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              placeholder="Exercise Name"
              required
            />
            <button
              type="submit"
              disabled={!exerciseName}
              className="px-2 bg-[#191C29] outline-style: solid bg-transparent border-2 hover:bg-white hover:text-[#395756] dark:hover:bg-white dark:hover:text-[#122e60]  text-white text-xl rounded-md transition duration-300  disabled:bg-slate-300 dark:bg-[#0D2247] hover:dark:bg-[#122e60] dark:disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:text-white"
            >
              +
            </button>
          </div>
        </form>
      </div>
      <div>
        {workout.exercises.length > 0 ? (
          workout.exercises.map((exercise) => (
            <div
              key={exercise.exerciseId}
              className="flex flex-col bg-[#395756] shadow-md rounded-md p-4 mb-8 dark:bg-[#10192E] dark:shadow-slate-800"
            >
              <div className="flex justify-between border-b-2 items-center mb-2 pb-2">
                <input
                  className="text-xl font-semibold bg-[#395756] text-center mr-2 text-white dark:bg-transparent "
                  type="text"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseNameChange(
                      exercise.exerciseId,
                      e.target.value
                    )
                  }
                />
                <button
                  className="text-white text-xs py-1 px-2 rounded-md bg-[#191C29] hover:bg-[#2f354d] font-bold focus:outline-none  focus:ring-opacity-50 disabled:bg-slate-300 dark:bg-[#0D2247] hover:dark:bg-[#122e60] dark:disabled:bg-slate-500 disabled:cursor-not-allowed"
                  onClick={() => handleDeleteExercise(exercise.exerciseId)}
                >
                  <FontAwesomeIcon
                    className="text-xs text-white"
                    icon={faTrashCan}
                  />
                </button>
              </div>
              <div className="mb-2">
                <span className="ml-[18%] font-semibold text-sm text-white">
                  Reps
                </span>
                <span className="ml-[20%] font-semibold text-sm text-white">
                  <FontAwesomeIcon icon={faWeightHanging} /> (Kg)
                </span>
              </div>
              {exercise.sets.map((set) => (
                <div
                  key={set.setId}
                  className="mb-2 flex justify-evenly relative border-b-2 pb-4 pt-2"
                >
                  <input
                    className="font-semibold bg-[#395756] text-white border-2 ml-4 text-sm text-center w-12 py-1 mx-2 placeholder:text-gray-700 border-gray-300 focus:outline-none  focus:border-gray-300 dark:placeholder:text-gray-500 dark:text-white dark:bg-slate-700"
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
                    className="font-semibold border-2 bg-[#395756] text-white ml-4 text-sm text-center w-12 mx-2 py-1 placeholder:text-gray-700 border-gray-300 focus:outline-none  focus:border-gray-300 dark:placeholder:text-gray-500 dark:text-white dark:bg-slate-700"
                    type="number"
                    value={set.weight}
                    min="0"
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
                      className="text-sm text-white"
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
          <p className="dark:text-white text-center font-semibold">
            No exercises available
          </p>
        )}
        {isChanged && (
          <div className="bg-[#395756] text-white shadow-md rounded-md p-4 flex justify-center items-center mb-8 sticky right-20.5 bottom-6 sm:right-[8rem] sm:bottom-6 dark:bg-[#10192E] dark:shadow-slate-800">
            <button
              onClick={() => {
                saveWorkoutToDB(workout);
                setIsChanged(false);
              }}
              className="bg-green-500 text-sm text-white hover:text-white mr-2 hover:bg-green-300 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
            >
              Save
            </button>
            <button
              onClick={handleDiscardChanges}
              className="bg-red-500 text-sm hover:bg-red-300 text-white hover:text-white  font-semibold py-1 px-4 border border-gray-400 rounded shadow"
            >
              Discard
            </button>
          </div>
        )}
      </div>
    </>
  );
}

ExercisesList.propTypes = {
  workoutId: PropTypes.string.isRequired,
};
