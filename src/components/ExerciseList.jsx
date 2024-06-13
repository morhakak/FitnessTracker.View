import { useState, useEffect } from "react";
import { useWorkouts } from "../context/WorkoutContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import spinner from "../assets/spinner.gif";
import { toast } from "sonner";

export default function ExerciseList({ workoutId }) {
  const {
    state,
    addSet,
    deleteSet,
    deleteExercise,
    updateExerciseInDB,
    saveWorkoutToDB,
  } = useWorkouts();

  const [localWorkout, setLocalWorkout] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isSetChanged, setIsSetChanged] = useState({});
  const [originalSets, setOriginalSets] = useState({});
  const [originalWorkout, setOriginalWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const workout = state.workouts.find(
      (workout) => workout.workoutId === workoutId
    );
    setLocalWorkout(workout);
    setOriginalWorkout(JSON.parse(JSON.stringify(workout)));
  }, [state.workouts, workoutId]);

  const handleExerciseNameChange = (exerciseId, name) => {
    setLocalWorkout((prevWorkout) => {
      const updatedExercises = prevWorkout.exercises.map((exercise) =>
        exercise.exerciseId === exerciseId ? { ...exercise, name } : exercise
      );
      return { ...prevWorkout, exercises: updatedExercises };
    });
    setIsChanged(true);
  };

  const saveOriginalSet = (setId, set) => {
    setOriginalSets((prevOriginalSets) => ({
      ...prevOriginalSets,
      [setId]: { ...set },
    }));
    setIsSetChanged((prevIsSetChanged) => ({
      ...prevIsSetChanged,
      [setId]: true,
    }));
  };

  const handleSetChange = (exerciseId, setId, field, value) => {
    const currentSet = localWorkout.exercises
      .flatMap((exercise) => exercise.sets)
      .find((set) => set.setId === setId);
    if (!originalSets[setId]) {
      saveOriginalSet(setId, currentSet);
    }

    setLocalWorkout((prevWorkout) => {
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
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const promises = localWorkout.exercises.map((exercise) =>
        updateExerciseInDB(exercise.exerciseId, exercise)
      );
      await Promise.all(promises);

      await saveWorkoutToDB(localWorkout);
      toast.success("Workout was saved successfully!");
    } catch (error) {
      toast.error("Failed to save workout", error);
      console.error("Failed to save workout", error);
    } finally {
      setIsLoading(false);
      setIsChanged(false);
    }
  };

  const handleDiscard = () => {
    setLocalWorkout(JSON.parse(JSON.stringify(originalWorkout)));
    setIsChanged(false);
  };

  const handleDeleteExericse = (exercise) => {
    deleteExercise(exercise.exerciseId);
    toast.message(`Exercise ${exercise.name} was deleted`);
  };

  if (!localWorkout) {
    return null;
  }

  if (!localWorkout && isLoading) {
    return (
      <div>
        <img className="w-4 absolute top-1" src={spinner} />
      </div>
    );
  }

  return (
    <div>
      {localWorkout.exercises.length > 0 ? (
        localWorkout.exercises.map((exercise) => (
          <div
            key={exercise.exerciseId}
            className="flex flex-col bg-white shadow-md rounded-md p-4 mb-8 dark:bg-blue-950 dark:shadow-slate-800"
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
                className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md hover:bg-blue-300"
                onClick={() => handleDeleteExericse(exercise)}
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
                  className="font-semibold border-2 ml-4 text-sm text-center w-10 mx-2 focus:outline-none dark:text-white dark:bg-transparent "
                  type="number"
                  value={set.reps}
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
                  className="font-semibold border-2 text-sm text-center w-10 mx-2 focus:outline-none dark:text-white dark:bg-transparent "
                  type="number"
                  value={set.weight}
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
                    deleteSet(set.setId);
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
              className="w-6 mt-4 self-center bg-blue-500 rounded-md text-center text-white hover:bg-blue-300"
              onClick={() => {
                addSet(workoutId, exercise.exerciseId);
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
        <div className="flex justify-between mt-4">
          <button
            className="w-[48%] py-2 px-2 bg-green-500 rounded-md text-center text-white hover:bg-green-300"
            onClick={handleSave}
          >
            {isLoading && (
              <img className="w-6 absolute top-[0.5rem] left-3" src={spinner} />
            )}
            Save Changes
          </button>
          <button
            className="w-[48%] py-2 px-2 bg-red-500 rounded-md text-center text-white hover:bg-red-300"
            onClick={handleDiscard}
          >
            Discard Changes
          </button>
        </div>
      )}
    </div>
  );
}

ExerciseList.propTypes = {
  workoutId: PropTypes.string.isRequired,
};
