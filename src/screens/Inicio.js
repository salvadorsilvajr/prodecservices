import React from "react";
import { Container } from "react-bootstrap";
// import logo from "../images/under.jpg";
import SocialMedia from "../components/SocialMedia";
import CarruselClientes from "../components/CarruselClientes";
import CatalagoDisplay from "../components/CatalagoDisplay";

const Inicio = () => {
    return (
        <main className='text-center'>
            <Container>
                <CatalagoDisplay />
                <CarruselClientes />
                {/* <h1 style={{ textAlign: "center" }}>Under Construction</h1>
                <Image fluid src={logo} alt='site in construction' /> */}
            </Container>
            <SocialMedia />
        </main>
    );
};

export default Inicio;
