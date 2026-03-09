import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import  api  from "@/lib/api";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();
      console.log("logging in frontend")
      
      await api.post("/auth/login", { token }, { withCredentials: true });
      localStorage.setItem("email", result.user.email);

      navigate("/");
      console.log("path changhed")
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-white p-6">

    <Card className="w-full max-w-4xl overflow-hidden shadow-xl p-0">

      <div className="grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center bg-blue-600 p-10 text-white">

          <h1 className="text-4xl font-bold mb-4">
            TechED
          </h1>

          <p className="text-lg opacity-90 mb-6">
            Your academic resource portal.
          </p>

          <blockquote className="italic opacity-80">
            "Access your Academic Question Papers in one place."
          </blockquote>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center p-10">

          <h2 className="text-2xl font-semibold mb-6">
            Sign in
          </h2>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleLogin}
          >
            Continue with Google
          </Button>

          <p className="text-xs text-gray-500 mt-4">
            Only psgtech.ac.in accounts allowed
          </p>

        </div>

      </div>

    </Card>

  </div>
);
}