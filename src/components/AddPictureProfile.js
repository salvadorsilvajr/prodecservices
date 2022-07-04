import React, { useRef, useState } from "react";
import { storage } from "../firebase/firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Form, Image, Button, Row, Col } from "react-bootstrap";
import ProfilePic from "../images/profile.jpg";
import { useHistory } from "react-router-dom";
// import { ContextTheme } from "../context/ContextTheme";
import { db } from "../../src/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Message from "../components/Message";

const AddPictureProfile = () => {
    // const { user } = useContext(ContextTheme);

    const myPic = useRef();
    const [preview, setPreview] = useState("");
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState("");
    // const [urlImage, setUrlImage] = useState(user.urlImage);
    const history = useHistory();
    // const { users } = useContext(ContextTheme);

    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const [message, setMessage] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const metadata = {
            contenType: "image/*",
        };
        const storageRef = ref(storage, `userImages/${file.name}`);
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
                    // setUrlImage(downloadURL);
                    // console.log(downloadURL);
                    // setPreview(downloadURL);
                    const auth = getAuth();
                    console.log(auth);
                    // console.log(preview);
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL,
                    });
                    const updateUserImage = async () => {
                        const docRef = doc(db, "users", userId);

                        const prodPayload = {
                            userImage: downloadURL,
                        };
                        await updateDoc(docRef, prodPayload)
                            .then(() => {
                                console.log("User Image update ...");
                            })
                            .catch((err) => {
                                setMessage("Algo salio mal ...", err);
                            });
                        // setReviewstoday([]);
                    };
                    updateUserImage();

                    history.push("/");
                    window.location.reload();
                });
            }
        );
    };
    return (
        <>
            <h2>Agrgar Foto de perfil</h2>
            <Form>
                {/* {user.userImage
                    ? setUrlImage(user.userImage)
                    : setUrlImage("../images/profile.jpg")} */}
                <Row className='justify-content-md-center text-center'>
                    <Col xs={12} md={6}>
                        {message && (
                            <Message variant='warning' setMessage={setMessage}>
                                <h2>{message} </h2>
                            </Message>
                        )}
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
                                            src={ProfilePic}
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
                            Agregar Foto a tu Profile
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddPictureProfile;
