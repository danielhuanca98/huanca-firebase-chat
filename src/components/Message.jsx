import React from "react";
import "./Message.sass";

export default function Message({ text, createdAt, classname, sender }) {
  return (
    <div className={`message-super-container ${classname}`}>
      <label>{sender}</label>
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
    </div>
  );
}
