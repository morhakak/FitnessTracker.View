import { useState, useEffect } from "react";
import WorkoutCard from "../components/WorkoutCard";
import { useWorkouts } from "../context/WorkoutContext";
import CreateWorkoutForm from "../components/CreateWorkoutForm";
import { toast, Toaster } from "sonner";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function WorkoutsView() {
  const { state, updateWorkout, fetchWorkouts, errors, deleteWorkout } =
    useWorkouts();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  useEffect(() => {
    async function fetch() {
      await fetchWorkouts();
      if (state.workouts.length > 0) {
        toast.message("Workouts loaded successfully");
      }
    }
    fetch();
  }, [fetchWorkouts]);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors[0]);
    }
  }, [errors]);

  const handleToggleLiked = (id) => {
    let updatedWorkout = state.workouts.find(
      (workout) => workout.workoutId === id
    );
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

  const sortedWorkouts = [...state.workouts].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Toaster richColors position="top-right" />
      <CreateWorkoutForm />
      <div className="justify-start grid grid-cols-2 px-4 gap-4 mt-8 mb-6 sm:grid-cols-2 md:grid-cols-3">
        {sortedWorkouts.length > 0 && errors.length === 0 ? (
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
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md w-96"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="flex justify-end">
            <button
              className=" px-4 py-2"
              onClick={() => setModalIsOpen(false)}
            >
              X
            </button>
          </div>
          <h2 className="text-lg text-center font-semibold">
            Delete {workoutToDelete?.name}?
          </h2>

          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Cancle
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
