import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrYI21ndk-o3ArCoPdVS67aoRUweb41Y",
  authDomain: "shazify-14122.firebaseapp.com",
  projectId: "shazify-14122",
  storageBucket: "shazify-14122.firebasestorage.app",
  messagingSenderId: "577432175768",
  appId: "1:577432175768:web:4bb6f59525d42bbd483ced",
};

const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;