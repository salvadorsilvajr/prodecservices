import React, { useContext } from "react";
// import { db } from "../firebase/firebaseConfig";
// import styled from "styled-components";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CatalagoList from "../components/CatalagoList";
import { ContextTheme } from "../context/ContextTheme";

const Catalago = () => {
    const { categorias } = useContext(ContextTheme);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <h2 className='my-4'>Catalago de Cursos </h2>
            <Col style={{ display: "flex", justifyContent: "end" }}>
                <Link to='/admin/CrearCuenta'>
                    <Button pd='8px 12px' type='submit' hbg='#ebfbff'>
                        Agredar Un Nuevo Curso
                    </Button>
                </Link>
            </Col>
            <hr />
            <>
                <ol>
                    {categorias.map((cat) => (
                        <CatalagoList id={cat.id} key={cat.id} cat={cat} />
                    ))}
                </ol>
            </>
        </>
    );
};

export default Catalago;
