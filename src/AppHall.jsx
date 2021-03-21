import React, { useEffect, useState } from "react";
import RoomComponent from "./components/RoomComponent";
import ChatComponent from "./components/ChatComponent";
import firebase from "firebase/app";
import "firebase/firestore";
import logo from "./images/logo.svg";
import "./AppHall.sass";
import ChatInput from "./components/ChatInput";

export default function AppHall() {
  const { displayName, photoURL, uid } = firebase.auth().currentUser;
  const [rooms, setRooms] = useState([]);
  const [activeRoomID, setActiveRoomID] = useState("");

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("livechat").onSnapshot((querySnapshot) => {
      let newRoomsArray = [];
      querySnapshot.forEach((doc) => {
        newRoomsArray = [
          ...newRoomsArray,
          {
            roomName: doc.data().roomName,
            roomID: doc.id,
          },
        ];
      });
      setRooms(newRoomsArray);
    });
  }, []);

  return (
    <div className="app-container">
      <header>
        <img className="logo" src={logo} alt="huanca chat" />
        <p className="logout" onClick={() => firebase.auth().signOut()}>
          SignOut
        </p>
      </header>
      <div className="app-content">
        <nav className="rooms-container">
          {rooms &&
            rooms.map((room) => {
              return (
                <RoomComponent
                  key={room.roomID}
                  roomName={room.roomName}
                  onClick={() => setActiveRoomID(room.roomID)}
                />
              );
            })}
        </nav>
        <section className="chat-section">
          <div className="chat-container">
            <ChatComponent roomID={activeRoomID} user={uid} />
          </div>
          <div className="input-container">
            <ChatInput roomID={activeRoomID} user={uid} />
          </div>
        </section>
      </div>
    </div>
  );
}
