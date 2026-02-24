import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCUFEAMGk2t_RgJh4p__Hy2HEbD0a7vmg",
  authDomain: "college-archive-a0f78.firebaseapp.com",
  projectId: "college-archive-a0f78",
  storageBucket: "college-archive-a0f78.firebasestorage.app",
  messagingSenderId: "129712294024",
  appId: "1:129712294024:web:f4d6f6077ad47172de773d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);