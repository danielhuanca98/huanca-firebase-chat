import React from "react";
import "./Message.sass";

export default function Message({ text, createdAt, classname }) {
  return (
    <span className={`message-container ${classname}`}>
      <p>{text}</p>
      {createdAt && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "1rem",
            fontSize: "0.7rem",
          }}
        >
          {createdAt.toDate().getHours()}:{createdAt.toDate().getMinutes()}
        </span>
      )}
    </span>
  );
}
