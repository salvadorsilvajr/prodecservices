import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import Message from "../components/Message";

const InfoPrices = () => {
    const [message, setMessage] = useState(null);
    const [name, setName] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [puesto, setPuesto] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [idtoken, setIdtoken] = useState(
        "c2iIhlxkl5VQ-1M-IXTlNt:APA91bH-t6ZkNPeqAanIXkS0ez-Q14_pxEVYC-O9pMxGRsSUPnERep59c-zNvrnU6mK6X6UqGWav2UzH0rba9IlBn5nw0UYsxxJTyNsTdTSTmjoIOZyZqzkwJ_Sglr06e9JwcBuNsUhm"
    );

    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(
            "enviando... Alguien de nuestro Equipo se comunicara a la brevedad posible "
        );
    };

    const sendNotification = () => {
        console.log("send notification");
        let body = {
            to: idtoken,
            notification: {
                title: `${name} solicita informacion`,
                body: `TELEFONO: ${telefono} PUESTO: ${puesto}  EMAiL: ${email}`,

                // mutable_content: true,
                // sound: "Tri-tone",
                click_action: "https://www.google.com/",
            },
        };

        const authorization = process.env.REACT_APP_AUTH;
        console.log(authorization);
        let options = {
            method: "POST",
            headers: new Headers({
                Authorization: authorization,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(body),
        };
        fetch("https://fcm.googleapis.com/fcm/send", options)
            .then((res) => {
                console.log(res);
                console.log("SENDED IT");
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <Row className='justify-content-md-center text-center'>
                {message && (
                    <Message setMessage={setMessage} variant='warning'>
                        {message}
                    </Message>
                )}

                <Col xs={12} md={6}>
                    <h2>Solicitar mas Informacion</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                id='name'
                                type='text'
                                required={true}
                                placeholder='Tu Nombre'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre de tu Empresa</Form.Label>
                            <Form.Control
                                id='empresa'
                                type='text'
                                required={true}
                                placeholder='El Nombre ... SA de CV'
                                value={empresa}
                                onChange={(e) => setEmpresa(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cargo o Puesto</Form.Label>
                            <Form.Control
                                id='puesto'
                                type='text'
                                required={true}
                                placeholder='Gerente de ...'
                                value={puesto}
                                onChange={(e) => setPuesto(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control
                                id='email'
                                type='email'
                                required={true}
                                placeholder='micorreo@gmail.com...'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                id='telefono'
                                type='text'
                                required={true}
                                placeholder='Numero de Telefono'
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            style={{ width: "100%" }}
                            className='my-4'
                            // type='submit'
                            onClick={sendNotification}
                            variant='primary'
                        >
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default InfoPrices;

// ***** irs backup code ************
//     IDME - UE3S - VILH - RSI3
// ****** irs backup code ************
