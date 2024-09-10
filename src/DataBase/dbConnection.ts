import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyBLK-nXQc_5MtprtV3BqN6tsw1xIE0i0A0",
    authDomain: "e-scalatt.firebaseapp.com",
    projectId: "e-scalatt",
    storageBucket: "e-scalatt.appspot.com",
    messagingSenderId: "23615083580",
    appId: "1:23615083580:web:b16399ded5b162d4c11f39",
    measurementId: "G-08W67QG2KK"
  };

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };