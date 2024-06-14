import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpAZ,
  faMagnifyingGlass,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

const WorkoutFilter = ({
  searchTerm,
  setSearchTerm,
  showLikedOnly,
  setShowLikedOnly,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="relative flex justify-center w-[25rem] rounded-md py-[10px] bg-white shadow-sm dark:bg-[#10192E] mt-4">
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-[0.3rem] border border-gray-300  text-black placeholder:text-gray-300 placeholder:text-sm rounded-md pl-6 dark:bg-slate-700 focus:outline-none dark:text-white"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute top-[20px] left-[0.8rem] dark:text-slate-900"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border text-sm border-gray-300 rounded-md mx-2 pl-6 pr-2 focus:outline-none  text-black dark:bg-slate-700 dark:text-white"
      >
        <option value="aToZ">A-Z</option>
        <option value="zToA">Z-A</option>
        <option value="createdDate">Created Date</option>
      </select>
      <FontAwesomeIcon
        icon={faArrowUpAZ}
        className="absolute top-[20px] left-[14.7rem] dark:text-slate-900"
      />
      <div className="flex items-center space-x-2">
        {showLikedOnly ? (
          <FontAwesomeIcon
            icon={fasHeart}
            onClick={() => setShowLikedOnly((prev) => !prev)}
            className="text-red-500 text-xl cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            icon={farHeart}
            onClick={() => setShowLikedOnly((prev) => !prev)}
            className="dark:text-white text-xl cursor-pointer"
          />
        )}
      </div>
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
