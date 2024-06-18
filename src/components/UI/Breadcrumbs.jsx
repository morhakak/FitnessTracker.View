import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";

  function firstLetterToUpperCase(string) {
    if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      if (array.length > 1)
        return (
          <div className="flex items-center" key={crumb}>
            <Link
              to={currentLink}
              className="dark:text-gray-300 text-[#395756] hover:text-gray-500"
            >
              {crumb.includes("user")
                ? "User Managament"
                : firstLetterToUpperCase(crumb)}
            </Link>
            {index < array.length - 1 && (
              <span className="mx-2 text-gray-400">&gt;</span>
            )}
          </div>
        );
    });

  return <div className="max-w-4xl ml-4 my-5 flex ">{crumbs}</div>;
}
