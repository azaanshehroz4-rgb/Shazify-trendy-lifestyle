importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDrYI21ndk-o3ArCoPdVS67aoRUweb41bY",
  authDomain: "shazify-14122.firebaseapp.com",
  projectId: "shazify-14122",
  storageBucket: "shazify-14122.firebasestorage.app",
  messagingSenderId: "577432175768",
  appId: "1:577432175768:web:4bb6f59525d42bbd483ced",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Background message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "Shazify";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "You have a new notification.",
    icon: "/favicon.ico",
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});