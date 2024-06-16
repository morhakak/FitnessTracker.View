import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faMagnifyingGlass,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { useWorkouts } from "../context/WorkoutContext";
import { useState, useEffect } from "react";

const WorkoutFilter = ({
  searchTerm,
  setSearchTerm,
  showLikedOnly,
  setShowLikedOnly,
  sortOption,
  setSortOption,
}) => {
  const { state } = useWorkouts();
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (state.workouts.length == 0) return;
    {
      setHasLiked(state.workouts.filter((w) => w.isLiked).length > 0);
    }
  }, [state.workouts]);

  return (
    <div className="relative flex justify-center text-white w-[25rem] rounded-md py-[10px] bg-[#395756] shadow-sm dark:bg-[#10192E] mt-4">
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-[0.3rem] border text-sm bg-[#395756] border-gray-300 placeholder:text-gray-300 placeholder:text-sm rounded-md pl-6 dark:bg-slate-700 focus:outline-none"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute top-[18px] left-[1.3rem] dark:text-slate-900"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border text-sm bg-[#395756] border-gray-300 rounded-md mx-2 pl-6 pr-2 focus:outline-none dark:bg-slate-700"
      >
        <option value="aToZ">A-Z</option>
        <option value="zToA">Z-A</option>
        <option value="createdDate">Created Date</option>
      </select>
      <FontAwesomeIcon
        icon={faArrowUpAZ}
        className="absolute top-[18px] left-[13.5rem] dark:text-slate-900"
      />
      <button
        disabled={!hasLiked}
        onClick={() => setShowLikedOnly((prev) => !prev)}
        className="flex items-center ml-2 disabled:cursor-not-allowed"
      >
        {showLikedOnly ? (
          <FontAwesomeIcon icon={fasHeart} className="text-red-500 text-xl" />
        ) : (
          <FontAwesomeIcon
            icon={farHeart}
            className="dark:text-white text-xl"
          />
        )}
      </button>
    </div>
  );
};

WorkoutFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  showLikedOnly: PropTypes.bool.isRequired,
  setShowLikedOnly: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
};

export default WorkoutFilter;
