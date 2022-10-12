import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Firebase configuration for Storage and Auth
const firebaseConfig = {
  apiKey: "AIzaSyDAbwXeZPiVyfxPA6XmQeBZ2bnu2q5mcCU",
  authDomain: "medi-web-f7b76.firebaseapp.com",
  projectId: "medi-web-f7b76",
  storageBucket: "medi-web-f7b76.appspot.com",
  messagingSenderId: "157331237700",
  appId: "1:157331237700:web:f7977924d0e34f23f54511",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { db, auth };
