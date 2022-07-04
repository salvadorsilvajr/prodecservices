import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const CategoriaList = ({ categoria, id, setMessage }) => {
    const [updateCategoria, setUpdateCategoria] = useState(false);
    const [newCategoria, setNewCategoria] = useState("");

    const editCategoria = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "categorias", id);
        const payload = { categoria: newCategoria.toUpperCase() };

        updateDoc(docRef, payload)
            .then(() => {
                setMessage("La Categoria se Actualizo Correctamente ...");
            })
            .catch((err) => {
                setMessage("something when wrong..", err);
            });

        setUpdateCategoria(false);
    };

    const deleteCategoria = async ({ id }) => {
        setMessage("Borrando Categoria...");
        const docRef = doc(db, "categorias", id);
        await deleteDoc(docRef);
    };

    return (
        <>
            {!updateCategoria ? (
                <UnoderListitem hbg='#ebfbff'>
                    {categoria.categoria}
                    <UnoderLisicon
                        onClick={() => {
                            setUpdateCategoria(!updateCategoria);
                        }}
                        color={"green"}
                        className='fas fa-edit'
                    ></UnoderLisicon>
                    <UnoderLisicon
                        id={categoria.id}
                        onClick={() => deleteCategoria({ id: categoria.id })}
                        color={"red"}
                        className='fas fa-times'
                    ></UnoderLisicon>
                </UnoderListitem>
            ) : (
                <Form action='' onSubmit={editCategoria}>
                    <input
                        type='text'
                        name='newcategoria'
                        // value={categoria.categoria}
                        onChange={(e) => setNewCategoria(e.target.value)}
                    />

                    <Button pd='8px 12px' type='submit' hbg='#ebfbff'>
                        Update
                    </Button>
                </Form>
            )}
        </>
    );
};

const UnoderListitem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
     color: #383844;
     padding: 10px;
     border-bottom solid 1px #edeaea;
     :nth-of-type(odd) {
        background: #edeaea;

     };
    
`;

const UnoderLisicon = styled.i`
    border-radius: 5px;
    border: solid 1px gray;
    padding: 4px 8px;
    color: ${({ color }) => color || "#000"};
    cursor: pointer;
`;
export default CategoriaList;
