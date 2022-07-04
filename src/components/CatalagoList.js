import React, { useState, useContext } from "react";
import { ContextTheme } from "../context/ContextTheme";
import styled from "styled-components";
// import { Button, Row } from "react-bootstrap";
import { db } from "../firebase/firebaseConfig";
import Message from "../components/Message";
import { Link } from "react-router-dom";
// import catalago from "../data/catalago";

import { doc, deleteDoc } from "firebase/firestore";

const CatalagoList = ({ cat }) => {
    const { catalago } = useContext(ContextTheme);

    // const [updateCurso, setUpdateCurso] = useState(false);
    // const [newCurso, setNewCurso] = useState("");
    const [message, setMessage] = useState(null);

    // const editCurso = async ({ id }) => {
    //     console.log("voy a editar rl curso", id);
    //     // console.log(message);
    //     // e.preventDefault();

    //     // const docRef = doc(db, "catalago", id);
    //     // const payload = { curso: newCurso.toUpperCase() };

    //     // updateDoc(docRef, payload)
    //     //     .then(() => {
    //     //         setMessage("vendor was update correclty..");
    //     //     })
    //     //     .catch((err) => {
    //     //         setMessage("something when wrong..", err);
    //     //     });

    //     // setUpdateCurso(false);
    // };

    const deleteCurso = async ({ id }) => {
        setMessage("Borrando Curso...");
        const docRef = doc(db, "catalago", id);
        await deleteDoc(docRef);
    };

    return (
        <>
            {message && (
                <Message
                    children={message}
                    variant='danger'
                    setMessage={setMessage}
                />
            )}
            <>
                <h2 className='titlecategoria'>{cat.categoria}</h2>
            </>
            <div hbg='#ebfbff'>
                <>
                    {catalago.map((curso) => {
                        if (curso.categoria === cat.categoria) {
                            return (
                                <UnoderListitem key={curso.id} curso={curso}>
                                    <p>{curso.especialidad}</p>
                                    <div>
                                        <Link
                                            id={curso.id}
                                            to={`/admin/EditarCurso/${curso.id}`}
                                        >
                                            <UnoderLisicon
                                                id={curso.id}
                                                // onClick={() =>
                                                //     editCurso({
                                                //         id: curso.id,
                                                //     })
                                                // }
                                                color={"green"}
                                                className='fas fa-edit mx-3'
                                            ></UnoderLisicon>
                                        </Link>
                                        <UnoderLisicon
                                            id={curso.id}
                                            onClick={() =>
                                                deleteCurso({
                                                    id: curso.id,
                                                })
                                            }
                                            color={"red"}
                                            className='fas fa-times mx-3'
                                        ></UnoderLisicon>
                                    </div>
                                </UnoderListitem>
                            );
                        } else {
                            return "";
                        }
                    })}
                </>
            </div>
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

export default CatalagoList;
