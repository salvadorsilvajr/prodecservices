// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBEcGqfw7umJPEfE7ssC-yhPJDycWvGnYU",
    authDomain: "prodecservices-8c72b.firebaseapp.com",
    projectId: "prodecservices-8c72b",
    storageBucket: "prodecservices-8c72b.appspot.com",
    messagingSenderId: "326022186501",
    appId: "1:326022186501:web:7271bf79004a4d4a667e6c",
    measurementId: "G-K32C7S96DQ",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };

    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});
