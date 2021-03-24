import React from "react";
import Message from "./Message";

export default function ChatWindow({ messages, user }) {
  return (
    <>
      {messages.length > 0 &&
        messages.map((msg) => {
          const classname = msg.senderID === user ? "mine" : "their";
          return (
            <Message
              key={msg.msgID}
              text={msg.msgText}
              createdAt={msg.createdAt}
              classname={classname}
              sender={msg.senderName}
            />
          );
        })}
    </>
  );
}
