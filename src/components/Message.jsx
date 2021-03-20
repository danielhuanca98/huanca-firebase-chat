import React from "react";
import "./Message.sass";

export default function Message({ text }) {
  return (
    <span className="message-container">
      <p>{text}</p>
    </span>
  );
}
