import React from "react";
import Message from "./Message";

export default function ChatWindow({ messages }) {
  return (
    <>
      {messages.length > 0 &&
        messages.map((msg) => {
          return <Message key={msg.msgID} text={msg.msgText} />;
        })}
    </>
  );
}
