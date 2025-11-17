// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBouU3GWyLEvW7q06J0tHBf8YOCl-8j6O8",
    authDomain: "forex-competition.firebaseapp.com",
    projectId: "forex-competition",
    storageBucket: "forex-competition.firebasestorage.app",
    messagingSenderId: "437797548011",
    appId: "1:437797548011:web:724135a8550adcc15173ae",
    measurementId: "G-EDPX9YBTC8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };