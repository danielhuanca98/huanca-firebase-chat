import React, { useState } from "react";
import firebase from "firebase/app";

export default function ChatInput({ roomID }) {
  const db = firebase.firestore();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection(`livechat/${roomID}/messages`)
      .add({
        text: input,
      })
      .then((result) => {
        setInput("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Say something..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
