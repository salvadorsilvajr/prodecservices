import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, setMessage }) => {
    const [showAlert, setShowAlert] = useState(true);

    // On componentDidMount set the timer
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAlert(false);
            setMessage("");
        }, 3000);

        return () => {
            clearTimeout(timeId);
        };
    }, [setMessage]);

    // If show is false the component will return null and stop here
    if (!showAlert) {
        return null;
    }

    return (
        <Alert className='my-1' variant={variant}>
            {children}
        </Alert>
    );
};

Message.defaultProps = {
    variant: "info",
};

export default Message;
