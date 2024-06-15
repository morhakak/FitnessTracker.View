import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import BASE_URL from "../appConfig";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard/users`);
      console.log("users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const deleteUser = async (userId) => {
    console.log("user", user);
    if (user && user.userId === userId) {
      toast.error("You cannot delete yourself.");
      return;
    }

    const existingUser = users.find((u) => u.userId === userId);
    console.log("user to delete:", existingUser);

    try {
      await axios.delete(`${BASE_URL}/dashboard/${userId}`);
      setUsers(users.filter((user) => user.userId !== userId));
      toast.success(`${existingUser.username} was deleted successfully`);
      await getUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <DashboardContext.Provider value={{ users, getUsers, deleteUser }}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
