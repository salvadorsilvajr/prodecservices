import React, { useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "react-bootstrap";

const ReactNotificationComponent = ({ title, body }) => {
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);

    return (
        <>
            <ToastContainer className='p-3' position='top-end'>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img
                            src='holder.js/20x20?text=%20'
                            className='rounded me-2'
                            alt=''
                        />
                        <strong className='me-auto'>{title}</strong>
                        <small>just Now</small>
                    </Toast.Header>
                    <Toast.Body>{body}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default ReactNotificationComponent;
