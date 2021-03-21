import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import ChatWindow from "./ChatWindow";

export default function ChatComponent({ roomID, user }) {
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

  useEffect(() => {
    if (roomID === "") return;
    const db = firebase.firestore();
    const messagesCollectionRef = db
      .collection(`livechat/${roomID}/messages`)
      .orderBy("createdAt")
      .limit(50);
    messagesCollectionRef.onSnapshot((querySnapshot) => {
      let newMessagesArray = [];
      querySnapshot.forEach((message) => {
        const messageData = message.data();
        newMessagesArray = [
          ...newMessagesArray,
          {
            msgID: message.id,
            senderID: messageData.senderID
              ? messageData.senderID
              : "odz5xdB7IqaFESEzAivs54Lce1l1",
            msgText: messageData.text,
            createdAt: messageData.createdAt,
          },
        ];
      });
      const changes = querySnapshot.docChanges();
      if (changes[0] && changes[0].doc.data().createdAt === null) return;
      setMessages(newMessagesArray);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });
  }, [roomID]);

  return (
    <>
      <ChatWindow messages={messages} user={user} />
      <span ref={dummy} />
    </>
  );
}
