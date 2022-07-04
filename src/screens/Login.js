import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Message from "../components/Message";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

const Login = ({ location }) => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const [message, setMessage] = useState(null);
    // const redirect = location.search ? location.search.split("=")[1] : "/";
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                history.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("CODE" + errorCode, "  MENSAGE " + errorMessage);
                setMessage(errorMessage);
            });
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
                    <Loginh2>Log In</Loginh2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
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

                        <Button
                            style={{ width: "100%" }}
                            className='my-4'
                            type='submit'
                            variant='primary'
                        >
                            Submit
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
                                New Customer ?{" "}
                                <Link to='/register'>Register</Link>
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
// const Loginspan = styled.span`
//     border: solid 1px black;
//     border-radius: 5px;
//     padding: 0.2em;
//     margin: 1em 2em;
//     cursor: pointer;
//     &:hover {
//         color: red;
//     }
// `;

export default Login;
