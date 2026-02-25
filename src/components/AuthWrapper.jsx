import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdmin } from "@/lib/auth";

export default function AuthWrapper({ children }) {

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      const isAdmin = await checkAdmin();
      setAdmin(isAdmin);
      setLoading(false);

    };
    verify();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return children(admin);

}