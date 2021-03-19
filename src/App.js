import firebase from "firebase/app";
import "./App.css";
import "firebase/auth";
import { useState } from "react";
import AppHall from "./AppHall";
import SignIn from "./SignIn";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(function (loggedUser) {
    setIsLoading(false);
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      setUser(undefined);
    }
  });

  return (
    <div className="App">
      {isLoading && <SplashScreen />}
      {user ? <AppHall /> : <SignIn />}
    </div>
  );
}

function SplashScreen() {
  return <h1>Loading</h1>;
}

export default App;
