import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";

export async function logActivity(title: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    await addDoc(collection(db, "activities"), {
      title,
      userId: user?.uid || null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Activity Log Error:", error);
  }
}