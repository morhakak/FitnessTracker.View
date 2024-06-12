import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded  dark:bg-blue-950 dark:shadow-slate-700"
          onClick={() => navigate("/workouts")}
        >
          Workouts
        </button>
      </div>
    </>
  );
}
