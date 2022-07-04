import React, { useEffect, useState, useContext } from "react";
import {
    collection,
    // getDocs,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";

const ContextTheme = React.createContext();

const useAuth = () => {
    return useContext(ContextTheme);
};
const ContextGlobal = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Comprobamos si hay un usuario.
        const cancelarSuscripcion = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return cancelarSuscripcion;
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setUsers(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        );
        return unsub;
    }, []);

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "categorias");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setCategorias(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        );
        return unsub;
    }, []);

    const [catalago, setCatalago] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "catalago");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setCatalago(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        );
        return unsub;
    }, []);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "reviews");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setReviews(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        );
        return unsub;
    }, []);

    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "fotosgaleria");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setFotos(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        );
        return unsub;
    }, []);

    return (
        <ContextTheme.Provider
            value={{ user, users, categorias, catalago, reviews, fotos }}
        >
            {!loading && children}
            {/* {children} */}
        </ContextTheme.Provider>
    );
};

export { ContextTheme, ContextGlobal, useAuth };
