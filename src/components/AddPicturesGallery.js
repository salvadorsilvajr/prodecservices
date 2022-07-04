import React, { useRef, useState } from "react";
import { storage } from "../firebase/firebaseConfig";
// import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Form, Image, Button, Row, Col } from "react-bootstrap";
import ProfilePic from "../images/profile.jpg";
// import { useHistory } from "react-router-dom";
// import { ContextTheme } from "../context/ContextTheme";
// import { db } from "../firebase/firebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
import Message from "./Message";
// import { async, base64 } from "@firebase/util";

const AddPictureProfile = ({ setUrls }) => {
    // const { user } = useContext(ContextTheme);

    const myPic = useRef();
    const [previews, setPreviews] = useState("");
    const [progress, setProgress] = useState(0);
    // const [urls, setUrls] = useState("");
    const [files, setFiles] = useState([]);

    // const history = useHistory();

    const [message, setMessage] = useState(null);

    const handleUploadgallery = async (e) => {
        e.preventDefault();

        files.map((image) => {
            const metadata = {
                contenType: "image/*",
            };
            const storageRef = ref(storage, `galleryImages/${image.name}`);
            const uploadTask = uploadBytesResumable(
                storageRef,
                image,
                metadata
            );

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
                async () => {
                    // Upload completed successfully, now we can get the download URL
                    await getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setUrls((prevState) =>
                                setUrls([...prevState, downloadURL])
                            );
                        }
                    );
                }
            );
        });
    };

    return (
        <>
            <h2>Agrgar Fotos a Galleria</h2>
            <Form>
                <Row className='justify-content-md-center text-center'>
                    <Col xs={12} md={12}>
                        {message && (
                            <Message variant='warning' setMessage={setMessage}>
                                <h2>{message} </h2>
                            </Message>
                        )}
                        <Form.Group>
                            <Form.Label>
                                {previews ? (
                                    previews.map((preview, i) => {
                                        return (
                                            <>
                                                <Image
                                                    key={i}
                                                    fluid
                                                    // className='myfoto'
                                                    style={{
                                                        margin: ".5em",
                                                        // borderRadius: "30px",
                                                        maxHeight: "10em",
                                                        objectFit: "cover",
                                                    }}
                                                    // onClick={() => {
                                                    //     setFiles(null);
                                                    // }}
                                                    src={preview}
                                                />
                                            </>
                                        );
                                    })
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
                                multiple
                                id='file'
                                name='file'
                                onChange={(event) => {
                                    if (event.target.files.length > 3) {
                                        setMessage(
                                            "maximo 3 fotos por comentario"
                                        );
                                        setPreviews("");
                                        setFiles([]);
                                    } else {
                                        for (
                                            let i = 0;
                                            i < event.target.files.length;
                                            i++
                                        ) {
                                            const file = event.target.files[i];
                                            if (
                                                file &&
                                                file.type.substr(0, 5) ===
                                                    "image"
                                            ) {
                                                setFiles((prevState) => [
                                                    ...prevState,
                                                    file,
                                                ]);
                                            } else {
                                                setFiles((prevState) => [
                                                    ...prevState,
                                                ]);
                                            }

                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    const Base64 =
                                                        reader.result;
                                                    setPreviews((prevState) => [
                                                        ...prevState,
                                                        Base64,
                                                    ]);
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                setPreviews((prevState) => [
                                                    ...prevState,
                                                ]);
                                            }
                                        }
                                    }
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <progress value={progress} max='100' />
                        </Form.Group>
                        <Button
                            onClick={(e) => handleUploadgallery(e)}
                            variant='info'
                        >
                            Agregar Fotos a Galleria maximo 3
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddPictureProfile;
