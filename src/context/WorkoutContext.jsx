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
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);
  const { user, token } = useAuth();
  const [errors, setErrors] = useState([]);
  const [loader, setIsLoader] = useState({
    addWorkout: false,
    addExercise: false,
    addSet: false,
    loadWorkouts: false,
    save: false,
  });

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  const fetchWorkouts = useCallback(async () => {
    if (!token) {
      return;
    }

    if (user) {
      try {
        setIsLoader((prev) => ({ ...prev, loadWorkouts: true }));
        const url = user && user.isAdmin ? "" : "/user";
        const res = await axios.get(`${BASE_URL}/workout${url}`, {
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
      } finally {
        setIsLoader((prev) => ({ ...prev, loadWorkouts: false }));
      }
    }
  }, [token, user]);

  useEffect(() => {
    async function fetchData() {
      if (user) await fetchWorkouts();
    }
    fetchData();
  }, [user, fetchWorkouts]);

  useEffect(() => {
    if (user && state.workouts.length > 0) {
      localStorage.setItem("workouts", JSON.stringify(state.workouts));
    }
  }, [state.workouts, user]);

  const createWorkout = useCallback(
    async (name) => {
      setIsLoader((prev) => ({ ...prev, addWorkout: true }));
      const newWorkout = {
        name,
      };
      try {
        const postRes = await axios.post(`${BASE_URL}/workout`, newWorkout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (postRes.status >= 200 && postRes.status <= 300) {
          await fetchWorkouts();
        } else {
          addError(`Failed to create workout: ${postRes.data.message}`);
        }
      } catch (error) {
        addError(`Failed to save workouts: ${error.message}`);
        console.error("Failed to save workout", error);
      } finally {
        setIsLoader((prev) => ({ ...prev, addWorkout: false }));
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
        const res = await axios.delete(`${BASE_URL}/workout/${workoutId}`, {
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
          `${BASE_URL}/workout/${workoutId}/toggle-like`,
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

  const saveWorkout = useCallback(
    async (workoutId) => {
      console.log("Workouts from save workout:", state.workouts);
      const workout = state.workouts.find(
        (workout) => workout.workoutId === workoutId
      );
      if (!workout) return;

      try {
        console.log("Workout to save:", workout);
        await axios.put(`${BASE_URL}/${workoutId}`, workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        addError(`Failed to save workout: ${error.message}`);
        console.error("Failed to save workout", error);
      }
    },
    [state.workouts, token]
  );

  const saveWorkoutToDB = useCallback(
    async (workout) => {
      setIsLoader((prev) => ({ ...prev, save: true }));
      try {
        await axios.put(`${BASE_URL}/workout/${workout.workoutId}`, workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await fetchWorkouts();
      } catch (error) {
        addError(`Failed to save workout: ${error.message}`);
        console.error("Failed to save workout to DB", error);
      } finally {
        setIsLoader((prev) => ({ ...prev, save: false }));
      }
    },
    [token, fetchWorkouts]
  );

  return (
    <WorkoutContext.Provider
      value={{
        state,
        createWorkout,
        deleteWorkout,
        toggleLikeWorkout,
        saveWorkout,
        fetchWorkouts,
        saveWorkoutToDB,
        errors,
        loader,
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
