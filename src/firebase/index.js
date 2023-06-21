import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI7UW249Ccw2KURsG2Ffve7iR2iIsnL_w",
  authDomain: "stdio-crm.firebaseapp.com",
  projectId: "stdio-crm",
  storageBucket: "stdio-crm.appspot.com",
  messagingSenderId: "232273655162",
  appId: "1:232273655162:web:a15ca94ed66c442c4312c3",
  measurementId: "G-BB5MW9RPQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const timestamp = serverTimestamp();

export { app, db, timestamp };
