// import firebase from "firebase/app";
import "firebase/messaging";
import { onMessage, getMessaging } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//     apiKey: "AIzaSyC0TUPbsoOBuqHopvF2iZeNElQMchaKaKA",
//     authDomain: "prodecservices-practice.firebaseapp.com",
//     databaseURL: "https://prodecservices-practice-default-rtdb.firebaseio.com",
//     projectId: "prodecservices-practice",
//     storageBucket: "prodecservices-practice.appspot.com",
//     messagingSenderId: "464205726682",
//     appId: "1:464205726682:web:8a2d1682b6ae4fc4d0b6e3",
//     measurementId: "G-DMP0LFSCMQ",
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
const messaging = getMessaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
    let currentToken = "";

    try {
        currentToken = await messaging.getToken({ vapidKey: publicKey });
        if (currentToken) {
            console.log(currentToken);
            // setTokenFound(true);
        } else {
            // setTokenFound(false);
            console.log("some error");
        }
    } catch (error) {
        console.log("An error occurred while retrieving token. ", error);
    }

    return currentToken;
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage((payload) => {
            resolve(payload);
        });
    });
