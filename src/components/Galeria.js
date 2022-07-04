import React, { useContext } from "react";
import { ContextTheme } from "../context/ContextTheme";
import { Image, Col } from "react-bootstrap";
import Rating from "./Rating";

const Review = ({ product }) => {
    const { catalago } = useContext(ContextTheme);
    const cursoNombre = catalago.find((r) => r.id === product.cursoId);

    return (
        <>
            <Col md={4}>
                <Image className='galeriaFoto' src={product.images} />
                <p>
                    <strong>Foto de: </strong>
                    {product.name}
                </p>
            </Col>
        </>
    );
};

export default Review;
