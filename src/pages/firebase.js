import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp({
  apiKey: "AIzaSyDevBj_u15SDtLWjCizwXl1eVc2DAtim7Q",
  authDomain: "mcmoddedbingo.firebaseapp.com",
  projectId: "mcmoddedbingo",
  storageBucket: "mcmoddedbingo.appspot.com",
  messagingSenderId: "166088447660",
  appId: "1:166088447660:web:12189fa02b4caa3e997109",
  measurementId: "G-BZZY6TXGND"
});

export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
