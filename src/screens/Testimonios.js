import React, { useContext } from "react";
import { ContextTheme } from "../context/ContextTheme";
import { Container, Row } from "react-bootstrap";
import Review from "../components/Review";

const Testimonios = () => {
    const { reviews } = useContext(ContextTheme);

    return (
        <Container>
            <h2>Testimonios</h2>
            <Row style={{ justifyContent: "space-evenly" }}>
                {reviews.map((product) => {
                    return <Review key={product.id} product={product} />;
                })}
            </Row>
        </Container>
    );
};

export default Testimonios;
