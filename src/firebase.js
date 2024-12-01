import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDV-aAXWi-GgUhZjc6zmGvVB_6_1SHcxvc",
    authDomain: "mymdb-dec8d.firebaseapp.com",
    projectId: "mymdb-dec8d",
    storageBucket: "mymdb-dec8d.firebasestorage.app",
    messagingSenderId: "700068392417",
    appId: "1:700068392417:web:55fb072b699e3eae8736a0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
