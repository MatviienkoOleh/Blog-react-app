import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { IContext } from "./interface/global";
import { getDatabase, ref, set, onValue, push, remove , update} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCfPkdxVoXFcAYPcUjwt8yUMFfB9L0k514",
  authDomain: "blog-new-project.firebaseapp.com",
  projectId: "blog-new-project",
  storageBucket: "blog-new-project.appspot.com",
  messagingSenderId: "786806925626",
  appId: "1:786806925626:web:78d9593003d3e00d00c803",
};

const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export const value: IContext = {
  auth,
  provider,
  db,
  ref,
  set,
  onValue,
  push,
  remove,
  update
};
