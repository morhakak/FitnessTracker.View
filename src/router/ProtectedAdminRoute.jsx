import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ component: Component }) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return user && isLoggedIn && user.isAdmin ? (
    <Component />
  ) : (
    <Navigate to="/" />
  );
};

ProtectedAdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedAdminRoute;
