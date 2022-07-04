import React from "react";
import { Carousel, Container, Image } from "react-bootstrap";

const CarruselClientes = () => {
    return (
        <Container fluid>
            <h2 className='my-3'>Nuestros Clientes</h2>

            <Carousel variant='dark'>
                <Carousel.Item>
                    <div
                        style={{
                            height: "7em",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/dif.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/enalte.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/fermont.jpg'
                            alt='First slide'
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        style={{
                            height: "7em",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/udm.png'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/aguaydrenaje.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/gobierno.png'
                            alt='First slide'
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        style={{
                            height: "7em",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/pqmty.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/uanl.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/whirlpool.png'
                            alt='First slide'
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        style={{
                            height: "7em",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/cronite.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/gpoenlaces.jpg'
                            alt='First slide'
                        />
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/safe.jpg'
                            alt='First slide'
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        style={{
                            height: "7em",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Image
                            fluid
                            style={{ objectFit: "contain", maxHeight: "5em" }}
                            className=' mx-4 carimg'
                            src='../images/vant.png'
                            alt='First slide'
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default CarruselClientes;
