import React from "react";
import "./RoomComponent.sass";

export default function RoomComponent(props) {
  return (
    <div className="room-container" onClick={props.onClick}>
      <h1>{props.roomName}</h1>
    </div>
  );
}
