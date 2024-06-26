import { CSSTransition, TransitionGroup } from "react-transition-group";
import UserCard from "../components/dashboard/UserCard";
import { useDashboard } from "../context/DashboardContext";
import { Helmet } from "react-helmet-async";

const UserManagement = () => {
  const { users, deleteUser } = useDashboard();

  return (
    <>
      <Helmet>
        <title>Users Managament - Fitness Tracker</title>
      </Helmet>
      <div className="w-full gap-10 mt-12 py-6 px-4 dark:text-white">
        <div className="flex flex-col justify-center items-center gap-6">
          <TransitionGroup component="div" className="flex flex-col gap-4">
            {users.map((user) => (
              <CSSTransition
                key={user.userId}
                timeout={400}
                classNames="userslist"
              >
                <UserCard userProp={user} onDeleteUser={deleteUser} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
