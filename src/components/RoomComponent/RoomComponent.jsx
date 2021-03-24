import React from "react";
import "./RoomComponent.sass";

export default function RoomComponent(props) {
  return (
    <div
      className={`room-container ${props.active ? "active" : ""}`}
      onClick={props.onClick}
    >
      <h1>{props.roomName}</h1>
    </div>
  );
}
