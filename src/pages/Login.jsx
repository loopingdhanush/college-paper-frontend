import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

      localStorage.setItem("token", token);
      localStorage.setItem("email", result.user.email);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
  <div className="flex min-h-screen items-center">

    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>TechED</CardTitle>
        <CardDescription className="text-black">
          Academic Resource Portal
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="outline" size="sm" className="w-full cursor-pointer mb-0" onClick={handleLogin}>
           Continue with Google
        </Button>
      </CardContent>
      
      <CardFooter> 
        <p className="text-xs">
          Only Psgtech.ac.in Accounts are allowed
        </p>
      </CardFooter>
    </Card>

  </div>
);
}