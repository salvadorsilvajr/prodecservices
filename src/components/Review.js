import React, { useContext } from "react";
import { ContextTheme } from "../context/ContextTheme";
import { Card, Col } from "react-bootstrap";
import Rating from "./Rating";

const Review = ({ product }) => {
    const { catalago } = useContext(ContextTheme);
    const cursoNombre = catalago.find((r) => r.id === product.cursoId);

    return (
        <Col sm={12} md={4} style={{ width: "22em", maxWidth: "25em" }}>
            <Card className='my-3 p-3 rounded'>
                <Card.Img
                    style={{ maxHeight: "10em", width: "8em" }}
                    src={product.userImage}
                    variant='top'
                />
                <Card.Body>
                    <Card.Title as='div'>
                        <p>{product.name}</p>
                    </Card.Title>
                    <Card.Text as='div'>
                        <Rating value={product.rating} />
                    </Card.Text>
                    <Card.Text as='div'>
                        <p>{`review el: ${product.timestamp
                            .toDate()
                            .toDateString()} `}</p>
                    </Card.Text>
                    <Card.Title as='div'>
                        <p>
                            <b className='text-light'>
                                {cursoNombre.especialidad}
                            </b>
                        </p>
                    </Card.Title>
                    <Card.Text as='h5'>{product.comment}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Review;
