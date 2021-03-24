import React, { useEffect, useState } from "react";
import RoomComponent from "./components/RoomComponent/RoomComponent";
import ChatComponent from "./components/ChatComponent";
import Profile from "./components/Profile";
import firebase from "firebase/app";
import "firebase/firestore";
import logo from "./images/logo.svg";
import "./AppHall.sass";
import ChatInput from "./components/ChatInput";

export default function AppHall() {
  const { displayName, photoURL, uid } = firebase.auth().currentUser;
  const [rooms, setRooms] = useState([]);
  const [activeRoomID, setActiveRoomID] = useState("");
  const [myRoomID, setMyRoomID] = useState("");

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("livechat").onSnapshot((querySnapshot) => {
      let newRoomsArray = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().ownerID === uid) setMyRoomID(uid);
        newRoomsArray = [
          ...newRoomsArray,
          {
            roomName: doc.data().roomName,
            roomID: doc.id,
            ownerID: doc.data().ownerID ? doc.data().ownerID : "",
          },
        ];
      });
      setRooms(newRoomsArray);
    });
  }, []);

  const openMyRoom = () => {
    const db = firebase.firestore();
    console.log("opening my room");
    db.collection("livechat")
      .add({ roomName: displayName, ownerID: uid })
      .then((res) => {
        setMyRoomID(res.id);
      });
  };

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
          <Profile name={displayName} photo={photoURL} />
          {rooms &&
            rooms.map((room) => {
              return (
                <RoomComponent
                  key={room.roomID}
                  active={room.roomID === activeRoomID}
                  roomName={room.roomName}
                  onClick={() => setActiveRoomID(room.roomID)}
                />
              );
            })}
          {myRoomID.length > 0 ? (
            <></>
          ) : (
            <RoomComponent roomName="Open my Room" onClick={openMyRoom} />
          )}
        </nav>
        <section className="chat-section">
          <div className="chat-container">
            <ChatComponent roomID={activeRoomID} user={uid} />
          </div>
          <div className="input-container">
            <ChatInput
              roomID={activeRoomID}
              user={uid}
              displayName={displayName}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
