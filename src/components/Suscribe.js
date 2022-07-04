import React from "react";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
// import firebase from "firebase/app";
import "firebase/messaging";
import { Toast } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";
// import { getToken } from "../firebase/firebaseInit";
// import { onMessage } from "firebase/messaging";
import { getToken, getMessaging } from "firebase/messaging";
// import { messaging } from "../firebase/firebaseConfig";

const Suscribe = ({ token, setToken, setTokenFound }) => {
    // const { REACT_APP_VAPID_KEY } = process.env;

    const publicKey = process.env.REACT_APP_VAPID_KEY;

    const messaging = getMessaging();

    const SuscribeUser = async () => {
        await getToken(messaging, { vapidKey: publicKey })
            .then((currentToken) => {
                if (currentToken) {
                    setToken(currentToken);
                    setTokenFound(true);
                    localStorage.setItem("userToken", currentToken);
                    const auth = getAuth();
                    // if (auth.currentUser !== null) {
                    //     setUserId(auth.currentUser.uid);
                    // } else {
                    //     setUserId(null);
                    // }
                    // const userId = auth.currentUser.uid;
                    let userId = "";
                    {
                        auth.currentUser
                            ? (userId = auth.currentUser.uid)
                            : (userId = null);
                    }
                    const payload = {
                        userId,
                        noticationToken: currentToken,
                        timestamp: serverTimestamp(),
                    };
                    // console.log(payload);
                    try {
                        addDoc(collection(db, "notifications"), payload).then(
                            () => {
                                console.log("ok");
                            }
                        );
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("some error");
                }
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    return (
        // <>
        //     <div style={{ border: "1px solid red", width: "60%" }}>
        //         <h1>You want to suscribe for Notifications</h1>
        //         <button onClick={SuscribeUser}>Suscribe</button>
        //     </div>
        // </>
        <>
            <ToastContainer className='p-3' position='top-end'>
                <Toast>
                    <Toast.Header>
                        <img
                            src='holder.js/20x20?text=%20'
                            className='rounded me-2'
                            alt=''
                        />
                        <strong className='me-auto'>
                            You want to suscribe for Notifications
                        </strong>
                        {/* <small>just Now</small> */}
                    </Toast.Header>
                    <Toast.Body>
                        <button onClick={SuscribeUser}>Suscribe</button>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default Suscribe;
