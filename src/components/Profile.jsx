import React from "react";
import "./Profile.sass";

export default function Profile({ name, photo }) {
  return (
    <div className="profile-container">
      <img alt={name} src={photo} />
      <h1>{name}</h1>
    </div>
  );
}
