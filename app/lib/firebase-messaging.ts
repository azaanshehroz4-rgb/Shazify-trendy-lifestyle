import { getMessaging, isSupported, getToken } from "firebase/messaging";
import app from "./firebase";

const VAPID_KEY =
  "BIQe56u9f3vQNb0ynlNihBX0xAAx0jvmxq04qInUgRRXV7qytvdE6yxU2mZKTvrCX9KVNLMr3Htgl3G61_-taaE";

export async function getFirebaseMessaging() {
  const supported = await isSupported();

  if (!supported) {
    return null;
  }

  return getMessaging(app);
}

export async function requestNotificationPermission() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!("Notification" in window)) {
    throw new Error("This browser does not support notifications.");
  }

  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    throw new Error("Firebase Messaging is not supported.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
  });

  if (!token) {
    throw new Error("Firebase notification token could not be created.");
  }

  return token;
}