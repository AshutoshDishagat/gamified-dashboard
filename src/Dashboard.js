import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import MoodCheckIn from "./MoodCheckIn";


function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading Dashboard...</h3>;
  }

  if (!user || !userData) {
    return <h3 style={{ textAlign: "center" }}>Please log in to view your dashboard.</h3>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Welcome, {user.displayName}</h2>
      <p><strong>XP:</strong> {userData.xp}</p>
      <p><strong>Level:</strong> {userData.level}</p>

      <div style={{
  margin: "10px auto",
  width: "80%",
  height: "20px",
  backgroundColor: "#ddd",
  borderRadius: "10px",
  overflow: "hidden"
}}>
  <div style={{
    width: `${userData.xp % 100}%`,
    height: "100%",
    backgroundColor: "#4caf50"
  }}></div>
</div>
<p>{userData.xp % 100} / 100 XP to next level</p>

{userData.xp % 100 === 0 && userData.xp !== 0 && (
  <p style={{ color: "green", fontWeight: "bold" }}>🎉 You’ve leveled up! 🎉</p>
)}

      <p><strong>Streak:</strong> {userData.streak} day(s)</p>
      <p><strong>Last Mood Check-in:</strong> {userData.lastCheckIn ? userData.lastCheckIn.text : "No check-in yet."}</p>

        <MoodCheckIn />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
