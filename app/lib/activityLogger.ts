import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function logActivity(title: string) {
  try {
    await addDoc(collection(db, "activities"), {
      title,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Activity Log Error:", error);
  }
}