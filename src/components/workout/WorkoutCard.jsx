import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useWorkouts } from "../../context/WorkoutContext";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";

const WorkoutCard = ({ workout, onRemoveWorkout }) => {
  const { users } = useDashboard();
  const { user } = useAuth();
  const [userToDisplay, setUserToDisplay] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      const user = users.find((u) => u.userId === workout.userId);
      setUserToDisplay(user);
    }
  }, [users, workout.userId]);

  const navigate = useNavigate();
  const { toggleLikeWorkout } = useWorkouts();

  const handleWorkoutSelection = () => {
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

  const firstLetterToUpperCase = (string) => {
    if (string)
      return string[0]?.toUpperCase() + string?.slice(1).toLowerCase();
  };

  const formattedDate = format(new Date(workout.createdAt), "dd-MM-yyyy HH:mm");

  return (
    <div className="card-item">
      <div
        onClick={handleWorkoutSelection}
        className="card-content flex flex-col gap-2 h-full w-full"
      >
        {user && user.isAdmin && (
          <span className="absolute text-xs bg-white text-black rounded-full font-semibold px-2 bottom-5">
            {firstLetterToUpperCase(userToDisplay?.userName)}
          </span>
        )}
        <p
          className={`text-lg flex-grow  font-semibold break-keep self-center`}
        >
          {workout.name}
        </p>
        <div className="flex gap-6 sm:w-full sm:justify-between">
          <p className="text-gray-200 text-[10px] italic dark:text-gray-200">
            {formattedDate}
          </p>
          <div className="flex self-end gap-2">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={handleDeleteWorkout}
              className="action-icon"
            />
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
