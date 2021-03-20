import firebase from "firebase/app";
import "./App.sass";
import "firebase/auth";
import { useState } from "react";
import AppHall from "./AppHall";
import SignIn from "./SignIn";
import loading from "./images/loading.svg";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
  return (
    <div className="splash-container">
      <img className="splash-svg" alt="loading" src={loading} />
    </div>
  );
}

export default App;
