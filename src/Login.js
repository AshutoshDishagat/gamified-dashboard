import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Login() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // New user – create with default XP/streak
        await setDoc(userRef, {
          name: user.displayName,
          xp: 0,
          level: 1,
          streak: 0,
          lastCheckIn: null
        });
        console.log("New user added to Firestore");
      } else {
        console.log("User already exists in Firestore");
      }

      alert("Login Successful!");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Gamified Dashboard</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
