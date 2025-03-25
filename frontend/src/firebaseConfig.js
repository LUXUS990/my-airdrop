// Import required functions from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjee_4VyVwcZDNKytkp9Tw-ir7svr-uZU",
  authDomain: "luxus-951e1.firebaseapp.com",
  projectId: "luxus-951e1",
  storageBucket: "luxus-951e1.firebasestorage.app",
  messagingSenderId: "808691384682",
  appId: "1:808691384682:web:9c6033f03fb49e377f6513",
  measurementId: "G-R7SX33N4VF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (اختیاری، در صورت نیاز)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the initialized services for use in your project
export { app, analytics, auth };