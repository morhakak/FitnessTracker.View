import { useContext, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { DashboardContext } from "../context/DashboardContext";

export default function Initializer() {
  const { getToken } = useAuth();
  const { getUsers } = useContext(DashboardContext);

  useEffect(() => {
    getToken();
    getUsers();
  }, []);

  return null;
}
