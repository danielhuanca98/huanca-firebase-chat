import React from "react";

export default function RoomComponent(props) {
  return (
    <div onClick={props.onClick}>
      <h1>{props.roomName}</h1>
    </div>
  );
}
