import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount and storage changes
    const checkAuth = () => {
      const token = sessionStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login", { replace: true });
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (tab switching, logout in another tab)
    window.addEventListener("storage", checkAuth);

    // Listen for page refresh/close
    const handleBeforeUnload = () => {
      // Optionally clear session on page close for security
      // sessionStorage.removeItem("adminToken");
      // sessionStorage.removeItem("adminUser");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 dark:border-blue-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memuat...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
}

