import { Link } from "react-router-dom";
import image from "../assets/workoutImages/athlete-with-trx.jpg";
import { Helmet } from "react-helmet-async";

export default function WelcomeView() {
  return (
    <>
      <Helmet>
        <title>Welcome - Fitness Tracker</title>
      </Helmet>
      <div className="flex items-center justify-center sm:h-[400px] mt-6 bg-gray-100 dark:bg-[#0a0f1d]">
        <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col md:flex-row md:max-w-4xl w-full m-4">
          <div className="md:w-1/2 w-full ">
            <img
              src={image}
              alt="Fitness illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full p-8 flex flex-col items-center justify-center dark:bg-[#191C29]">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-center">
              Welcome to{" "}
              <span className="text-[#395756] dark:text-[#1e2e55]">
                Fitness
              </span>{" "}
              <span className="text-[#395756] dark:text-[#1e2e55]">
                Tracker
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl mb-6 dark:text-gray-300 text-center">
              Achieve your strength training goals with ease.
            </h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <Link
                to="/register"
                className="relative inline-block px-4 py-2 font-medium text-lg text-white group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-gray-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-2 border-gray-500"></span>
                <span className="relative">Register</span>
              </Link>
              <Link
                to="/login"
                className="relative inline-block px-4 py-2 font-medium text-lg text-white group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-[#395756] dark:bg-[#1e2e55] group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-2 border-[#395756] dark:border-[#1e2e55]"></span>
                <span className="relative">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
