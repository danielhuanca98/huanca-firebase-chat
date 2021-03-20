import firebase from "firebase/app";
import logo from "./images/logo.svg";
import google from "./images/google.svg";
import "./SignIn.sass";

export default function SignIn() {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => console.log(res));
  };

  return (
    <div className="signin-container">
      <img className="logo" alt="huanca chat" src={logo} />
      <div className="welcome-container">
        <p className="bem-vindo" style={{ fontWeight: "bold" }}>
          Bem vindo
        </p>
        <p className="faca-login">faça login para entrar</p>
      </div>
      <button className="signin-button" onClick={googleSignIn}>
        <img className="google-icon" alt="sign in with google" src={google} />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
