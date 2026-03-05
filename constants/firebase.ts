import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFXYOoj4aGNxPdEGnpNjFazH-fFgHeovA",
  authDomain: "sprint-45e75.firebaseapp.com",
  projectId: "sprint-45e75",
  storageBucket: "sprint-45e75.firebasestorage.app",
  messagingSenderId: "921352497206",
  appId: "1:921352497206:web:e76f5ff3120966ab829097",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
export default app;
