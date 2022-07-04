import React from "react";
import logo1 from "../images/school-29.svg";
import theme from "../styles/Theme";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Row, Col, Button, Image } from "react-bootstrap";

const Footer = () => {
    const history = useHistory();
    return (
        <Footerfo>
            <Row className='mx-0'>
                <Button
                    as={Col}
                    variant='primary'
                    onClick={() => {
                        history.push("/Testimonios");
                    }}
                >
                    <i className='fas fa-user'></i>
                    <Footerspan> Testimonio</Footerspan>
                </Button>

                <Button
                    as={Col}
                    variant='primary'
                    className='mx-2'
                    onClick={() => {
                        history.push("/InfoPrices");
                    }}
                >
                    <i className='fas fa-money-check-alt'></i>
                    <Footerspan> Info & Precios </Footerspan>
                </Button>

                <Button
                    as={Col}
                    variant='primary'
                    onClick={() => {
                        history.push("/GaleriaFotos");
                    }}
                >
                    <Image style={{ background: "white" }} src={logo1} />
                    <Footerspan> Galeria Fotos</Footerspan>
                </Button>
            </Row>
            <Row>
                <Footerp>
                    &copy;{new Date().getFullYear()} PRODEC & SERVICES Monterrey
                    Nuevo Leon | All Right Reserved | Privacy
                </Footerp>
            </Row>
        </Footerfo>
    );
};

const Footerfo = styled.footer`
    padding: 2em 0.5em;
    background: ${theme.colors.light};
    text-align: center;
`;

const Footerp = styled.p`
    padding-top: 1em;
`;

const Footerspan = styled.span`
    color: ${theme.colors.light};
    @media (max-width: ${theme.mobile}) {
        display: none;
    }
`;

export default Footer;
