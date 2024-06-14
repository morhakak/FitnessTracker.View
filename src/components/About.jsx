import image from "../assets/workoutImages/cables.jpg";

export default function About() {
  return (
    <div className="max-w-4xl mt-8 mx-auto p-6 bg-white shadow-md rounded-md dark:bg-[#10192E] dark:text-white">
      <div className="flex mb-4">
        <div className="flex flex-col ">
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
        </div>
        <img
          src={image}
          alt="A guy working out"
          className="w-full md:w-1/2 rounded-md shadow-md ml-2"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-3">
        What You Can Do with Fitness Tracker
      </h2>
      <ul className="list-disc list-inside mb-4">
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
      <ul className="list-disc list-inside mb-4">
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
          <strong>Customizable Workouts:</strong> Tailor your workouts to match
          your goals. Create routines that fit your schedule and adjust them as
          you progress.
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

      <h2 className="text-2xl font-semibold mb-3">Get Started Today</h2>
      <p>
        Download Fitness Tracker and start your strength training journey with
        us. Whether you&apos;re aiming to build muscle, increase strength, or
        simply stay active, our app is here to support you every step of the
        way.
      </p>
    </div>
  );
}
