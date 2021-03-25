import React, { createRef, useEffect } from "react";
import "./Message.sass";

export default function Message({ text, createdAt, classname, sender }) {
  const ref = createRef();

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const setListener = () => {
      ref.current.addEventListener("contextmenu", handleContextMenu);
    };

    setListener();
  }, []);

  return (
    <div className={`message-super-container ${classname}`}>
      <label>{sender}</label>
      <span className={`message-container ${classname}`} ref={ref}>
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
