import Footer from "./Footer";
import NewNavbar from "./NewNavbar";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NewNavbar />
      <main className="p-4 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
