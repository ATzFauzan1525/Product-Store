import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // If we have a token, render children, otherwise this component will unmount due to navigation
  const token = sessionStorage.getItem("adminToken");
  return token ? children : null;
}
