import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();
      await api.post("/auth/login", { token }, { withCredentials: true });

      localStorage.setItem("email", result.user.email);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">

      <Card className="w-full max-w-6xl shadow-xl overflow-hidden p-0">

        <div className="grid md:grid-cols-2">

          {/* LEFT SIDE - LANDING CONTENT */}
          <div className="flex flex-col justify-center bg-blue-600 text-white p-12">

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Access All Your Academic Resources in One Place
            </h1>

            <p className="text-lg opacity-90 mb-8">
              Stop searching through WhatsApp and drives. Get organized question papers instantly.
            </p>

            {/* FEATURES */}
            <div className="space-y-4 text-sm opacity-90">
              <p>Previous year question papers</p>
              <p>Internal assessment papers</p>
              <p>Fast search & filtering</p>
              <p>Exclusive for PSG Tech students</p>
            </div>

            {/* TRUST LINE */}
            <p className="mt-10 text-xs opacity-70">
              Built for students, by students.
            </p>

          </div>

          {/* RIGHT SIDE - LOGIN CTA */}
          <div className="flex flex-col justify-center p-12">

            <h2 className="text-3xl font-semibold mb-4">
              Welcome to TechED
            </h2>

            <p className="text-gray-500 mb-8">
              Sign in to continue
            </p>

            <Button
              variant="outline"
              className="w-full cursor-pointer py-6 text-base"
              onClick={handleLogin}
            >
              Continue with Google
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Only psgtech.ac.in accounts allowed
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
}