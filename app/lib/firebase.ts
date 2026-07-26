import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDrYI21ndk-o3ArCoPdVS67aoRUweb41bY",
  authDomain: "shazify-14122.firebaseapp.com",
  projectId: "shazify-14122",
  storageBucket: "shazify-14122.firebasestorage.app",
  messagingSenderId: "577432175768",
  appId: "1:577432175768:web:4bb6f59525d42bbd483ced",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);