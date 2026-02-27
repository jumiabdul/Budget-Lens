// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0mAnKD9I0KEPFMmSkSEGV3VJhkY6_fWQ",
  authDomain: "budget-lens-a52ea.firebaseapp.com",
  projectId: "budget-lens-a52ea",
  storageBucket: "budget-lens-a52ea.firebasestorage.app",
  messagingSenderId: "1027100689924",
  appId: "1:1027100689924:web:eeba7ed080d3bef6fcd751",
  measurementId: "G-CX2V8TE46E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


