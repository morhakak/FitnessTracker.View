import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function DashboardCard({ action, icon, text }) {
  return (
    <div
      onClick={action}
      className="p-4 h-40 w-40 flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:shadow-slate-800 rounded-md bg-[#395756]"
    >
      <FontAwesomeIcon icon={icon} className="text-5xl mb-2" />
      <p className="mt-4 text-lg text-center">{text}</p>
    </div>
  );
}

DashboardCard.propTypes = {
  action: PropTypes.func.isRequired,
  icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
};
