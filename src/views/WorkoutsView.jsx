import { useState, useEffect, useContext } from "react";
import WorkoutCard from "../components/workout/WorkoutCard";
import { useWorkouts } from "../context/WorkoutContext";
import AddWorkoutForm from "../components/workout/AddWorkoutForm";
import { toast } from "sonner";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import WorkoutFilter from "../components/workout/WorkoutFilter";
import { useAuth } from "../context/AuthContext";
import spinner from "../assets/spinner.gif";
import { Helmet } from "react-helmet-async";
import { DashboardContext } from "../context/DashboardContext";

Modal.setAppElement("#root");

export default function WorkoutsView() {
  const {
    workouts,
    updateWorkout,
    fetchWorkouts,
    errors,
    deleteWorkout,
    workoutsLoading,
  } = useWorkouts();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("createdDate");
  const { user, getToken } = useAuth();
  const { usersLoading } = useContext(DashboardContext);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (workoutsLoading) {
      toast(
        <>
          <FontAwesomeIcon icon={faSpinner} className="text-md text-black " />
          <span className="text-xs font-medium text-black">
            Loading workouts
          </span>
        </>,
        { duration: 1500 }
      );
    } else if (!workoutsLoading && workouts.length > 0) {
      toast(
        <>
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-md text-green-500 "
          />
          <span className="text-xs font-medium text-black">
            Workouts Loaded successfully
          </span>
        </>,
        { duration: 1500 }
      );
    }
  }, [workoutsLoading, workouts.length]);

  useEffect(() => {
    async function fetch() {
      await fetchWorkouts();
    }
    fetch();
  }, [fetchWorkouts]);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors[0]);
    }
  }, [errors]);

  const handleToggleLiked = (id) => {
    let updatedWorkout = workouts.find((workout) => workout.workoutId === id);
    updatedWorkout = {
      ...updatedWorkout,
      isLiked: !updatedWorkout.isLiked,
      updatedAt: new Date().toISOString(),
    };
    updateWorkout(id, updatedWorkout);
  };

  const handleRemoveWorkout = (workout) => {
    console.log("Attempting to delete workout with id:", workout.workoutId);
    setWorkoutToDelete(workout);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    if (workoutToDelete) {
      console.log(
        "Confirmed delete for workout with id:",
        workoutToDelete.workoutId
      );
      deleteWorkout(workoutToDelete.workoutId);
      setModalIsOpen(false);
      toast.success("Workout deleted successfully");
    }
  };

  const filteredWorkouts =
    workouts.length > 0 &&
    workouts
      .filter((workout) =>
        workout.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((workout) => (showLikedOnly ? workout.isLiked : true));

  const sortedWorkouts =
    filteredWorkouts.length > 0 &&
    filteredWorkouts.sort((a, b) => {
      if (sortOption === "aToZ") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "zToA") {
        return b.name.localeCompare(a.name);
      } else if (sortOption === "createdDate") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return a.userId.localeCompare(b.userId);
      }
    });

  return (
    <>
      <Helmet>
        <title>Workouts - Fitness Tracker</title>
      </Helmet>
      <div className="relative flex flex-col justify-center items-center w-full h-full">
        <div className="h-[300px] bg-center flex flex-col items-center bg-[url('./assets/workoutImages/athlete-with-weights.jpg')] bg-cover w-full">
          {user && !user.isAdmin && <AddWorkoutForm />}
          <WorkoutFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showLikedOnly={showLikedOnly}
            setShowLikedOnly={setShowLikedOnly}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
        <div className="justify-start rounded-md pt-4 grid grid-cols-2 px-4 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3">
          {workoutsLoading || usersLoading ? (
            <div className="text-xl flex mt-4 dark:text-white col-span-3">
              <img src={spinner} alt="spinner" className="w-6 mr-2" />
              Loading workouts...
            </div>
          ) : sortedWorkouts.length > 0 && errors.length === 0 ? (
            sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.workoutId}
                workout={workout}
                onToggleLiked={handleToggleLiked}
                onRemoveWorkout={() => handleRemoveWorkout(workout)}
                className="flex-shrink-0"
              />
            ))
          ) : (
            <p className="text-xl mt-4 dark:text-white col-span-3">
              You don&rsquo;t have any workouts yet.
            </p>
          )}
        </div>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="h-[12rem] w-[20rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:text-white dark:bg-[#10192E] p-2 rounded shadow-md flex flex-col justify-between"
            overlayClassName="fixed inset-0 bg-black z-20 bg-opacity-50"
          >
            <div className="flex justify-end">
              <button
                className="px-2 font-bold"
                onClick={() => setModalIsOpen(false)}
              >
                X
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-center">
              <h2 className="text-center text-md px-8 mb-2">
                Delete workout{" "}
                <span className="italic">{workoutToDelete?.name}</span>
              </h2>
              <p className="text-lg text-center">Are you sure?</p>
            </div>
            <div className="flex justify-center gap-2 ">
              <button
                onClick={() => setModalIsOpen(false)}
                className="bg-blue-500 hover:bg-blue-400 dark:bg-[#0D2247] text-white px-2 py-1 rounded mt-2 text-sm dark:hover:bg-[#0E2855]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2 text-sm hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
