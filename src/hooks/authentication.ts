import { User } from "../models/User";
import { atom, useRecoilState } from "recoil";
import firebase from "firebase/app";
import { useEffect } from "react";

const userState = atom<User>({
  key: "user",
  default: null,
});

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState);

  async function createUserIfNotFound(user: User) {
    const userRef = firebase.firestore().collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (doc.exists) {
      return;
    }
    await userRef.set({
      name: "taro" + new Date().getTime(),
    });
  }

  useEffect(() => {
    if (user !== null) {
      return;
    }
    console.log("Start useEffect");
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        console.log(error);
      });

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonumous: firebaseUser.isAnonymous,
          name: "",
        };
        console.log("Set user");
        setUser(loginUser);
        createUserIfNotFound(loginUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return { user };
}
