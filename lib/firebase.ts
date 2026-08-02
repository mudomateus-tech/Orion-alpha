import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyC_0xDKtueDj1aMMom5DETEYMdX640F2zM",

  authDomain:
    "orion-5d544.firebaseapp.com",

  databaseURL:
    "https://orion-5d544-default-rtdb.firebaseio.com",

  projectId:
    "orion-5d544",

  storageBucket:
    "orion-5d544.firebasestorage.app",

  messagingSenderId:
    "927614880728",

  appId:
    "1:927614880728:web:0fc44c2154a62d236fc0ad"

};



const app =
  initializeApp(firebaseConfig);



export const db =
  getFirestore(app);



export const auth =
  getAuth(app);