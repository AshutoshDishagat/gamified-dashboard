// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAZiThsF4BZJSmVSuLV86cxhExwinOnuJw",
  authDomain: "gamified-dashboard-905ff.firebaseapp.com",
  projectId: "gamified-dashboard-905ff",
  storageBucket: "gamified-dashboard-905ff.firebasestorage.app",
  messagingSenderId: "79499313434",
  appId: "1:79499313434:web:240793503c10aaa7372ca3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);  // ✅ ADD THIS LINE

export { auth, provider, db };