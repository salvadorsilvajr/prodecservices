import React from "react";
import { Container } from "react-bootstrap";
import quiensomos from "../data/quiensomos";
import InfoSomos from "../components/InfoSomos";

const QuienesSomos = () => {
    return (
        <Container>
            <h2 className='p-3'>Quienes Somos</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {quiensomos.map((product) => {
                    return <InfoSomos key={product.id} product={product} />;
                })}
            </div>
            <h4 className='p-3 text-center'>
                Experiencia en impartición de cursos desde: 1999-2022
            </h4>
        </Container>
    );
};

export default QuienesSomos;
