// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFXYOoj4aGNxPdEGnpNjFazH-fFgHeovA",
  authDomain: "sprint-45e75.firebaseapp.com",
  projectId: "sprint-45e75",
  storageBucket: "sprint-45e75.firebasestorage.app",
  messagingSenderId: "921352497206",
  appId: "1:921352497206:web:e76f5ff3120966ab829097",
  measurementId: "G-PCE7ZE5SL0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics — only supported on web, not in React Native
let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics, app };
export default app;
