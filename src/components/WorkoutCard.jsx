import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useWorkouts } from "../context/WorkoutContext";

const WorkoutCard = ({ workout, onRemoveWorkout }) => {
  const navigate = useNavigate();
  const { toggleLikeWorkout } = useWorkouts();

  const handleWorkoutSelection = () => {
    console.log("workout", workout);
    navigate(`/workouts/${workout.workoutId}`);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    toggleLikeWorkout(workout.workoutId);
  };

  const handleDeleteWorkout = (e) => {
    e.stopPropagation();
    onRemoveWorkout(workout);
  };

  return (
    <div className="card-item">
      <div
        onClick={handleWorkoutSelection}
        className="flex flex-col gap-2 h-full w-full"
      >
        <p className={`text-lg font-semibold break-keep self-center`}>
          {workout.name}
        </p>
        <p className={`flex-grow break-keep self-center`}>
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-black text-4xl dark:text-white"
          />
        </p>
        <div className="flex gap-6 sm:w-full sm:justify-between">
          <p className="text-gray-500 text-[10px] italic dark:text-gray-200">
            {workout.createdAt}
          </p>
          <div className="flex self-end gap-2">
            {workout.isLiked ? (
              <FontAwesomeIcon
                icon={fasHeart}
                onClick={handleToggleLike}
                className="text-red-500 action-icon"
              />
            ) : (
              <FontAwesomeIcon
                icon={farHeart}
                onClick={handleToggleLike}
                className="action-icon"
              />
            )}
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={handleDeleteWorkout}
              className="action-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

WorkoutCard.propTypes = {
  workout: PropTypes.object.isRequired,
  onRemoveWorkout: PropTypes.func.isRequired,
};

export default WorkoutCard;
