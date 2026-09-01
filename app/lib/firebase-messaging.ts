import { getMessaging, getToken, isSupported } from "firebase/messaging";

import app from "./firebase";

export async function getFirebaseMessaging() {
  const supported = await isSupported();

  if (!supported) {
    return null;
  }

  return getMessaging(app);
}

export async function requestNotificationPermission() {
  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    throw new Error("Firebase Messaging is not supported in this browser.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const token = await getToken(messaging, {
    vapidKey: "PASTE_YOUR_VAPID_PUBLIC_KEY_HERE",
  });

  if (!token) {
    throw new Error("FCM token could not be generated.");
  }

  return token;
}