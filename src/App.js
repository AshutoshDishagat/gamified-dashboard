import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { signOut } from "firebase/auth"; // ADD THIS
import './styles.css';



function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("User detected:", currentUser);
    setUser(currentUser);
    setChecking(false);
  });

  return () => unsubscribe();
}, []);


  if (checking) {
    return <h3 style={{ textAlign: "center" }}>Checking login...</h3>;
  }

  return (
    <div>
      <button onClick={() => signOut(auth)}>Force Logout</button>

      {user ? <Dashboard /> : <Login />}
    </div>
    
  );
}

export default App;
