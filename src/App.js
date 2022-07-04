import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router";
import "dotenv/config";
import theme from "./styles/Theme";
import Header from "./components/Header";
import { getMessaging, onMessage } from "firebase/messaging";
import Suscribe from "./components/Suscribe";
// import Notification from "./components/Notifications";
import ReactNotification from "./components/ReactNotification";
// import { onMessageListener } from "../src/firebase/firebaseInit";
import Footer from "./components/Footer";
import EditarCurso from "./components/EditCurso";
import ProductScreen from "./components/ProductScreen";
import Inicio from "./screens/Inicio";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AddPictureProfile from "./components/AddPictureProfile";
import Categorias from "./screens/Categorias";
import Catalago from "./screens/Catalago";
import GaleriaFotos from "./screens/GaleriaFotos";
import Testimonios from "./screens/Testimonios";
import QuienesSomos from "./screens/QuienesSomos";
import InfoPrices from "./screens/InfoPrices";
import CrearCuenta from "./screens/CrearCuenta";
import Error404 from "./components/Error404";

const App = () => {
    const userToken = localStorage.getItem("userToken");
    const [show, setShow] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    const [token, setToken] = useState(userToken);
    const [notification, setNotification] = useState({ title: "", body: "" });

    // how to not show subscribe in mobile
    // ***************  this ***********
    const [mobile, setMobile] = useState(
        Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        )
    );

    window.onresize = (event) => {
        // console.log(event.target.innerWidth);
        setMobile(event.target.innerWidth);
    };
    // *************** to this ***********

    // console.log(isTokenFound, mobile);

    const messaging = getMessaging();

    onMessage(messaging, (payload) => {
        if (payload) {
            setShow(true);
            setNotification({
                title: payload.notification.title,
                body: payload.notification.body,
            });
            // console.log(payload);
        }
    });

    return (
        <>
            <Header theme={theme} />
            {!token && mobile >= 1400 && (
                <Suscribe
                    setTokenFound={setTokenFound}
                    setToken={setToken}
                    token={token}
                />
            )}
            {show && (
                <ReactNotification
                    title={notification.title}
                    body={notification.body}
                />
            )}

            <Container style={{ minHeight: "33em" }}>
                <Switch>
                    <Route path='/' exact={true} component={Inicio} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/GaleriaFotos' component={GaleriaFotos} />
                    <Route path='/Testimonios' component={Testimonios} />
                    <Route path='/InfoPrices' component={InfoPrices} />
                    <Route path='/QuienesSomos' component={QuienesSomos} />
                    <Route
                        path='/addpictureprofile'
                        component={AddPictureProfile}
                    />
                    <Route path='/admin/Categorias' component={Categorias} />
                    <Route path='/admin/Catalago' component={Catalago} />
                    <Route path='/admin/CrearCuenta' component={CrearCuenta} />
                    <Route
                        path='/admin/EditarCurso/:id'
                        component={EditarCurso}
                    />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route component={Error404} />
                </Switch>
            </Container>
            <Footer />
        </>
    );
};

export default App;
