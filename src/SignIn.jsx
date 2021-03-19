import firebase from "firebase/app";

export default function SignIn() {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => console.log(res));
  };

  return (
    <div>
      Sign with <button onClick={googleSignIn}>Google</button>
    </div>
  );
}
