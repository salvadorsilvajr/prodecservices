import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import styled from "styled-components";
import {
    getAuth,
    updateProfile,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
// import { storage } from "../firebase/firebaseConfig";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { signOut } from "firebase/auth";
// import ProfilePic from "../images/profile.jpg";
import Message from "../components/Message";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

const Login = ({ location }) => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [name, setName] = useState("");
    // const [showLog, setShowLog] = useState(false);
    // const [preview, setPreview] = useState("");
    // const [progress, setProgress] = useState(0);
    const [urlImage, setUrlImage] = useState(null);
    // const [file, setFile] = useState("");
    const [message, setMessage] = useState(null);
    const history = useHistory();

    // const myPic = useRef();

    // const redirect = location.search ? location.search.split("=")[1] : "/";

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setMessage("Passwords do not Match");
        } else {
            try {
                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                // const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name,
                    userRol: 0,
                });
                // const newUser = collection(db, "users");
                const payload = {
                    email: userCredential.user.email,
                    password: userCredential.user.reloadUserInfo.passwordHash,
                    name: name,
                    userImage: urlImage,
                    token: userCredential.user.accessToken,
                    verEmail: userCredential.user.emailVerified,
                    userId: userCredential.user.uid,
                    userRol: 0,
                    timestamp: serverTimestamp(),
                };
                setDoc(doc(db, "users", userCredential.user.uid), payload)
                    .then(() => {
                        setMessage("New User added it correclty...");
                    })
                    .catch((err) => {
                        setMessage("something when Wrong...");
                        console.log(err);
                    });
                setEmail("");
                setpassword("");
                setpassword2("");
                setName("");
                // setPreview("");
                setUrlImage("");
                // setFile("");
                history.push("/");
            } catch (error) {
                console.error(error);
            }

            // const auth = getAuth();
            // await createUserWithEmailAndPassword(auth, email, password);
            // updateProfile(auth.currentUser, {
            //     displayName: name,
            // })
            //     .then((userCredential) => {
            //         const newUser = collection(db, "users");
            //         const payload = {
            //             email: userCredential.user.email,
            //             password:
            //                 userCredential.user.reloadUserInfo.passwordHash,
            //             name: name,
            //             userImage: urlImage,
            //             token: userCredential.user.accessToken,
            //             verEmail: userCredential.user.emailVerified,
            //             userId: userCredential.user.uid,
            //             userRol: 0,
            //             timestamp: serverTimestamp(),
            //         };

            //         addDoc(newUser, payload)
            //             .then(() => {
            //                 setMessage("New User added it correclty...");
            //             })
            //             .catch((err) => {
            //                 setMessage("something when Wrong...");
            //                 console.log(err);
            //             });
            //         setEmail("");
            //         setpassword("");
            //         setpassword2("");
            //         setName("");
            //         // setPreview("");
            //         setUrlImage("");
            //         // setFile("");
            //     })
            //     .catch((error) => {
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         console.log(
            //             "CODE" + errorCode,
            //             "  MENSAGE " + errorMessage
            //         );
            //         setMessage(errorMessage);
            //         // ..
            //     });
        }
    };

    // const SignInGoogleHandle = async () => {
    //     const google_provider = new GoogleAuthProvider();
    //     await signInWithPopup(auth, google_provider)
    //         .then((re) => {
    //             console.log(re);
    //             setEmail(re.user.email);
    //             setName(re.user.displayName);
    //             setUserImage(re.user.photoURL);
    //             setVerEmail(re.user.emailVerified);
    //             setToken(re.user.accessToken);
    //             setUserId(re.user.uid);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    // const SignInFacebookHandle = () => {
    //     const provider = new FacebookAuthProvider();
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             console.log(result);
    //             // const user = result.user;
    //             const credential =
    //                 FacebookAuthProvider.credentialFromResult(result);
    //             console.log(credential);
    //             // const accessToken = credential.accessToken;
    //             // setEmail(re.user.email);
    //             // setName(re.user.displayName);
    //             // setUserImage(re.user.photoURL);
    //             // setVerEmail(re.user.emailVerified);
    //             // setToken(re.user.accessToken);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.email;
    //             // The AuthCredential type that was used.
    //             const credential =
    //                 FacebookAuthProvider.credentialFromError(error);
    //             console.log(errorCode, errorMessage, email, credential);
    //         });
    // };

    return (
        <Container>
            <Row className='justify-content-md-center text-center'>
                {message && (
                    <Message setMessage={setMessage} variant='warning'>
                        {message}
                    </Message>
                )}

                <Col xs={12} md={6}>
                    <Loginh2>Register</Loginh2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Tu Nombre'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Tu Correo Electronico'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={password2}
                                onChange={(e) => setpassword2(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            style={{ width: "100%" }}
                            className='my-4'
                            type='submit'
                            variant='primary'
                        >
                            Enviar
                        </Button>
                    </Form>
                    <Row>
                        {/* <Col className={show}>
                            <Button onClick={SignInGoogleHandle}>
                                Sign in With Google
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={SignInFacebookHandle}>
                                Sign in With Facebook
                            </Button>
                        </Col> */}
                        {/* <Col>
                            <Button
                                onClick={signput}
                                className='my-4'
                                type='submit'
                                variant='primary'
                            >
                                Sign out
                            </Button>
                        </Col> */}
                    </Row>
                    <Row className='py-3'>
                        <Col>
                            <h2>
                                Already Customer ?{" "}
                                <Link to='/login'>Login</Link>
                            </h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

const Loginh2 = styled.h2`
    margin-top: 1em;
`;

export default Login;
