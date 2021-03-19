import React, { useEffect, useState } from "react";
import RoomComponent from "./components/RoomComponent";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

export default function AppHall() {
  const { displayName, photoURL } = firebase.auth().currentUser;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
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
    <div>
      <h1>AppHall</h1>
      <section className="welcome-section">
        <img alt={displayName} src={photoURL} />
        <h2>{displayName}</h2>
      </section>
      <section>
        {rooms &&
          rooms.map((room) => {
            return <RoomComponent key={room.roomID} roomName={room.roomName} />;
          })}
      </section>
      <button onClick={() => firebase.auth().signOut()}>SignOut</button>
    </div>
  );
}
