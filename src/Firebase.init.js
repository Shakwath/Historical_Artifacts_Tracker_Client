
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUusrfn_WE--KO24YogyGvhHYo1q2coYc",
  authDomain: "simple-firebase-fe002.firebaseapp.com",
  projectId: "simple-firebase-fe002",
  storageBucket: "simple-firebase-fe002.firebasestorage.app",
  messagingSenderId: "94842440169",
  appId: "1:94842440169:web:e834195593605d136fa378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;