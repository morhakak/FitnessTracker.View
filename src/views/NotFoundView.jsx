import { Link } from "react-router-dom";
import notFoundImg from "../assets/404_page_not_found.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const NotFoundView = () => {
  return (
    <div className="w-full flex h-[350px] mt-2 flex-col justify-center items-center">
      <img className="w-80" src={notFoundImg} alt="404 page not found" />
      <div className="flex flex-col gap-2">
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link
          to="/workouts"
          className="text-white text-center py-2 rounded-md bg-[#395756] hover:bg-[#4f7977] dark:bg-[#10192E] dark:hover:bg-[#20325c] dark:shadow-lg"
        >
          <FontAwesomeIcon className="mr-2" icon={faDumbbell} />
          Go To Workouts
          <FontAwesomeIcon className="ml-2" icon={faDumbbell} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;
