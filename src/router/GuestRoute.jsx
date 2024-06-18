import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const GuestRoute = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? <Component /> : <Navigate to="/" />;
};

GuestRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default GuestRoute;
