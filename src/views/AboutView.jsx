import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import highFiveImage from "../assets/workoutImages/good-vibes-at-gym.jpg";

export default function AboutView() {
  return (
    <div className="max-w-4xl text-white mt-8 mx-auto p-6 bg-[#395756] shadow-md rounded-md dark:bg-[#10192E]">
      <div className="flex flex-col md:flex-row mb-4">
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">About Fitness Tracker</h1>
          <h2 className="text-2xl font-semibold mb-3">
            Welcome to Fitness Tracker!
          </h2>
          <p>
            At Fitness Tracker, we believe that everyone deserves the
            opportunity to achieve their strength training goals and maintain a
            healthy lifestyle. Our app is designed to help you create
            personalized strength training routines, track your exercises, and
            monitor your progress seamlessly.
          </p>
          <div className="flex items-center mt-6 gap-5">
            <hr className="w-1/3 text-white" />
            <FontAwesomeIcon icon={faDumbbell} className="text-xl text-white" />
            <hr className="w-1/3 text-white" />
          </div>
        </div>
        <img
          src={highFiveImage}
          alt="Two girls giving high five at the gym"
          className="w-full md:w-1/2 rounded-md shadow-md mt-4 md:mt-0 md:ml-4"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-3">
        What You Can Do with Fitness Tracker
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Create Strength Training Workouts:</strong> Easily create
          custom strength training routines tailored to your fitness goals.
          Whether you&apos;re focusing on building muscle, increasing strength,
          or improving endurance, Fitness Tracker has you covered.
        </li>
        <li>
          <strong>Add Exercises:</strong> Build your workouts with a variety of
          strength training exercises. Our extensive exercise library includes
          everything from compound lifts like squats and deadlifts to isolation
          exercises like bicep curls and tricep extensions.
        </li>
        <li>
          <strong>Track Sets and Reps:</strong> Record the details of each
          exercise, including sets, reps, and weights. Keep track of your
          progress and see how much you&apos;ve improved over time.
        </li>
        <li>
          <strong>Monitor Your Progress:</strong> Stay motivated by visualizing
          your progress. Our app provides insights and trends to help you
          understand your improvements and stay on track.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">
        Why Choose Fitness Tracker?
      </h2>
      <div className="flex">
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>User-Friendly Interface:</strong> Our intuitive design makes
            it easy for you to navigate through the app and quickly access the
            features you need.
          </li>
          <li>
            <strong>Comprehensive Strength Training Features:</strong> Fitness
            Tracker offers a wide range of features that cater to all strength
            training levels. Whether you&apos;re a beginner or an experienced
            lifter, you&apos;ll find the tools you need to succeed.
          </li>
          <li>
            <strong>Customizable Workouts:</strong> Tailor your workouts to
            match your goals. Create routines that fit your schedule and adjust
            them as you progress.
          </li>
          <li>
            <strong>Progress Tracking:</strong> Keep a detailed log of your
            workouts and exercises. Track your strength gains, endurance
            improvements, and overall fitness journey.
          </li>
          <li>
            <strong>Community Support:</strong> Join a community of strength
            training enthusiasts. Share your progress, get tips, and stay
            motivated by connecting with others who are on the same journey.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Get Started Today</h2>
      <p>
        Create your account and start your strength training journey with us.
        Whether you&apos;re aiming to build muscle, increase strength, or simply
        stay active, our app is here to support you every step of the way.
      </p>
    </div>
  );
}
