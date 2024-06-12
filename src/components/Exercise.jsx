import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPen,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useWorkouts } from "../context/WorkoutContext";
import { v4 as uuidv4 } from "uuid";

export default function Exercise({ exercise, workoutId }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newReps, setNewReps] = useState(0);
  const [newExerciseName, setNewExerciseName] = useState(exercise.name);
  const [newWeight, setNewWeight] = useState(0);
  // const { dispatch } = useWorkouts();
  const { state, updateWorkout } = useWorkouts();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const curr = state.workouts.find((w) => w.workoutId === workoutId);
    if (curr) setWorkout(curr);
  }, [workoutId, state.workouts, workout]);

  // const workout = state.workouts.find((w) => w.workoutId === workoutId);
  // console.log(workout);

  const updateWorkoutData = (updatedWorkout) => {
    updateWorkout(workoutId, updatedWorkout);
  };

  if (!exercise) {
    return <div>No exercise data available</div>;
  }

  // function addNewSet(e) {
  //   e.stopPropagation();
  //   const newSet = {
  //     reps: Number(newReps),
  //     weight: Number(newWeight),
  //     id: uuidv4(),
  //   };
  //   dispatch({
  //     type: "ADD_SET",
  //     payload: {
  //       workoutId: workoutId,
  //       exerciseId: exercise.id,
  //       newSet,
  //     },
  //   });

  //   setNewReps(0);
  //   setNewWeight(0);
  // }

  function addNewSet(e) {
    e.stopPropagation();
    if (!workout) {
      console.error(`Workout with ID ${workoutId} not found`);
      return;
    }

    const newSet = {
      setId: uuidv4(),
      reps: 0,
      weight: 0,
    };

    const updatedExercises = workout.exercises.map((ex) =>
      ex.exerciseId === exercise.exerciseId
        ? {
            ...ex,
            sets: [...ex.sets, newSet],
          }
        : ex
    );

    const updatedWorkout = { ...workout, exercises: updatedExercises };
    updateWorkoutData(updatedWorkout);
  }

  // function deleteSet(setIdx) {
  //   dispatch({
  //     type: "REMOVE_SET",
  //     payload: {
  //       workoutId: workoutId,
  //       exerciseId: exercise.id,
  //       setIdx,
  //     },
  //   });
  // }

  function deleteSet(setIdx) {
    const updatedExercises = workout.exercises.map((ex) =>
      ex.exerciseId === exercise.exerciseId
        ? {
            ...ex,
            sets: ex.sets.filter((_, idx) => idx !== setIdx),
          }
        : ex
    );
    const updatedWorkout = { ...workout, exercises: updatedExercises };
    updateWorkoutData(updatedWorkout);
  }

  // function updateSetValues(setIdx, field, value) {
  //   const updatedSet = { [field]: Number(value) };

  //   dispatch({
  //     type: "UPDATE_SET",
  //     payload: {
  //       workoutId: workoutId,
  //       exerciseId: exercise.id,
  //       setIdx,
  //       updatedSet,
  //     },
  //   });
  // }

  function updateSetValues(setIdx, field, value) {
    const updatedSet = { [field]: Number(value) };
    const updatedExercises = workout.exercises.map((ex) =>
      ex.exerciseId === exercise.exerciseId
        ? {
            ...ex,
            sets: ex.sets.map((set, idx) =>
              idx === setIdx ? { ...set, ...updatedSet } : set
            ),
          }
        : ex
    );
    const updatedWorkout = { ...workout, exercises: updatedExercises };
    updateWorkoutData(updatedWorkout);
  }

  // function updateExerciseName(value) {
  //   const updatedExercises = state.workouts.map((workout) =>
  //     workout.exercises.some((ex) => ex.id === exercise.id)
  //       ? {
  //           ...workout,
  //           exercises: workout.exercises.map((ex) =>
  //             ex.id === exercise.id ? { ...ex, name: value } : ex
  //           ),
  //         }
  //       : workout
  //   );

  //   console.log("Updated exercises:", updatedExercises); // Log the updated exercises array

  //   dispatch({
  //     type: "UPDATE_WORKOUT",
  //     payload: [...updatedExercises], // Create a new array reference
  //   });
  // }

  function updateExerciseName(value) {
    setNewExerciseName(value);
  }

  // function saveChanges() {
  //   dispatch({
  //     type: "UPDATE_EXERCISE",
  //     payload: {
  //       workoutId: workoutId,
  //       exerciseId: exercise.id,
  //       updatedExercise: {
  //         ...exercise,
  //         name: newExerciseName,
  //       },
  //     },
  //   });
  //   setIsEdit(false);
  // }

  function saveChanges() {
    const updatedExercises = workout.exercises.map((ex) =>
      ex.exerciseId === exercise.exerciseId
        ? { ...ex, name: newExerciseName }
        : ex
    );
    const updatedWorkout = { ...workout, exercises: updatedExercises };
    updateWorkoutData(updatedWorkout);
    setIsEdit(false);
  }

  return (
    <div className="rounded-t-3xl pt-[50px] relative py-4 flex flex-col items-center w-[18rem] bg-white shadow-md rounded-md text-black my-2 ">
      <div className="w-full bg-black h-10 absolute top-0 rounded-t-3xl">
        <button
          onClick={() => {
            if (isEdit) {
              saveChanges;
            } else {
              setIsEdit((prev) => !prev);
            }
          }}
          className="absolute left-[265px] top-2"
        >
          <FontAwesomeIcon
            className="text-sm text-white"
            icon={isEdit ? faFloppyDisk : faPen}
          />
        </button>
        <input
          disabled={!isEdit}
          value={newExerciseName}
          className={`font-semibold ml-[32px] focus:text-white bg-black outline-none text-xl text-center w-[14rem] border-2 text-white ${
            isEdit ? "border-black" : "border-transparent"
          }`}
          onChange={(e) => updateExerciseName(e.target.value)}
        />
      </div>
      <div>
        {exercise.sets.map((set, idx) => (
          <div
            className="max-w-max h-10 px-2 flex items-center bg-white shadow-md border border-solid text-black my-2"
            key={idx}
          >
            <div className="flex">
              <span className="font-semibold">Reps:</span>
              <input
                disabled={isEdit ? false : true}
                onChange={(e) => updateSetValues(idx, "reps", e.target.value)}
                value={set.reps}
                className={`font-semibold border-2 text-sm text-center w-10 mx-2 ${
                  isEdit ? "border-black" : "border-transparent"
                }`}
              />
              <span className="font-semibold">Weigth:</span>
              <input
                disabled={isEdit ? false : true}
                onChange={(e) => updateSetValues(idx, "weight", e.target.value)}
                value={set.weight}
                className={`font-semibold border-2 text-sm text-center w-10 mx-2 ${
                  isEdit ? "border-black" : "border-transparent"
                }`}
              />
              {isEdit ? (
                <button
                  onClick={(e) => addNewSet(e, exercise.exerciseId)}
                  className="absolute left-[265px]"
                >
                  <FontAwesomeIcon className="text-sm" icon={faCirclePlus} />
                </button>
              ) : null}
              {isEdit && (
                <button
                  onClick={() => deleteSet(idx)}
                  className="absolute left-3"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Exercise.propTypes = {
  workoutId: PropTypes.string,
  exercise: PropTypes.shape({
    exerciseId: PropTypes.string,
    name: PropTypes.string.isRequired,
    sets: PropTypes.arrayOf(
      PropTypes.shape({
        setId: PropTypes.string,
        reps: PropTypes.number.isRequired,
        weight: PropTypes.number,
      }).isRequired
    ).isRequired,
  }).isRequired,
};
