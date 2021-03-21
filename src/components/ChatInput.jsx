import React, { useState } from "react";
import firebase from "firebase/app";
import send from "../images/send.svg";
import "./ChatInput.sass";

export default function ChatInput({ roomID, user }) {
  const db = firebase.firestore();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") return;

    db.collection(`livechat/${roomID}/messages`)
      .add({
        text: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        senderID: user,
      })
      .then((result) => {
        setInput("");
      });
  };

  return (
    <form className="submit-form" onSubmit={handleSubmit}>
      <input
        className="input-form"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Say something..."
      />
      <button className="button-form" type="submit">
        <img className="send-icon" alt="enviar" src={send} />
      </button>
    </form>
  );
}
