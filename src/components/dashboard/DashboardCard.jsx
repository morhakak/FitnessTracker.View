import PropTypes from "prop-types";

export default function DashboardCard({ action, children }) {
  return (
    <div
      onClick={action}
      className={` p-4 h-40 w-40 flex flex-col text-white justify-center items-center shadow-lg  hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-[#10192E] dark:shadow-slate-800 rounded-md bg-[#395756] ${
        action ? "hover:cursor-pointer" : ""
      }`}
    >
      {children}
    </div>
  );
}

DashboardCard.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
};
