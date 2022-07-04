import React, { useState } from "react";
import styled from "styled-components";
import theme from "../styles/Theme";
import { Offcanvas, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";

const Menu = () => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Menudiv variant='primary' onClick={handleShow}>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Menuh5>menu</Menuh5>
            </Menudiv>

            <Offcanvas
                styled={{ innerWidth: "300px" }}
                placement={"end"}
                show={show}
                onHide={handleClose}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Opciones</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Menuul>
                        {/* <Menulink onClick={handleClose} to='Login'>
                            <Menuli>Login</Menuli>
                        </Menulink> */}
                        <Menuli
                            onClick={() => {
                                setShow(false);
                                history.push("/InfoPrices");
                            }}
                        >
                            Info & Precios
                        </Menuli>
                        <Menuli
                            onClick={() => {
                                setShow(false);
                                history.push("/QuienesSomos");
                            }}
                        >
                            Quienes Somos
                        </Menuli>
                        <Menuli
                            onClick={() => {
                                setShow(false);
                                history.push("/Testimonios");
                            }}
                        >
                            Testimonios
                        </Menuli>
                        <Menuli
                            onClick={() => {
                                setShow(false);
                                history.push("/GaleriaFotos");
                            }}
                        >
                            Galeria de Fotos
                        </Menuli>
                    </Menuul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

const Menuh5 = styled.h5`
    @media (max-width: ${theme.mobile}) {
        display: none;
    }
`;
const Menudiv = styled.div`
    background: ${theme.colors.primary};
    color: #fff;
    padding: 0.2em;
    border-radius: 5px;
`;
const Menuul = styled.ul`
    color: #fff;
    border-radius: 5px;
`;
// const Menulink = styled(Link)`
//     text-decoration: none;
// `;
const Menuli = styled.li`
    background: ${theme.colors.primary};
    color: #fff;
    padding: 0.7em;
    margin: 0.5em 0;
    border-radius: 10px;
    &:hover {
        font-size: 1.1em;
        color: #000;
        opacity: 0.8;
        background-color: #acd2b0;
    }
`;

export default Menu;
