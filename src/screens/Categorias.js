import React, { useState, useContext } from "react";
import { db } from "../firebase/firebaseConfig";
// import styled from "styled-components";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CategoriaList from "../components/CategoriaList";
import { ContextTheme } from "../context/ContextTheme";

const Categorias = () => {
    const { categorias } = useContext(ContextTheme);
    const [categoria, setCategoria] = useState([]);
    const [message, setMessage] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        const archivo = collection(db, "categorias");
        const payload = {
            categoria: categoria.toUpperCase(),
            timestamp: serverTimestamp(),
        };
        await addDoc(archivo, payload)
            .then(() => {
                setMessage("Categoria Nueva agregada Correctamente ...");
            })
            .catch((err) => {
                console.log("something when Wrong...");
                console.log(err);
            });
        setCategoria("");
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Col style={{ display: "flex", justifyContent: "center" }}>
                <h2 className='titlecategoria my-4 p-2'>Lista de Categorias</h2>
            </Col>

            <Col style={{ display: "flex", justifyContent: "center" }}>
                <Form action='' onSubmit={onSubmit}>
                    <input
                        type='text'
                        name='vendor'
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder='Agregar una Categoria'
                    />

                    <Button pd='8px 12px' type='submit' hbg='#ebfbff'>
                        Agredar Categoria
                    </Button>
                    {message && (
                        <Message
                            children={message}
                            variant='danger'
                            setMessage={setMessage}
                        />
                    )}
                </Form>
            </Col>
            <hr />
            <>
                <ol>
                    {categorias.map((categoria) => (
                        <CategoriaList
                            id={categoria.id}
                            key={categoria.id}
                            categoria={categoria}
                            setCategoria={setCategoria}
                            setMessage={setMessage}
                        />
                    ))}
                </ol>
            </>
        </>
    );
};

export default Categorias;
