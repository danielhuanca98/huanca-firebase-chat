import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

export default function ChatComponent({ roomID }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomID === "") return;
    const db = firebase.firestore();
    db.collection(`livechat/${roomID}/messages`).onSnapshot((querySnapshot) => {
      let newMessagesArray = [];
      querySnapshot.forEach((message) => {
        newMessagesArray = [
          ...newMessagesArray,
          {
            msgID: message.id,
            msgText: message.data().text,
          },
        ];
      });
      setMessages(newMessagesArray);
    });
  }, [roomID]);

  return (
    <>
      <ChatWindow messages={messages} />
      <ChatInput roomID={roomID} />
    </>
  );
}
