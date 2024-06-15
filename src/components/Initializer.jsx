import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Initializer() {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken();
  }, []);

  return null;
}
