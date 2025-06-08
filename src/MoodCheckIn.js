import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function MoodCheckIn() {
  const [emoji, setEmoji] = useState("😄");
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    const data = docSnap.data();

    const newXP = (data?.xp || 0) + 10;
    const newStreak = (data?.streak || 0) + 1;

    await updateDoc(userRef, {
      lastCheckIn: {
        emoji,
        text,
        date: new Date().toISOString()
      },
      xp: newXP,
      level: Math.floor(newXP / 100) + 1,
      streak: newStreak
    });

    alert("Mood check-in submitted!");
    setText(""); // reset input
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>How are you feeling today?</h3>

      <div className="mood-buttons">
  {["😄", "🙂", "😐", "😢", "😠"].map((e) => (
    <button key={e} onClick={() => setEmoji(e)}>
      {e}
    </button>
  ))}
</div>


      <textarea
        placeholder="Write something..."
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "80%", marginBottom: "10px" }}
      />

      <br />
      <button onClick={handleSubmit}>Submit Mood</button>
    </div>
  );
}

export default MoodCheckIn;
