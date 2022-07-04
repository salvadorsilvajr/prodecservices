import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
// import styled from "styled-components";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    // collection,
    // addDoc,
    setDoc,
    serverTimestamp,
    doc,
    getDoc,
} from "firebase/firestore";

import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import profilePic from "../images/imagehere.png";
import Message from "../components/Message";
import { Container, Form, Col, Row, Button, Image } from "react-bootstrap";
import { ContextTheme } from "../context/ContextTheme";
import { useEffect } from "react";

const CrearCuenta = ({ location, match }) => {
    const id = match.params.id;

    // const docRef = doc(db, "catalago", id);
    // getDoc(docRef).then((doc) => {
    //     // setUserRole(doc.data().userRol);
    //     console.log(doc.data().especialidad);
    // });

    const { categorias } = useContext(ContextTheme);

    const [especialidad, setEspecialidad] = useState("");
    const [especialidad1, setEspecialidad1] = useState("");
    const [categoria, setCategoria] = useState("");
    const [duracion, setDuracion] = useState(1);
    const [dirigido, setDirigido] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [urlImage, setUrlImage] = useState("../images/imagehere.png");
    const [file, setFile] = useState("");
    const [message, setMessage] = useState(null);
    // const [profilePic, setProfilePic] = useState(ProfilePic);

    const myPic = useRef();

    const history = useHistory();

    // *********** lo que sigue **************
    // traer el curso y fijar los valores en la forma
    useEffect(() => {
        const docRef = doc(db, "catalago", id);
        getDoc(docRef).then((doc) => {
            setCategoria(doc.data().categoria);
            setEspecialidad(doc.data().especialidad);
            setDuracion(doc.data().duracion);
            setDirigido(doc.data().dirigido);
            setObjetivo(doc.data().objetivo);
            setUrlImage(doc.data().url);
            // setUrlImage(null);
            // console.log(doc.data());
        });
    }, [id]);

    // const redirect = location.search ? location.search.split("=")[1] : "/";

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage("Actualizando Curso ... !");
        // if (preview === null) {
        //     setUrlImage(urlImage);
        // }
        // const archivo = collection(db, "catalago");
        const payload = {
            especialidad,
            categoria: categoria.toUpperCase(),
            duracion,
            dirigido,
            objetivo,
            url: urlImage,
            rating: 0,
            numReviews: 0,
            timestamp: serverTimestamp(),
        };
        await setDoc(doc(db, "catalago", id), payload)
            // await addDoc(archivo, payload)
            .then(() => {
                console.log("New Vendor added it correclty...");
            })
            .catch((err) => {
                console.log("something when Wrong...");
                console.log(err);
            });
        setEspecialidad("");
        setCategoria("");
        setDuracion(1);
        setDirigido("");
        setObjetivo("");
        setUrlImage("");
        setCategoria("");
        setPreview("");
        setProgress(0);
        history.push("/admin/Catalago");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const metadata = {
            contenType: "image/*",
        };
        const storageRef = ref(storage, `cursosImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        break;

                    // ...

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrlImage(downloadURL);
                });
            }
        );
    };

    return (
        <Container>
            <Link className='btn btn-light my-3' to='/admin/Catalago'>
                Go Back
            </Link>
            <Row className='justify-content-md-center text-center'>
                <Col xs={12} md={12} xl={8}>
                    <h2 className='my-3 titlecategoria'>Cambios en Cuenta</h2>

                    {message && (
                        <Message setMessage={setMessage} variant='warning'>
                            {message}
                        </Message>
                    )}
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>
                                {preview ? (
                                    <Image
                                        fluid
                                        // className='myfoto'
                                        style={{
                                            borderRadius: "30px",
                                            maxHeight: "7em",
                                            objectFit: "cover",
                                        }}
                                        onClick={() => {
                                            setFile(null);
                                        }}
                                        src={preview}
                                    />
                                ) : (
                                    <Button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            myPic.current.click();
                                        }}
                                        // id='propic'
                                    >
                                        <Image
                                            style={{
                                                maxHeight: "7em",
                                                objectFit: "cover",
                                            }}
                                            fluid
                                            // src={profilePic}
                                            src={urlImage}
                                            alt=''
                                        />
                                    </Button>
                                )}
                            </Form.Label>
                            <Form.Control
                                ref={myPic}
                                accept='image/*'
                                style={{ display: "none" }}
                                type='file'
                                id='file'
                                name='file'
                                onChange={(event) => {
                                    const file = event.target.files[0];

                                    if (
                                        file &&
                                        file.type.substr(0, 5) === "image"
                                    ) {
                                        setFile(file);
                                    } else {
                                        setFile(null);
                                    }
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            const Base64 = reader.result;
                                            setPreview(Base64);
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        setPreview(null);
                                    }
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <progress value={progress} max='100' />
                        </Form.Group>
                        <Button onClick={(e) => handleUpload(e)} variant='info'>
                            Add Picture
                        </Button>

                        <Form.Group>
                            <Row style={{ padding: "2em 0" }}>
                                <Col>
                                    <Form.Label htmlFor='categoria'>
                                        categoria
                                    </Form.Label>
                                    <Form.Select
                                        required
                                        value={categoria}
                                        onChange={(e) =>
                                            setCategoria(e.target.value)
                                        }
                                        id='categoria'
                                    >
                                        <option> Select One</option>
                                        {categorias.map((cat) => (
                                            <option
                                                key={cat.id}
                                                value={cat.categorias}
                                            >
                                                {cat.categoria}
                                            </option>
                                        ))}
                                        Categorias
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label htmlFor='location'>
                                        Duracion
                                    </Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Curso Duracioin'
                                        value={duracion}
                                        id='duracion'
                                        onChange={(e) =>
                                            setDuracion(e.target.value)
                                        }
                                    ></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>

                        {/* <Form.Group controlId='especialidad'>
                            <Form.Label>Curso Especialidad</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Curso Especialidad'
                                value={especialidad}
                                disabled={true}
                                // onChange={(e) =>
                                //     setEspecialidad(e.target.value)
                                // }
                            ></Form.Control>
                        </Form.Group> */}
                        <Form.Group controlId='especialidad'>
                            {/* <Form.Label>Curso Especialidad</Form.Label> */}
                            <Form.Control
                                type='text'
                                placeholder='Curso Especialidad'
                                value={especialidad1}
                                onChange={(e) =>
                                    setEspecialidad1(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='dirigido'>
                            <Form.Label>Curso Dirigido a</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Curso Dirigido a:'
                                value={dirigido}
                                onChange={(e) => setDirigido(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='objetivo'>
                            <Form.Label>Objetivo de este Curso</Form.Label>
                            <Form.Control
                                style={{ height: "150px" }}
                                as='textarea'
                                type='text'
                                placeholder='Objetivo de este Curso'
                                value={objetivo}
                                onChange={(e) => setObjetivo(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            style={{ width: "100%" }}
                            className='my-4'
                            type='submit'
                            variant='primary'
                        >
                            Actualizar Curso
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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default CrearCuenta;
