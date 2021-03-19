import React from "react";

export default function ChatWindow({ messages }) {
  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg) => {
          return <div key={msg.msgID}>{msg.msgText}</div>;
        })}
    </div>
  );
}
