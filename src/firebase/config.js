import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDjQz7_gysh2QX4pw3gI3wgiDQElckj_lY",
  authDomain: "note-editor-e26e2.firebaseapp.com",
  projectId: "note-editor-e26e2",
  storageBucket: "note-editor-e26e2.appspot.com",
  messagingSenderId: "988508151831",
  appId: "1:988508151831:web:9fd61f1244b56ea15f7c52",
  measurementId: "G-Q0VW3GGE98",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const fireStore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, fireStore, timestamp };
