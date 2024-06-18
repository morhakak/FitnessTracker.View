import { useAuth } from "../../context/AuthContext";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {user && <Breadcrumbs />}
      <main className="px-4 pb-4 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
