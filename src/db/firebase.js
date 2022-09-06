import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrpL-pdjFDB6NHBOdDLcWWgQn2zEGSkRA",
  authDomain: "gymbe-58652.firebaseapp.com",
  projectId: "gymbe-58652",
  storageBucket: "gymbe-58652.appspot.com",
  messagingSenderId: "268125718755",
  appId: "1:268125718755:web:f4284f09a747f9a94b9dd6",
  measurementId: "G-CXEDZ24NNF"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };