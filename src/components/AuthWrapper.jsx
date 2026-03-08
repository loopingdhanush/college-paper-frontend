import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdmin, checkAuth } from "@/lib/auth";

export default function AuthWrapper({ children }) {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const verify = async () => {

      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      const isAdmin = await checkAdmin();

      setLoggedIn(true);
      setAdmin(isAdmin);
      setLoading(false);
    };

    verify();
  }, []);

  if (loading) return null;

  if (!loggedIn) return <Navigate to="/login" />;

  return children(admin);
}