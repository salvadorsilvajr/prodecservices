import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import imagehere from "../images/imagehere.png";

import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Col sm={12} md={4}>
            <Card
                className='my-3 p-3 rounded productCard'
                // style={{ background: "beige", minHeight: "24em" }}
            >
                <Link to={`/product/${product.id}`}>
                    <Card.Img
                        // style={{ Height: "24em" }}
                        className='displaynone, productImageCard'
                        src={product.url ? product.url : imagehere}
                        variant='top'
                    />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product.id}`}>
                        <Card.Title as='div'>
                            <p>{product.especialidad}</p>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        />
                    </Card.Text>
                    <Card.Text as='h5'>{product.duracion} hrs</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Product;
