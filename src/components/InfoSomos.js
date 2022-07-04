import React from "react";
import { Card, Col } from "react-bootstrap";

const InfoSomos = ({ product }) => {
    return (
        <Card style={{ flexDirection: "row" }} className='rounded border-0'>
            <Col md={2}>
                <Card.Img
                    style={{ maxHeight: "10em", width: "90%" }}
                    src={product.url}
                    variant='top'
                />
            </Col>
            <Col md={9}>
                <Card.Body>
                    <Card.Title as='div'>
                        <h4>{product.titulo}</h4>
                    </Card.Title>
                    {product.conceptos.map((concep) => (
                        <p key={concep.id} style={{ marginLeft: "2em" }}>
                            <strong>{concep.titulo}</strong>
                            {concep.comment}
                        </p>
                    ))}
                    <Card.Text as='div'>
                        <p>{product.descripcion}</p>
                    </Card.Text>
                    <ul>
                        {product.puntos.map((punto) => (
                            <li key={punto.id}>{punto.comment}</li>
                        ))}
                    </ul>
                </Card.Body>
            </Col>
            <Col md={2}></Col>
        </Card>
    );
};

export default InfoSomos;
