import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import WelcomeView from "../views/WelcomeView";

const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn, user, isLoading } = useAuth();
  if (isLoading) return <Component />;

  return user && isLoggedIn ? <Component /> : <WelcomeView />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
