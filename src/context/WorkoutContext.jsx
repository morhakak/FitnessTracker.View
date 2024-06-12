import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "./AuthContext";
import BASE_URL from "../appConfig";

const WorkoutContext = createContext();

const initialState = {
  workouts: [],
};

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "ADD_WORKOUT":
      return { ...state, workouts: [...state.workouts, action.payload] };
    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout.workoutId !== action.payload
        ),
      };
    case "TOGGLE_LIKE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.workoutId === action.payload
            ? { ...workout, isLiked: !workout.isLiked }
            : workout
        ),
      };
    case "ADD_EXERCISE":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.workoutId === action.payload.workoutId
            ? {
                ...workout,
                exercises: [...workout.exercises, action.payload.exercise],
              }
            : workout
        ),
      };
    case "DELETE_EXERCISE":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.workoutId === action.payload.workoutId
            ? {
                ...workout,
                exercises: workout.exercises.filter(
                  (exercise) => exercise.id !== action.payload.exerciseId
                ),
              }
            : workout
        ),
      };
    case "ADD_SET":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.workoutId === action.payload.workoutId
            ? {
                ...workout,
                exercises: workout.exercises.map((exercise) =>
                  exercise.id === action.payload.exerciseId
                    ? {
                        ...exercise,
                        sets: [...exercise.sets, action.payload.set],
                      }
                    : exercise
                ),
              }
            : workout
        ),
      };
    case "DELETE_SET":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.workoutId === action.payload.workoutId
            ? {
                ...workout,
                exercises: workout.exercises.map((exercise) =>
                  exercise.id === action.payload.exerciseId
                    ? {
                        ...exercise,
                        sets: exercise.sets.filter(
                          (set) => set.id !== action.payload.setId
                        ),
                      }
                    : exercise
                ),
              }
            : workout
        ),
      };
    case "UPDATE_EXERCISE":
      console.log("Updating exercise:", action.payload); // Debug log
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.workoutId === action.payload.workoutId
            ? {
                ...workout,
                exercises: workout.exercises.map((exercise) =>
                  exercise.exerciseId === action.payload.exerciseId
                    ? { ...exercise, ...action.payload.updates }
                    : exercise
                ),
              }
            : workout
        ),
      };
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);
  const { user, token } = useAuth();
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  const fetchWorkouts = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status >= 200 && res.status <= 300) {
        dispatch({ type: "SET_WORKOUTS", payload: res.data });
      } else {
        addError(`Failed to load workouts: ${res.data.message}`);
        console.error(`Failed to load workouts. ${res.data.message}`);
      }
    } catch (error) {
      addError(`Failed to load workouts: ${error.message}`);
      console.error(`Failed to load workouts. ${error.message}`);
    }
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      if (user) await fetchWorkouts();
    }
    fetchData();
  }, [user, fetchWorkouts]);

  useEffect(() => {
    if (user && state.workouts.length > 0) {
      console.log("Saving workouts to local storage:", state.workouts);
      localStorage.setItem("workouts", JSON.stringify(state.workouts));
    }
  }, [state.workouts, user]);

  const createWorkout = useCallback(
    async (name) => {
      const newWorkout = {
        name,
      };
      try {
        const postRes = await axios.post(`${BASE_URL}`, newWorkout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (postRes.status >= 200 && postRes.status <= 300) {
          dispatch({ type: "ADD_WORKOUT", payload: postRes.data });
          await fetchWorkouts();
        } else {
          addError(`Failed to create workout: ${postRes.data.message}`);
        }
      } catch (error) {
        addError(`Failed to save workouts: ${error.message}`);
        console.error("Failed to save workout", error);
      }
    },
    [token, fetchWorkouts]
  );

  const deleteWorkout = useCallback(
    async (workoutId) => {
      if (!workoutId) {
        console.log("Exercise id is null or undefined");
      }
      try {
        const res = await axios.delete(`${BASE_URL}/${workoutId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status >= 200 && res.status <= 300) {
          await fetchWorkouts();
        } else {
          addError(`Failed to delete workout: ${res.data.message}`);
        }
      } catch (error) {
        setErrors(error, ...errors);
        addError(`Failed to delete workout: ${error.message}`);
        console.log("Failed to delete workout", error);
      }
    },
    [fetchWorkouts, token, errors]
  );

  const toggleLikeWorkout = useCallback(
    async (workoutId) => {
      try {
        const res = await axios.put(
          `${BASE_URL}/${workoutId}/toggle-like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status >= 200 && res.status <= 300) {
          await fetchWorkouts();
        } else {
          addError("Failed to toggle like");
          console.error(`Failed to toggle like. Status code: ${res.status}`);
        }
      } catch (error) {
        addError(`Failed to toggle like: ${error.message}`);
        console.error("Failed to toggle like", error);
      }
    },
    [token, fetchWorkouts]
  );

  const addExercise = useCallback(
    async (workoutId, name) => {
      const newExercise = {
        name,
      };

      try {
        const res = await axios.post(
          `${BASE_URL}/${workoutId}/add-exercise`,
          newExercise,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status >= 200 && res.status <= 300) {
          await fetchWorkouts();
        } else {
          addError(`Failed to add exercise: ${res.data.message}`);
          console.error(`Failed to add exercise. Status code: ${res.status}`);
        }
      } catch (error) {
        addError(`Failed to add exercise: ${error.message}`);
        console.log("Failed to add exercise", error);
      }
    },
    [fetchWorkouts, token]
  );

  const deleteExercise = useCallback(
    async (exerciseId) => {
      if (!exerciseId) {
        console.log("Exercise id is null or undefined");
      }
      try {
        const res = await axios.delete(`${BASE_URL}/exercise/${exerciseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status >= 200 && res.status <= 300) {
          await fetchWorkouts();
        } else {
          addError(`Failed to delete exercise: ${res.data.message}`);
        }
      } catch (error) {
        addError(`Failed to delete exercise: ${error.message}`);
        console.log("Failed to delete exercise", error);
      }
    },
    [fetchWorkouts, token]
  );

  const addSet = useCallback(
    async (workoutId, exerciseId) => {
      try {
        const res = await axios.post(
          `${BASE_URL}/exercise/add-set`,
          { workoutId, exerciseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status >= 200 && res.status <= 300) {
          await fetchWorkouts();
        } else {
          addError(`Failed to add set: ${res.data.message}`);
        }
      } catch (error) {
        addError(`Failed to add set: ${error.message}`);
        console.log("Failed to add set", error);
      }
    },
    [fetchWorkouts, token]
  );

  const deleteSet = useCallback(
    async (setId) => {
      if (!setId) {
        console.log("Set id is null or undefined");
      }
      try {
        const res = await axios.delete(
          `${BASE_URL}/exercise/delete-set/${setId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status >= 200 && res.status <= 300) {
          await fetchWorkouts();
        } else {
          addError(`Failed to delete set: ${res.data.message}`);
        }
      } catch (error) {
        addError(`Failed to delete set: ${error.message}`);
        console.log("Failed to delete set", error);
      }
    },
    [fetchWorkouts, token]
  );

  const updateExercise = useCallback((workoutId, exerciseId, updates) => {
    console.log("Updating exercise with updates:", updates); // Debug log
    dispatch({
      type: "UPDATE_EXERCISE",
      payload: { workoutId, exerciseId, updates },
    });
  }, []);

  const saveWorkout = useCallback(
    async (workoutId) => {
      console.log("Workouts from save workout:", state.workouts);
      const workout = state.workouts.find(
        (workout) => workout.workoutId === workoutId
      );
      if (!workout) return;

      try {
        console.log("Workout to save:", workout); // Debug log
        await axios.put(`${BASE_URL}/${workoutId}`, workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // await fetchWorkouts();
      } catch (error) {
        addError(`Failed to save workout: ${error.message}`);
        console.error("Failed to save workout", error);
      }
    },
    [state.workouts, token]
  );

  const updateExerciseInDB = useCallback(
    async (exerciseId, updates) => {
      console.log("Updating exercise in DB with updates:", updates); // Debug log
      try {
        await axios.put(`${BASE_URL}/exercise/${exerciseId}`, updates, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        addError(`Failed to update exercise: ${error.message}`);
        console.error("Failed to update exercise in DB", error);
      }
    },
    [token]
  );

  const saveWorkoutToDB = useCallback(
    async (workout) => {
      console.log("Saving workout to DB:", workout); // Debug log
      try {
        await axios.put(`${BASE_URL}/${workout.workoutId}`, workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        addError(`Failed to save workout: ${error.message}`);
        console.error("Failed to save workout to DB", error);
      }
    },
    [token]
  );

  return (
    <WorkoutContext.Provider
      value={{
        state,
        createWorkout,
        deleteWorkout,
        toggleLikeWorkout,
        addExercise,
        deleteExercise,
        addSet,
        deleteSet,
        updateExercise,
        saveWorkout,
        fetchWorkouts,
        saveWorkoutToDB,
        updateExerciseInDB,
        errors,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
};

WorkoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
