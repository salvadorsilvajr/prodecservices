// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEcGqfw7umJPEfE7ssC-yhPJDycWvGnYU",
    authDomain: "prodecservices-8c72b.firebaseapp.com",
    databaseURL: "https://prodecservices-8c72b-default-rtdb.firebaseio.com",
    projectId: "prodecservices-8c72b",
    storageBucket: "prodecservices-8c72b.appspot.com",
    messagingSenderId: "326022186501",
    appId: "1:326022186501:web:7271bf79004a4d4a667e6c",
    measurementId: "G-K32C7S96DQ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const auth = getAuth(app);

const db = getFirestore(app);

const messaging = getMessaging(app);
// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = REACT_APP_VAPID_KEY;

// export const getToken = async (setTokenFound) => {
//     let currentToken = "";

//     try {
//       currentToken = await messaging.getToken({ vapidKey: publicKey });
//       if (currentToken) {
//         setTokenFound(true);
//       } else {
//         setTokenFound(false);
//       }
//     } catch (error) {
//       console.log("An error occurred while retrieving token. ", error);
//     }

//     return currentToken;
//   };
// const messaging = getMessaging();
// getToken(messaging, {
//     vapidKey:
//         "BABG8iQFlAdNYh6jeVsb06dvO_5lgZlA3RN_BjDfzs8eLulgZG-ZI256QYBWf18p9U0XVi2qptLlFp3B9G7NAKo",
// })
//     .then((currentToken) => {
//         if (currentToken) {
//             console.log(currentToken);
//             // Send the token to your server and update the UI if necessary
//             // ...
//         } else {
//             // Show permission request UI
//             console.log(
//                 "No registration token available. Request permission to generate one."
//             );
//             // ...
//         }
//     })
//     .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//         // ...
//     });

export { db, storage, auth, messaging };
